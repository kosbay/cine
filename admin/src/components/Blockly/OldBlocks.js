const ObjectsDefault = [
  {
    identifier: "",
    functions: []
  }
];
/* eslint-disable no-param-reassign */
/* eslint-disable func-names */
const initObjects = (objectsBlocks = ObjectsDefault, Blockly) =>
  objectsBlocks.map(options => {
    if (
      !options.identifier ||
      !options.functions ||
      !options.functions.length
    ) {
      return null;
    }

    const label =
      options.identifier[0].toUpperCase() +
      options.identifier.substring(1, options.identifier.length).toLowerCase();

    const inputTag = `${options.identifier}Input`;
    const dropdownTag = `${options.identifier}Dropdown`;

    Blockly.Blocks[options.identifier] = {
      init() {
        this.appendDummyInput()
          .appendField(label)
          .appendField(
            new Blockly.FieldDropdown(
              options.functions.map(option => [option, option])
            ),
            dropdownTag
          );
        this.appendValueInput(inputTag);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
      }
    };

    Blockly.JavaScript[options.identifier] = function(block) {
      const functionName = block.getFieldValue(dropdownTag);
      const value = Blockly.JavaScript.valueToCode(
        block,
        inputTag,
        Blockly.JavaScript.ORDER_ATOMIC
      );

      const code = value
        ? `blockFunctions.${functionName}ById && await blockFunctions.${functionName}ById('${
            options.identifier
          }', ${value});`
        : `blockFunctions.${functionName}ById && await blockFunctions.${functionName}ById('${
            options.identifier
          }', 1);`;
      return code;
    };

    return null;
  });

const jump = (Blockly) => {
  Blockly.Blocks.jump = {
    init() {
      this.appendDummyInput().appendField("jump");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(230);
      this.setTooltip("");
      this.setHelpUrl("");
    }
  };

  Blockly.JavaScript.jump = function(block) {
    const code = "await blockFunctions.jump();\n";
    return code;
  };
};

const moveForward = (Blockly) => {
  Blockly.Blocks.moveforward = {
    init() {
      this.appendValueInput("step")
        .setCheck("Number")
        .appendField("moveForward");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(230);
      this.setTooltip("");
      this.setHelpUrl("");
    }
  };

  Blockly.JavaScript.moveforward = function(block) {
    const valueStep = Blockly.JavaScript.valueToCode(
      block,
      "step",
      Blockly.JavaScript.ORDER_ATOMIC
    );

    const code = valueStep
      ? `await blockFunctions.moveForward(${valueStep});\n`
      : `await blockFunctions.moveForward(1);\n`;
    return code;
  };

  Blockly.Blocks.moveforward = {
    init() {
      this.appendValueInput("step")
        .setCheck("Number")
        .appendField("moveForward");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(230);
      this.setTooltip("");
      this.setHelpUrl("");
    }
  };
};

const turn = (Blockly) => {
  Blockly.Blocks.turn = {
    init() {
      this.appendDummyInput()
        .appendField("turn")
        .appendField(
          new Blockly.FieldDropdown([
            ["Left", "left"],
            ["Right", "right"],
            ["Up", "up"],
            ["Down", "down"]
          ]),
          "direction"
        );
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(230);
      this.setTooltip("");
      this.setHelpUrl("");
    }
  };

  Blockly.JavaScript.turn = function(block) {
    const dropdownDirection = block.getFieldValue("direction");
    const code = `await blockFunctions.turn('${dropdownDirection}')\n`;
    return code;
  };
};

const say = (Blockly) => {
  Blockly.Blocks.say = {
    init() {
      this.appendValueInput("sayMessage").appendField("say");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(230);
      this.setTooltip("");
      this.setHelpUrl("");
    }
  };

  Blockly.JavaScript.say = function(block) {
    const sayMessage = Blockly.JavaScript.valueToCode(
      block,
      "sayMessage",
      Blockly.JavaScript.ORDER_ATOMIC
    );
    const code = sayMessage
      ? `await blockFunctions.say(${sayMessage});\n`
      : `await blockFunctions.say("");\n`;
    return code;
  };
};

const generateAnswer = ({key, label, Blockly}) => {
  Blockly.Blocks[key] = {
    init() {
      this.appendDummyInput()
          .appendField(label);
      this.setOutput(true, null);
      this.setColour(230);
      this.setTooltip("");
      this.setHelpUrl("");
    }
  };

  Blockly.JavaScript[key] = function() {
    return [
      `\`\${askAnswers['${key}']}\``,
      Blockly.JavaScript.ORDER_NONE
    ];
  };
};

const ask = (Blockly) => {
  Blockly.Blocks.ask = {
    init() {
      this.appendDummyInput()
        .appendField("ask")
        .appendField(new Blockly.FieldTextInput("Ask something"), "answer");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(230);
      this.setTooltip("");
      this.setHelpUrl("");
    }
  };

  Blockly.JavaScript.ask = function(block) {
    const {id} = block;

    const sayValue = block.getFieldValue('answer');
    const sayFunctionString = ` blockFunctions.say('${sayValue}')`;
    const askFunctionString = ` await blockFunctions.ask()`;
    const answersObjectString = `askAnswers['${id}']`;

    const code = `
      ${sayFunctionString};\n
      ${answersObjectString} = ${askFunctionString};\n
    `;
    return code;
  };
};

const getAnswersBlock = (answers) =>
  answers && Object.keys(answers).length !== 0
    ? Object.keys(answers)
        .map(
          (answerKey) => {
            if (!answerKey) return null;
            return { type: answerKey }
          }
        )
        .filter(b => b)
    : undefined;

export { moveForward, turn, say, ask, getAnswersBlock, jump, initObjects, generateAnswer };