// import dynamic from 'next/dynamic';

// import { Spinner } from 'components';
import { parseAnswersBlocks, parseXml, parseBlocks } from '../../utils/XmlUtils';

/**
 * @param {string} xml
 */
function parseWorkspaceXml(xml) {
  const arrayTags = ['name', 'custom', 'colour', 'categories', 'blocks'];
  let xmlDoc = null;
  if (window.DOMParser) {
    xmlDoc = new DOMParser().parseFromString(xml, 'text/xml');
  } else if (window.ActiveXObject) {
    xmlDoc = new window.ActiveXObject('Microsoft.XMLDOM');
    xmlDoc.async = false;
    if (!xmlDoc.loadXML(xml)) {
      throw new Error(`${xmlDoc.parseError.reason} ${xmlDoc.parseError.srcText}`);
    }
  } else {
    throw new Error('cannot parse xml string!');
  }

  function isArray(o) {
    return Object.prototype.toString.apply(o) === '[object Array]';
  }

  /**
   * @param {string} xmlNode
   * @param {Array.<string>} result
   */
  function parseNode(xmlNode, result) {
    if (xmlNode.nodeName === '#text') {
      const v = xmlNode.nodeValue;
      if (v.trim()) {
        result.value = v;
      }
      return;
    }

    const jsonNode = {};
    const existing = result[xmlNode.nodeName];
    if (existing) {
      if (!isArray(existing)) {
        result[xmlNode.nodeName] = [existing, jsonNode];
      } else {
        result[xmlNode.nodeName].push(jsonNode);
      }
    } else if (arrayTags && arrayTags.indexOf(xmlNode.nodeName) !== -1) {
      result[xmlNode.nodeName] = [jsonNode];
    } else {
      result[xmlNode.nodeName] = jsonNode;
    }

    if (xmlNode.attributes) {
      for (let i = 0; i < xmlNode.attributes.length; i++) {
        const attribute = xmlNode.attributes[i];
        jsonNode[attribute.nodeName] = attribute.nodeValue;
      }
    }

    for (let i = 0; i < xmlNode.childNodes.length; i++) {
      parseNode(xmlNode.childNodes[i], jsonNode);
    }
  }

  const result = {};
  if (xmlDoc.childNodes.length) {
    parseNode(xmlDoc.childNodes[0], result);
  }

  return transformed(result);
}

function transformed(result) {
  const filteredResult = [];
  const xml = result.xml;
  const categories = xml.category;
  for (let i = 0; i < categories.length; i++) {
    const c = categories[i];
    const cNew = {};
    cNew.name = c.name;
    cNew.colour = c.colour;
    cNew.custom = c.custom;
    cNew.blocks = [];
    const blocks = c.block;
    if (blocks) {
      if (!(blocks instanceof Array)) {
        cNew.blocks[0] = blocks;
      }
      for (let j = 0; j < blocks.length; j++) {
        const b = blocks[j];
        const bNew = {};
        bNew.type = b.type;
        bNew.fields = {};
        const fields = b.field;
        if (fields) {
          for (let k = 0; k < fields.length; k++) {
            const f = fields[k];
            bNew.fields[k] = f;
          }
        }
        cNew.blocks[j] = bNew;
      }
    }
    filteredResult.push(cNew);
  }
  return filteredResult;
}

const parseToolboxXmlBlocks = (xml) => {
  const xmlDocument = parseXml(xml);
  const blocks = parseBlocks(xmlDocument);
  return blocks;
};

const parseWorkspaceXmlBlocks = (xml) => {
  const xmlDocument = parseXml(xml);
  const blocks = parseAnswersBlocks(xmlDocument);
  return blocks;
};

const getToolboxCategories = (xml) => {
  try {
    const toolboxCategories = parseWorkspaceXml(xml);
    return toolboxCategories;
  } catch (err) {
    return {};
  }
};

const getToolboxBlocks = (xml) => {
  try {
    const toolBoxBlocks = parseToolboxXmlBlocks(xml);
    return toolBoxBlocks;
  } catch (err) {
    return [];
  }
};

const getAnswersFromWorkspace = (xml) => {
  try {
    const toolBoxBlocks = parseWorkspaceXmlBlocks(xml);
    return toolBoxBlocks;
  } catch (err) {
    return [];
  }
};

const workspaceConfiguration = {
  grid: {
    spacing: 20,
    length: 3,
    colour: '#ccc',
    snap: true,
  },
};

const Answers = {
  eventType: {
    DELETE: 'DELETE',
    ADD: 'ADD',
  },
  changes: {},
  listeners: [],
  subscribe(listener) {
    this.listeners = [...this.listeners, listener];

    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  },
  get answers() {
    return this.changes;
  },
  set answer({ id, value }) {
    this.changes[id] = value;
    this.listeners.map(l => l({
      change: { id, value }, eventType: this.eventType.ADD, changes: this.changes,
    }));
  },
  getAnswerById(id) {
    return Object.keys(this.changes).filter(
      blockId => `${id}`.localeCompare(`${blockId}`) === 0
    )[0];
  },
  getNextIndex() {
    return Object.keys(this.changes).length + 1;
  },
  removeChangeById(id) {
    delete this.changes[id];
    this.listeners.map(l => l({
      change: { id }, eventType: this.eventType.DELETE, changes: this.changes,
    }));
  },
  clearChanges() {
    this.changes = {};
  },
  clearListeners() {
    this.listeners = [];
  },
};

export {
  getAnswersFromWorkspace, getToolboxBlocks, getToolboxCategories, Answers, workspaceConfiguration,
};
