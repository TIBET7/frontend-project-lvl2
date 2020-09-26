import yaml from 'js-yaml';
import ini from 'ini';

const parseData = (pathExtension, data) => {
  if (pathExtension === '.json') {
    return JSON.parse(data);
  }
  if (pathExtension === '.yml') {
    return yaml.safeLoad(data);
  }
  if (pathExtension === '.ini') {
    return ini.parse(data);
  }
  return `error: ${pathExtension} is invalid pathExtension`;
};

export default parseData;
