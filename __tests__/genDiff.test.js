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

const table = [
  ['json', 'stylish'],
  ['yml', 'stylish'],
  ['ini', 'stylish'],
  ['json', 'plain'],
  ['yml', 'plain'],
  ['ini', 'plain'],
  ['json', 'json'],
  ['yml', 'json'],
];

test.each(table)('genDiff check', (fileType, format) => {
  const firstFile = getFixturePath(`file1.${fileType}`);
  const secondFile = getFixturePath(`file2.${fileType}`);
  const correctData = readFile(`${format}.txt`);
  expect(genDiff(firstFile, secondFile, format)).toEqual(correctData);
});
