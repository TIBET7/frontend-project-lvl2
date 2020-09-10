/* eslint-disable no-underscore-dangle */

import { fileURLToPath } from 'url';
import { dirname } from 'path';
import * as path from 'path';
import genDiff from '../src/genDiff';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const firstJsonFile = getFixturePath('./file1.json');
const secondJsonFile = getFixturePath('file2.json');
const firstYamlFile = getFixturePath('file1.yml');
const secondYamlFile = getFixturePath('file2.yml');

const correct = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

test('genDiff', () => {
  expect(genDiff(firstJsonFile, secondJsonFile)).toEqual(correct);
  expect(genDiff(firstYamlFile, secondYamlFile)).toEqual(correct);
});
