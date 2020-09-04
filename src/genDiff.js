import _ from 'lodash';
import fs from 'fs';
import path from 'path';

const getFileData = (filePath) => {
  const absolutePath = path.resolve(process.cwd(), filePath);
  const fileData = JSON.parse(fs.readFileSync(absolutePath, 'utf-8'));
  return fileData;
};

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
  const firstFileData = getFileData(firstFile);
  const secondFileData = getFileData(secondFile);
  const auxiliaryData = generateAuxiliaryData(firstFileData, secondFileData);
  return getDiff(auxiliaryData);
};

export default genDiff;
