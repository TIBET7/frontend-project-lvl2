import yaml from 'js-yaml';
import ini from 'ini';
import _ from 'lodash';

const parseNumber = (data) => {
  const newData = JSON.parse(JSON.stringify(data));
  const dataKeys = Object.keys(newData);
  dataKeys.map((key) => {
    if (_.isPlainObject(data[key])) {
      newData[key] = parseNumber(data[key]);
    }
    if (parseInt(data[key], 10)) {
      newData[key] = parseInt(data[key], 10);
    }
    return newData[key];
  });
  return newData;
};

const parseData = (fileFormat, data) => {
  switch (fileFormat) {
    case 'json':
      return JSON.parse(data);
    case 'yml':
      return yaml.safeLoad(data);
    case 'ini':
      return parseNumber(ini.parse(data));
    default:
      return `error: ${fileFormat} is invalid fileFormat`;
  }
};

export default parseData;
