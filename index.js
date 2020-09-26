import parseData from './src/parsers.js';
import formatData from './src/formatters/index.js';
import generateAuxiliaryData from './src/genAuxData.js';

const genDiff = (firstFile, secondFile, format) => {
  const firstFileData = parseData(firstFile);
  const secondFileData = parseData(secondFile);
  const auxiliaryData = generateAuxiliaryData(firstFileData, secondFileData);
  return formatData(auxiliaryData, format);
};

export default genDiff;
