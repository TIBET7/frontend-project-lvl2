import yaml from 'js-yaml';
import ini from 'ini';

const parseData = (format, data) => {
  if (format === '.json') {
    return JSON.parse(data);
  }
  if (format === '.yml') {
    return yaml.safeLoad(data);
  }
  if (format === '.ini') {
    return ini.parse(data);
  }
  return `error: ${format} is invalid format`;
};

export default parseData;
