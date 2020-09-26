import _ from 'lodash';

const generateAuxiliaryData = (data1, data2) => {
  const firstFileDataKeys = Object.keys(data1);
  const secondFileDataKeys = Object.keys(data2);
  const sharedKeys = _.union(firstFileDataKeys, secondFileDataKeys).sort();
  const getDiff = sharedKeys.map((key) => {
    if (!_.has(data1, key)) {
      return { name: key, status: 'added', value: data2[key] };
    }
    if (!_.has(data2, key)) {
      return { name: key, status: 'removed', value: data1[key] };
    }
    if (typeof data1[key] === 'object' && data1[key] !== null
    && typeof data2[key] === 'object' && data2[key] !== null
    && !Array.isArray(data1[key]) && !Array.isArray(data2[key])) {
      return {
        name: key,
        status: 'parentNode',
        child: generateAuxiliaryData(data1[key], data2[key]),
      };
    }
    if (data1[key] !== data2[key]) {
      return {
        name: key, status: 'modified', valueRemoved: data1[key], valueAdded: data2[key],
      };
    }
    return { name: key, status: 'unModified', value: data1[key] };
  });
  return getDiff;
};

export default generateAuxiliaryData;
