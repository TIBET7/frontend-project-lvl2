/* eslint-disable no-underscore-dangle */

import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import * as path from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const fileTypes = ['json', 'yml', 'ini'];

test.each(fileTypes)('genDiff check', (fileType) => {
  const firstFilePath = getFixturePath(`file1.${fileType}`);
  const secondFilePath = getFixturePath(`file2.${fileType}`);
  const stylishSampleFileData = readFile('stylish.txt');
  const plainSampleFileData = readFile('plain.txt');
  const jsonSampleFileData = readFile('json.txt');
  expect(genDiff(firstFilePath, secondFilePath, 'stylish')).toEqual(stylishSampleFileData);
  expect(genDiff(firstFilePath, secondFilePath, 'plain')).toEqual(plainSampleFileData);
  expect(genDiff(firstFilePath, secondFilePath, 'json')).toEqual(jsonSampleFileData);
});
