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
const correctStylish = readFile('stylish.txt');
const correctPlain = readFile('plain.txt');
const correctJson = readFile('json.txt');

const table = [
  ['json', 'stylish', `${correctStylish}`],
  ['yml', 'stylish', `${correctStylish}`],
  ['ini', 'stylish', `${correctStylish}`],
  ['json', 'plain', `${correctPlain}`],
  ['yml', 'plain', `${correctPlain}`],
  ['ini', 'plain', `${correctPlain}`],
  ['json', 'json', `${correctJson}`],
  ['yml', 'json', `${correctJson}`],
];

test.each(table)('genDiff check', (fileType, format, correctData) => {
  const firstFile = getFixturePath(`file1.${fileType}`);
  const secondFile = getFixturePath(`file2.${fileType}`);
  expect(genDiff(firstFile, secondFile, format)).toEqual(correctData);
});
