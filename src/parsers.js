import yaml from 'js-yaml';
import ini from 'ini';

const parseData = (fileFormat, data) => {
  switch (fileFormat) {
    case 'json':
      return JSON.parse(data);
    case 'yml':
      return yaml.safeLoad(data);
    case 'ini':
      console.log(ini.parse(data));
      return ini.parse(data);
    default:
      return `error: ${fileFormat} is invalid fileFormat`;
  }
};

export default parseData;
