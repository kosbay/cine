import parseWorkspaceXml from 'react-blockly-component/dist-modules/BlocklyHelper';

import { parseAnswersBlocks, parseXml, parseBlocks } from '../../utils/XmlUtils';

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
}

const Answers = {
  eventType: {
    DELETE: 'DELETE',
    ADD: 'ADD'
  },
  changes: {},
  listeners: [],
  subscribe(listener) {
    this.listeners = [...this.listeners, listener];

    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    }
  },
  get answers() {
    return this.changes;
  },
  set answer({id, value}) {
    this.changes[id] = value;
    this.listeners.map(l => l({
      change: {id, value}, eventType: this.eventType.ADD, changes: this.changes
    }));
  },
  getAnswerById(id) {
    return Object.keys(this.changes).filter(
      (blockId) => `${id}`.localeCompare(`${blockId}`) === 0
    )[0];
  },
  getNextIndex() {
    return Object.keys(this.changes).length + 1;
  },
  removeChangeById(id) {
    delete this.changes[id];
    this.listeners.map(l => l({
      change: { id }, eventType: this.eventType.DELETE, changes: this.changes
    }));
  },
  clearChanges() {
    this.changes= {};
  },
  clearListeners() {
    this.listeners = [];
  }
};

export {getAnswersFromWorkspace, getToolboxBlocks, getToolboxCategories, Answers, workspaceConfiguration};