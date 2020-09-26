import parseData from './src/parsers.js';
import formatter from './src/formatters/index.js';
import generateAuxiliaryData from './src/genAuxData.js';

const genDiff = (firstFile, secondFile, format) => {
  const firstFileData = parseData(firstFile);
  const secondFileData = parseData(secondFile);
  const auxiliaryData = generateAuxiliaryData(firstFileData, secondFileData);
  const targetFormat = formatter(format);
  return targetFormat(auxiliaryData);
};

export default genDiff;
