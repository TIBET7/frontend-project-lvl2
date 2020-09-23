import _ from 'lodash';
import parseData from './parsers.js';
import format from './stylish.js';

const generateAuxiliaryData = (firstFileData, secondFileData) => {
  const firstFileDataKeys = Object.keys(firstFileData);
  const secondFileDataKeys = Object.keys(secondFileData);
  const sharedKeys = _.union(firstFileDataKeys, secondFileDataKeys).sort();
  const getDiff = sharedKeys.map((key) => {
    if (!_.has(firstFileData, key)) {
      return { name: key, status: 'added', value: secondFileData[key] };
    }
    if (!_.has(secondFileData, key)) {
      return { name: key, status: 'removed', value: firstFileData[key] };
    }
    if (typeof firstFileData[key] === 'object' && firstFileData[key] !== 'null'
    && typeof secondFileData[key] === 'object' && secondFileData[key] !== 'null'
    && !Array.isArray(firstFileData[key]) && !Array.isArray(secondFileData[key])) {
      return {
        name: key,
        status: 'parentNode',
        value: generateAuxiliaryData(firstFileData[key], secondFileData[key]),
      };
    }
    if (firstFileData[key] !== secondFileData[key]) {
      return {
        name: key, status: 'modified', valueRemoved: firstFileData[key], valueAdded: secondFileData[key],
      };
    }
    return { name: key, status: 'unModified', value: firstFileData[key] };
  });
  return getDiff;
};

const genDiff = (firstFile, secondFile) => {
  const firstFileData = parseData(firstFile);
  const secondFileData = parseData(secondFile);
  const auxiliaryData = generateAuxiliaryData(firstFileData, secondFileData);
  //console.log(auxiliaryData);
  return format(auxiliaryData);
};

export default genDiff;
