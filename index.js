import fs from 'fs';
import path from 'path';
import parseData from './src/parsers.js';
import formatData from './src/formatters/index.js';
import generateAuxiliaryData from './src/genAuxData.js';

const getParsedData = (filePath) => {
  const absolutePath = path.resolve(process.cwd(), filePath);
  const format = path.extname(filePath);
  const fileData = fs.readFileSync(absolutePath, 'utf-8');
  const parsedFileData = parseData(format, fileData);
  return parsedFileData;
};

const genDiff = (firstFilePath, secondFilePath, format) => {
  const firstFileData = getParsedData(firstFilePath);
  const secondFileData = getParsedData(secondFilePath);
  const auxiliaryData = generateAuxiliaryData(firstFileData, secondFileData);
  return formatData(auxiliaryData, format);
};

export default genDiff;
