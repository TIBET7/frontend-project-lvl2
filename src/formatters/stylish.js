const basicIndent = '  ';
const getIndent = (depth) => basicIndent.repeat(depth);
const stringify = (item, depth = 1) => {
  if (typeof item !== 'object' || Array.isArray(item)) {
    return item;
  }
  const dataArr = Object.entries(item).map(([key, value]) => `${getIndent(depth)}${key}: ${stringify(value, depth + 2)}`);
  return `{\n${dataArr.join('\n')}\n${getIndent(depth - 2)}}`;
};

const format = (data) => {
  const iter = (innerData, depth) => {
    const res = innerData.map((item) => {
      const {
        name,
        status,
        value,
        child,
        valueRemoved,
        valueAdded,
      } = item;
      switch (status) {
        case 'removed':
          return `${getIndent(depth)}- ${name}: ${stringify(value, depth + 3)}`;
        case 'added':
          return `${getIndent(depth)}+ ${name}: ${stringify(value, depth + 3)}`;
        case 'unModified':
          return `${getIndent(depth)}  ${name}: ${stringify(value, depth + 2)}`;
        case 'modified':
          return `${getIndent(depth)}- ${name}: ${stringify(valueRemoved, depth + 3)}\n${getIndent(depth)}+ ${name}: ${stringify(valueAdded, depth + 3)}`;
        case 'parentNode':
          return `${getIndent(depth)}  ${name}: ${format(child, depth + 2)}`;
        default:
          return `error: ${status} is invalid value for status property`;
      }
    });
    return res.join('\n');
  };
  return `{\n${iter(data, 1)}\n}`;
};

export default format;