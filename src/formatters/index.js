import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const formatters = {
  stylish,
  plain,
  json,
};

const formatData = (data, format) => {
  const formatter = formatters[format];
  return formatter(data);
};
export default formatData;
