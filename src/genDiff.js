import _ from 'lodash';
import parseData from './parsers.js';

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
        children: generateAuxiliaryData(firstFileData[key], secondFileData[key]),
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

const getDiff = (data) => {
  const res = data.map((item) => {
    const indent = '  ';
    switch (item.status) {
      case 'unModified':
        return `${indent}  ${item.name}: ${item.value}`;
      case 'removed':
        return `${indent}- ${item.name}: ${item.value}`;
      case 'added':
        return `${indent}+ ${item.name}: ${item.value}`;
      case 'modified':
        return `${indent}- ${item.name}: ${item.valueRemoved}\n${indent}+ ${item.name}: ${item.valueAdded}`;
      default:
        return 'error: "wrong status property value"';
    }
  });
  return `{\n${res.join('\n')}\n}`;
};

const genDiff = (firstFile, secondFile) => {
  const firstFileData = parseData(firstFile);
  const secondFileData = parseData(secondFile);
  const auxiliaryData = generateAuxiliaryData(firstFileData, secondFileData);
  console.log(auxiliaryData);
  return getDiff(auxiliaryData);
};

export default genDiff;
