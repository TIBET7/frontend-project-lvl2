/* eslint-disable no-underscore-dangle */

import { fileURLToPath } from 'url';
import { dirname } from 'path';
import * as path from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const firstJsonFile = getFixturePath('file1.json');
const secondJsonFile = getFixturePath('file2.json');
const firstYamlFile = getFixturePath('file1.yml');
const secondYamlFile = getFixturePath('file2.yml');
const firstInilFile = getFixturePath('file1.ini');
const secondInilFile = getFixturePath('file2.ini');
const firstJsonRecursiveFile = getFixturePath('file3.json');
const secondJsonRecursiveFile = getFixturePath('file4.json');

const correctPlain = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

const correctStylishRecursive = `{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: {
            key: value
        }
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: too much
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        fee: 100500
        deep: {
            id: {
                number: 45
            }
        }
    }
}`;

const correctPlainRecursive = `Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to [complex value]
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From 'too much' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]`;

const correctJson = '[{"name":"common","status":"parentNode","child":[{"name":"follow","status":"added","value":false},{"name":"setting1","status":"unModified","value":"Value 1"},{"name":"setting2","status":"removed","value":200},{"name":"setting3","status":"modified","valueRemoved":true,"valueAdded":{"key":"value"}},{"name":"setting4","status":"added","value":"blah blah"},{"name":"setting5","status":"added","value":{"key5":"value5"}},{"name":"setting6","status":"parentNode","child":[{"name":"doge","status":"parentNode","child":[{"name":"wow","status":"modified","valueRemoved":"too much","valueAdded":"so much"}]},{"name":"key","status":"unModified","value":"value"},{"name":"ops","status":"added","value":"vops"}]}]},{"name":"group1","status":"parentNode","child":[{"name":"baz","status":"modified","valueRemoved":"bas","valueAdded":"bars"},{"name":"foo","status":"unModified","value":"bar"},{"name":"nest","status":"modified","valueRemoved":{"key":"value"},"valueAdded":"str"}]},{"name":"group2","status":"removed","value":{"abc":12345,"deep":{"id":45}}},{"name":"group3","status":"added","value":{"fee":100500,"deep":{"id":{"number":45}}}}]';

test('genDiff', () => {
  expect(genDiff(firstJsonFile, secondJsonFile, 'stylish')).toEqual(correctPlain);
  expect(genDiff(firstYamlFile, secondYamlFile, 'stylish')).toEqual(correctPlain);
  expect(genDiff(firstInilFile, secondInilFile, 'stylish')).toEqual(correctPlain);
  expect(genDiff(firstJsonRecursiveFile, secondJsonRecursiveFile, 'stylish'))
    .toEqual(correctStylishRecursive);
  expect(genDiff(firstJsonRecursiveFile, secondJsonRecursiveFile, 'plain'))
    .toEqual(correctPlainRecursive);
  expect(genDiff(firstJsonRecursiveFile, secondJsonRecursiveFile, 'json'))
    .toEqual(correctJson);
});
