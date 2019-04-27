const parseXml = (xml) => {
  if (window.DOMParser) {
    const xmlDoc = new DOMParser().parseFromString(xml, 'text/xml');
    return xmlDoc;
  }

  if (window.ActiveXObject) {
    const xmlDoc = new window.ActiveXObject('Microsoft.XMLDOM');
    xmlDoc.async = false;
    if (!xmlDoc.loadXML(xml)) {
      throw new Error(`${xmlDoc.parseError.reason} ${xmlDoc.parseError.srcText}`);
    }
    return xmlDoc;
  }

  throw new Error('cannot parse xml string!');
};

const parseBlocks = (xmlDocument) => {
  const fieldsNodes = xmlDocument.getElementsByTagName('block');
  if (fieldsNodes.length !== 0) {
    const answers = [];
    /* eslint-disable no-plusplus */
    for (let index = 0; index < fieldsNodes.length; ++index) {
      const name = fieldsNodes[index].getAttribute('type');
      answers.push({ type: name });
    }
    return answers;
    /* eslint-enable no-plusplus */
  }

  return [];
};

const parseAnswersBlocks = (xmlDocument) => {
  const BLOCKLY_USED_CHARACTERS = 'ask';
  const fieldsNodes = xmlDocument.getElementsByTagName('block');
  if (fieldsNodes.length !== 0) {
    const answers = [];
    /* eslint-disable no-plusplus */
    for (let index = 0; index < fieldsNodes.length; ++index) {
      const name = fieldsNodes[index].getAttribute('type');
      const id = fieldsNodes[index].getAttribute('id');
      if (BLOCKLY_USED_CHARACTERS.includes(name) && id) {
        answers.push({ type: id });
      }
    }
    return answers;
    /* eslint-enable no-plusplus */
  }

  return [];
};

export {
  parseAnswersBlocks,
  parseXml,
  parseBlocks,
};
