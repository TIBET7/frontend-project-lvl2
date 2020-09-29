import _ from 'lodash';

const genDiff = (data1, data2) => {
  const data1Keys = Object.keys(data1);
  const data2Keys = Object.keys(data2);
  const sharedKeys = _.union(data1Keys, data2Keys).sort();
  const getDiff = sharedKeys.map((key) => {
    if (!_.has(data1, key)) {
      return { name: key, status: 'added', value: data2[key] };
    }
    if (!_.has(data2, key)) {
      return { name: key, status: 'removed', value: data1[key] };
    }
    if (_.isPlainObject(data1[key]) && _.isPlainObject(data2[key])) {
      return {
        name: key,
        status: 'parentNode',
        child: genDiff(data1[key], data2[key]),
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

export default genDiff;
