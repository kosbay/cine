/* eslint-disable no-unnamed func */
/* eslint-disable no-var */
/* eslint-disable no-use-before-define */
var identifier = Date.now();
var app = window.app || {};
var userCode = {
  value: "",
  listeners: [],
  setter(val) {
    this.value = val;
    this.listeners.map(listener => {
      listener(this.value);
      return null;
    });
  },
  get getter() {
    return this.value;
  },
  subscribe(listener) {
    this.listeners.push(listener);

    return () => {
      this.listeners = this.listener.filter(l => l !== listener);
    };
  }
};

const sendMessageToParent = newCode => {
  const newCodeObject = { code: newCode, identifier };
  const newCodeObjectStringified = JSON.stringify(newCodeObject);
  window.parent.postMessage(newCodeObjectStringified, "*");
};
userCode.subscribe(sendMessageToParent);

(function runAndroidLayout() {
  // this is the place the user codes
  let myCodeMirror;
  // this is a unique id assigned to the current page
  let pageInstanceUID;
  app.readyToRun = false;

  // save unique id for user
  if (localStorage.uid) {
    app.uid = JSON.parse(localStorage.uid);
  } else {
    app.uid = Date.now().toString(36);
    localStorage.uid = JSON.stringify(app.uid);
  }

  app.initPage = function initPage() {
    // get the hash key
    app.hash = app.getHashKey();

    // create code input area
    app.initCodeMirror();

    // calculate editor layout
    refreshEditorLayout();

    app.diffEngine = window.diffEngine();

    app.diffEncoder = app.diffEngine.getEncoder();

    // run the code
    app.run();

    // ensure CodeMirror code gets properly rendered
    requestAnimationFrame(() => {
      myCodeMirror.refresh();
    });

    // do not know what is this for
    // we're assuming they won't visit the same page twice within one second
    pageInstanceUID = Math.floor(Date.now() / 1000);
  };

  app.getHashKey = function getHashKey() {
    const hash = location.hash;
    if (hash.length > 2 && hash.substr(0, 2) === "#/") {
      return hash.slice(2);
    }
    return "";
  };

  app.initCodeMirror = function initCodeMirror() {
    // clear pre-existing code areas
    $(".input-area").html("");

    myCodeMirror = CodeMirror(document.querySelector(".input-area"), {
      value: app.getCodeForHash(),
      mode: "android-xml",
      lineNumbers: true,
      indentUnit: 4,
      fixedGutter: true,
      viewportMargin: Infinity
    });

    myCodeMirror.on("change", () => {
      userCode.setter(myCodeMirror.getValue());
      app.run({ autorun: true });
    });

    window.addEventListener(
      "message",
      event => {
        if (
          !~event.origin.indexOf("http://localhost:3001") &&
          !~event.origin.indexOf("http://localhost:3000") &&
          !~event.origin.indexOf("https://www.wunder.kz")
        ) {
          return;
        }
        const eventData = JSON.parse(event.data);

        if (eventData.id) {
          identifier = eventData.id;
        }

        if (eventData.identifier && eventData.layoutCode) {
          myCodeMirror.getDoc().setValue(eventData.layoutCode);
        }
      },
      false
    );

    myCodeMirror.on("cursorActivity", e => {
      const selection = e.doc.sel.ranges[0];
      if (
        selection.anchor.line === selection.head.line &&
        selection.anchor.ch === selection.head.ch
      ) {
        return false;
      }
      // storing as a string to circumvent a bug in jsDiff
      let selectionStr = "";
      selectionStr += `anchor: line${selection.anchor.line}, char${
        selection.anchor.ch
      };`;
      selectionStr += `head: line${selection.head.line}, char${
        selection.head.ch
      };`;
      updateState({
        selection: selectionStr
      });
    });

    // hooks for debugging
    if (localStorage.debug) {
      window.myCodeMirror = myCodeMirror;
    }
  };

  app.getCodeForHash = function() {
    if (userCode.value) {
      return userCode.value;
    }

    // we have a previously-saved version
    if (localStorage[`code-${app.hash}`]) {
      return JSON.parse(localStorage[`code-${app.hash}`]);
    }

    // return the default (if there is one)
    return app.getCodeForHashDefault();
  };

  app.getCodeForHashDefault = function() {
    if (app.androidCodeDefaults) {
      if (app.androidCodeDefaults[app.hash]) {
        return app.androidCodeDefaults[app.hash];
      }
      return app.androidCodeDefaults.default;
    }

    return "";
  };

  app.resetCodeToHashDefault = function() {
    myCodeMirror.setValue(app.getCodeForHashDefault());
    myCodeMirror.refresh();
  };

  // this runs after code is successfully evaluated
  function runSuccess(code) {
    clearTimeout(app.codeEvaluationTimeout);

    // save current student code
    if (app.hash.slice(0, 4) !== "test") {
      localStorage[`code-${app.hash}`] = JSON.stringify(code);
    }

    $("html").removeClass("invalid-code evaluating-invalid-code");
    requestAnimationFrame(() => {
      $("html").addClass("valid-code");
    });

    $(".code-saved-msg").removeClass("code-not-saved");
  }

  // this runs if the code is considered invalid or unevaluatable
  function runFail(opt) {
    const code = opt.code;
    clearTimeout(app.codeEvaluationTimeout);
    $("html")
      .removeClass("invalid-code")
      .addClass("evaluating-invalid-code");

    app.codeEvaluationTimeout = setTimeout(() => {
      $("html")
        .removeClass("evaluating-invalid-code")
        .addClass("invalid-code");
    }, 2000);

    if (opt.errors) {
      opt.errors.forEach(errorID => {
        // add any errors to the error stack
        app.errors.push({
          id: errorID
        });
      });
    }

    if (!localStorage.debug) {
      $(".code-saved-msg").addClass("code-not-saved");
    } else {
      console.log("failed, but saving anyway since we're in debug mode");
      runSuccess(code);
    }
  }

  function updateState(newState) {
    const state = app.state || {};
    let areChanges = false;
    let key;

    // copy over any new parameters from the previous state
    for (key in newState) {
      if (newState.hasOwnProperty(key)) {
        if (state[key] !== newState[key]) {
          areChanges = true;
          state[key] = newState[key];
        }
      }
    }

    // if there are no changes in the new state object, we're not going to update
    if (!areChanges) {
      return false;
    }

    const diff = app.diffEncoder.push(state);
    app.state = state;
  }

  // this function evaluates code based on the mode the app is in
  app.run = function run(opt) {
    opt = opt || {};

    if (!app.readyToRun && !opt.force) return false;

    const codeRaw = opt.code || myCodeMirror.getValue();
    let code;
    let elemToRender;

    updateState({
      code: codeRaw
    });

    // run the code
    const mode = "android-layout";
    if (mode === "android-layout") {
      $("html").removeClass("testing-mode");

      // pre-processing hook
      code = app.androidLayout.prepareCodeForParsing(codeRaw);

      // catch easy-to-detect errors (like misaligned <>'s, quotes)
      app.androidLayout.xmlSanityCheck(codeRaw);

      // if we don't have code to render, exit early rather than throwing an error
      if (codeRaw === "") {
        return false;
      }

      // parse the XML
      try {
        app.parsedXML = jQuery.parseXML(code);
      } catch (e) {
        app.parsedXML = null;
      }

      if (app.parsedXML !== null) {
        // basic parsing and styling
        elemToRender = app.androidLayout.evaluateXML(app.parsedXML);

        // calculate all the layouts
        console.log(
          `%c-------- layout pass at ${Math.round(Date.now() / 1000)} --------`,
          "color: #666"
        );
        app.androidLayout.evaluateXMLPass2(app.parsedXML);
        if (app.errors().length > 0) {
          runFail({
            code: codeRaw
          });
        } else {
          runSuccess(codeRaw);
        }
      } else {
        runFail({
          code: codeRaw,
          errors: ["parseError"]
        });

        $("html").removeClass("valid-code invalid-code");
      }
    }

    if (elemToRender) {
      $(".screen")
        .html("")
        .append(elemToRender);
    }

    renderErrors();

    renderHistoryLinkState();
    refreshEditorLayout();
    return console.log("%c-------- end --------", "color: #666");
  };

  function forwardFillTestingHistory(prefix, urls, startAtBeginning) {
    // add each test to the history
    urls.forEach(url => {
      history.pushState({}, "", prefix + url);
    });

    // go to the first one
    if (startAtBeginning) {
      history.go((app.tests.length - 1) * -1);
    }
  }

  // show the error list in the document
  function renderErrors() {
    const errors = app.errors();
    const errorStrArr = errors.map(error => error.value);
    if (errors.length > 0) {
      $(".error-msg")
        .show()
        .html(errorStrArr.join("<hr>"));
      errors.forEach(error => {
        if (error.line) {
          $(
            `.CodeMirror-lines > div > div:last-child > pre:nth-child(${
              error.line
            })`
          ).addClass("highlighted-code");
        }
      });
    } else {
      $(".error-msg").hide();
      $(".highlighted-code").removeClass("highlighted-code");
      console.log("%c No errors!", "color: #393");
    }
  }

  // undo/redo history state UI
  function renderHistoryLinkState() {
    // console.debug(myCodeMirror.historySize());
    if (myCodeMirror.historySize().undo > 0) {
      $(".btn-undo").attr("disabled", false);
    } else {
      $(".btn-undo").attr("disabled", true);
    }
    if (myCodeMirror.historySize().redo > 0) {
      $(".btn-redo").attr("disabled", false);
    } else {
      $(".btn-redo").attr("disabled", true);
    }
  }

  // recalculate and resize the editor to the proper height
  function refreshEditorLayout() {
    const currentHeight = $(".CodeMirror").height();
    const containerHeight = $(".input-area-wrapper").outerHeight(true);
    const windowHeight = $(window).height();
    const wiggleRoom = 10;

    $(".CodeMirror-scroll").css(
      "height",
      windowHeight - (containerHeight - currentHeight) - wiggleRoom
    );
    myCodeMirror.refresh();
  }

  $(window).bind("hashchange", e => {
    app.initPage();
  });

  // recalculate editor layout on resize
  $(window).resize(() => {
    refreshEditorLayout();
  });

  // auto-run on code mutation
  $(".code-input-area").on(
    "input",
    () => {
      app.run({ autorun: true });
    },
    false
  );

  // manually run on Cmd-Enter / Ctrl-Enter
  $(document).on("keydown", ".code-input-area", e => {
    if (e.keyCode === 13 && (e.metaKey || e.ctrlKey)) {
      app.run();
    }
  });

  // manually run when run btn is clicked
  $(".btn-run").on(
    "click",
    () => {
      app.run();
    },
    false
  );

  // toggle checkbox states
  $("#toggle-element-outline").change(e => {
    app.elementOutlinesEnabled = e.target.checked;
    app.run();
  });

  // reset code button
  $(".btn-reset-code").click(e => {
    if (
      !confirm(
        "Press OK to reset your code to the default for this example.\n\nNote: This will overwrite your current code, but pressing Cmd/Ctrl Z will undo this change."
      )
    ) {
      return false;
    }
    app.resetCodeToHashDefault();
  });

  // undo/redo
  $(".btn-undo").click(e => {
    myCodeMirror.undo();
    renderHistoryLinkState();
  });

  $(".btn-redo").click(e => {
    myCodeMirror.redo();
    renderHistoryLinkState();
  });

  // hooks for tablet mode
  if (sessionStorage.tabletMode === "true") {
    $("#input-topbar")
      .hide()
      .parent()
      .css("padding-top", "12px");
    $(".input-area").css("font-size", "120%");
    $("html").addClass("tablet-mode");
  }

  $(".input-area").mousemove(e => {
    updateMousePosition(e);
  });

  // report-an-issue modal event listener
  $("#issue-dialog").on("shown.bs.modal", e => {
    // grab the code from our codeMirror instance
    $("#entry_440939498").val(myCodeMirror.getValue());

    // grab the user's uid and path
    $("#entry_1934743275").val(
      `${JSON.parse(localStorage.uid)}/${app.hash}/${pageInstanceUID}`
    );
  });

  // report-an-issue submittal iframe
  $("#hidden_iframe").on("load", e => {
    if (submitted) {
      $("#issue-dialog").modal("hide");
      $("#issue-submitted-dialog").modal("show");

      // clear everything
      $("#issue-dialog textarea").val("");
      $("#entry_1934743275").val("");
      $("#issue-dialog [type=radio]").prop("checked", false);

      // grab the user's uid and path
      $("#entry_1934743275").val(
        `${JSON.parse(localStorage.uid)}/${app.hash}/${pageInstanceUID}`
      );
      submitted = false;
    }
  });

  let timeOfLastUpdate;
  const updateDebounceThreshold = 1000;
  let lastDebouncedState = null;
  let finalStateUpdateTimeout;

  var updateMousePosition = function(e) {
    const offset = $(".CodeMirror").offset();
    const cmOffset = myCodeMirror.getScrollInfo();
    const mouse = [
      e.pageX - offset.left + cmOffset.left,
      e.pageY - offset.top + cmOffset.top
    ];

    const state = lastDebouncedState || {};

    // I'm setting a floor of threshold/4 to give the actual state update
    // a chance to happen. Otherwise, it'd updateDebouncedState exactly on
    // time, not giving normal state updates a chance to happen (and therefore
    // resulting in stale data).
    const timeToUpdateWithFinalState = Math.max(
      updateDebounceThreshold / 4,
      updateDebounceThreshold - (Date.now() - timeOfLastUpdate)
    );

    state.mouse = mouse;

    clearTimeout(finalStateUpdateTimeout);

    if (
      timeOfLastUpdate &&
      Date.now() - timeOfLastUpdate < updateDebounceThreshold
    ) {
      lastDebouncedState = state;
      finalStateUpdateTimeout = setTimeout(
        updateDebouncedState,
        timeToUpdateWithFinalState
      );
      return false;
    }

    timeOfLastUpdate = Date.now();
    lastDebouncedState = null;
    updateState(state);
  };

  function updateDebouncedState() {
    timeOfLastUpdate = Date.now();
    updateState(lastDebouncedState);
  }

  app.androidInit();

  app.initPage();
})();
