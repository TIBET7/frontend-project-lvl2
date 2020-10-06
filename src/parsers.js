import yaml from 'js-yaml';
import ini from 'ini';
import _ from 'lodash';

const changeValueToNumber = (data) => {
  const dataKeys = Object.keys(data);
  return dataKeys.reduce((acc, key) => {
    if (_.isPlainObject(data[key])) {
      acc[key] = changeValueToNumber(data[key]);
      return acc;
    }
    if (!Number.isNaN(parseFloat(data[key], 10))) {
      acc[key] = parseFloat(data[key], 10);
      return acc;
    }
    acc[key] = data[key];
    return acc;
  }, {});
};

const parseData = (fileFormat, data) => {
  switch (fileFormat) {
    case 'json':
      return JSON.parse(data);
    case 'yml':
      return yaml.safeLoad(data);
    case 'ini':
      return changeValueToNumber(ini.parse(data));
    default:
      return `error: ${fileFormat} is invalid fileFormat`;
  }
};

export default parseData;
