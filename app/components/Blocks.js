const ObjectsDefault = [
  {
    identifier: '',
    functions: [],
  },
];
/* eslint-disable no-param-reassign */
/* eslint-disable func-names */
const initObjects = (objectsBlocks = ObjectsDefault, Blockly) => objectsBlocks.map((options) => {
  if (
    !options.identifier
      || !options.functions
      || !options.functions.length
  ) {
    return null;
  }

  const label = options.identifier[0].toUpperCase()
      + options.identifier.substring(1, options.identifier.length).toLowerCase();

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
      this.setTooltip('');
      this.setHelpUrl('');
    },
  };

  Blockly.JavaScript[options.identifier] = function (block) {
    const functionName = block.getFieldValue(dropdownTag);
    const value = Blockly.JavaScript.valueToCode(
      block,
      inputTag,
      Blockly.JavaScript.ORDER_ATOMIC
    );

    const isMoveForward = functionName === 'moveForward';
    const isTurn = functionName === 'turn';
    const isSay = functionName === 'say' || functionName === 'ask';

    let paramKey = '';
    if (isMoveForward) paramKey = 'step';
    if (isTurn) paramKey = 'degree';
    if (isSay) paramKey = 'text';

    const code = value
      ? `EventEmitter.push({ type: '${functionName}', params: { identifier: '${options.identifier}', ${paramKey}: ${value} } });`
      : `EventEmitter.push({ type: '${functionName}', params: { identifier: '${options.identifier}', ${paramKey}: 1 } });`;

    return code;
  };

  return null;
});

const jump = (Blockly) => {
  Blockly.Blocks.jump = {
    init() {
      this.appendDummyInput().appendField('jump');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(230);
      this.setTooltip('');
      this.setHelpUrl('');
    },
  };

  Blockly.JavaScript.jump = function () {
    const code = "EventEmitter.push({ type: 'jump', params: { identifier: 'aldar' }});";
    return code;
  };
};

const moveForward = (Blockly) => {
  Blockly.Blocks.moveforward = {
    init() {
      this.appendValueInput('step')
        .setCheck('Number')
        .appendField('moveForward');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(230);
      this.setTooltip('');
      this.setHelpUrl('');
    },
  };

  Blockly.JavaScript.moveforward = function (block) {
    const valueStep = Blockly.JavaScript.valueToCode(
      block,
      'step',
      Blockly.JavaScript.ORDER_ATOMIC
    );

    const code = valueStep
      ? `EventEmitter.push({ type: 'moveForward', params: { identifier: 'aldar', step: ${valueStep} }});`
      : 'EventEmitter.push({ type: \'moveForward\', params: { identifier: \'aldar\', step: 1 }});';
    return code;
  };

  Blockly.Blocks.moveforward = {
    init() {
      this.appendValueInput('step')
        .setCheck('Number')
        .appendField('moveForward');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(230);
      this.setTooltip('');
      this.setHelpUrl('');
    },
  };
};

const turn = (Blockly) => {
  Blockly.Blocks.turn = {
    init() {
      this.appendDummyInput()
        .appendField('turn')
        .appendField(
          new Blockly.FieldDropdown([
            ['Left', '270'],
            ['Right', '90'],
          ]),
          'direction'
        );
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(230);
      this.setTooltip('');
      this.setHelpUrl('');
    },
  };

  Blockly.JavaScript.turn = function (block) {
    const dropdownDirection = block.getFieldValue('direction');
    const code = `EventEmitter.push({ type: 'turn', params: { identifier: 'aldar', degree: ${dropdownDirection} }});`;
    return code;
  };
};

const say = (Blockly) => {
  Blockly.Blocks.say = {
    init() {
      this.appendValueInput('sayMessage').appendField('say');
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(230);
      this.setTooltip('');
      this.setHelpUrl('');
    },
  };

  Blockly.JavaScript.say = function (block) {
    const sayMessage = Blockly.JavaScript.valueToCode(
      block,
      'sayMessage',
      Blockly.JavaScript.ORDER_ATOMIC
    );
    const code = sayMessage
      ? `EventEmitter.push({ type: 'say', params: { identifier: 'aldar', text: ${sayMessage} }});`
      : 'EventEmitter.push({ type: \'say\', params: { identifier: \'aldar\', text: \'\' }});';
    return code;
  };
};

const generateAnswer = ({ key, label, Blockly }) => {
  Blockly.Blocks[key] = {
    init() {
      this.appendDummyInput()
        .appendField(label);
      this.setOutput(true, null);
      this.setColour(230);
      this.setTooltip('');
      this.setHelpUrl('');
    },
  };

  Blockly.JavaScript[key] = function () {
    return [
      `\`\${askAnswers['${key}']}\``,
      Blockly.JavaScript.ORDER_NONE,
    ];
  };
};

const ask = (Blockly) => {
  Blockly.Blocks.ask = {
    init() {
      this.appendDummyInput()
        .appendField('ask')
        .appendField(new Blockly.FieldTextInput('Ask something'), 'answer');
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(230);
      this.setTooltip('');
      this.setHelpUrl('');
    },
  };

  Blockly.JavaScript.ask = function (block) {
    const { id } = block;

    const sayValue = block.getFieldValue('answer');
    const sayFunctionString = `EventEmitter.push({ type: 'say', params: { identifier: 'aldar', text: '${sayValue}' }})`;
    const askFunctionString = ' await new Promise((res, rej) => setTimeout(() => res(window.prompt("Введите свой ответ", "")), 3000))';
    const answersObjectString = `askAnswers['${id}']`;

    const code = `
      ${sayFunctionString};\n
      ${answersObjectString} = ${askFunctionString};\n
    `;
    return code;
  };
};

const getAnswersBlock = answers => (answers && Object.keys(answers).length !== 0
  ? Object.keys(answers)
    .map(
      (answerKey) => {
        if (!answerKey) return null;
        return { type: answerKey };
      }
    )
    .filter(b => b)
  : undefined);

export {
  moveForward, turn, say, ask, getAnswersBlock, jump, initObjects, generateAnswer,
};
