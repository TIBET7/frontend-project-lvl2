/* eslint-disable no-underscore-dangle */

import { fileURLToPath } from 'url';
import { dirname } from 'path';
import * as path from 'path';
import genDiff from '../src/genDiff';

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
Property 'group3' was added with value: [complex value]`

test('genDiff', () => {
  // expect(genDiff(firstJsonFile, secondJsonFile)).toEqual(correctPlain);
  // expect(genDiff(firstYamlFile, secondYamlFile)).toEqual(correctPlain);
  // expect(genDiff(firstInilFile, secondInilFile)).toEqual(correctPlain);
  // expect(genDiff(firstJsonRecursiveFile, secondJsonRecursiveFile)).toEqual(correctStylishRecursive);
  expect(genDiff(firstJsonRecursiveFile, secondJsonRecursiveFile)).toEqual(correctPlainRecursive);
});
