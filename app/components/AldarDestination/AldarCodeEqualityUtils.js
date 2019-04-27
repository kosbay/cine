// TODO: place template in some global object
const TEMPLATE = 'F%wqks@3';
const TEMPLATE_NUMBER = 38218390128;

function replaceAll(code, search, replacement) {
  return code.split(search).join(replacement);
}

const extractAnswers = code => `${code}`
  .split('\n')
  .filter(l => l)
  .map((line, index) => (line.includes('askAnswers') ? { line, index } : null))
  .filter(l => l)
  .reduce((acc, nextValue) => {
    if (!Array.isArray(acc)) {
      const firstId = /\['(.*?)'\]/.exec(acc.line);
      const nextId = /\['(.*?)'\]/.exec(nextValue.line);
      return [firstId && firstId[0], nextId && nextId[0]];
    }
    const nextId = /\['(.*?)'\]/.exec(nextValue.line);
    return [...acc, nextId && nextId[0]];
  }, [])
  .filter((id, index, self) => index === self.indexOf(id));

const replaceWithSolutionAnswersIds = ({
  userAnswers, solutionAnswers, userCode,
}) => {
  let newUserCode = userCode;
  userAnswers.forEach(
    (userAnswerId, index) => {
      newUserCode = replaceAll(newUserCode, userAnswerId, solutionAnswers[index]);
    }
  );

  return newUserCode;
};

const isCodeEqual = ({ userCode, solutionCode }) => `${userCode}`
  .replace(/\s/g, '')
  .localeCompare(solutionCode.replace(/\s/g, '')) === 0;

const extractLinesWithTemplate = ({ solutionCode, template }) => solutionCode
  .split('\n')
  .filter(l => l)
  .map((line, index) => ({ line, index }))
  .filter(({ line }) => line.includes(template));

const replaceWithTemplateUserCode = ({ userCode, solutionLinesWithTemplate, template }) => {
  const lines = userCode
    .split('\n')
    .filter(l => l);
  const newUserLines = lines.map((line, index) => {
    const solutionLine = solutionLinesWithTemplate.find(
      ({ index: solutionLineIndex }) => solutionLineIndex === index
    );

    if (!solutionLine) return line;

    const solutionLineParts = solutionLine.line.split(template);

    const isLinesEqual = !!solutionLineParts
      .map(linePart => line.replace(/\s/g, '').includes(linePart.replace(/\s/g, '')))
      .find(linePart => !!linePart);

    return isLinesEqual ? solutionLine.line : line;
  })
    .join('\n');
  return newUserLines;
};

export {
  isCodeEqual,
  extractLinesWithTemplate,
  extractAnswers,
  replaceWithTemplateUserCode,
  replaceWithSolutionAnswersIds,
  TEMPLATE,
  TEMPLATE_NUMBER,
};
