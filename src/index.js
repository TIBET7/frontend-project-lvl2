import fs from 'fs';
import path from 'path';
import parseData from './parsers.js';
import formatData from './formatters/index.js';
import genDiff from './genDiff.js';

const getParsedData = (filePath) => {
  const absolutePath = path.resolve(process.cwd(), filePath);
  const format = path.extname(filePath).slice(1);
  const fileData = fs.readFileSync(absolutePath, 'utf-8');
  const parsedFileData = parseData(format, fileData);
  return parsedFileData;
};

const getDiff = (firstFilePath, secondFilePath, format = 'stylish') => {
  const firstFileData = getParsedData(firstFilePath);
  const secondFileData = getParsedData(secondFilePath);
  const diff = genDiff(firstFileData, secondFileData);
  return formatData(diff, format);
};

export default getDiff;
