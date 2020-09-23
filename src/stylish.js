const basicIndent = '  ';
const getIndent = (depth) => basicIndent.repeat(depth);
const stringify = (item, depth = 1) => {
  if (typeof item === 'object' && item !== 'null' && !Array.isArray(item)) {
    const dataArr = Object.entries(item).map(([key, value]) => `${getIndent(depth)}${key}: ${stringify(value, depth)}`);
    return `{\n${dataArr.join('\n')}\n${getIndent(depth - 2)}}`;
  }
  return item;
};

const format = (data, depth = 1) => {
  const res = data.map((item) => {
    const {
      name,
      status,
      value,
      valueRemoved,
      valueAdded,
    } = item;
    switch (status) {
      case 'removed':
        return `${getIndent(depth)}- ${name}: ${stringify(value, depth + 2)}`;
      case 'added':
        return `${getIndent(depth)}+ ${name}: ${stringify(value, depth + 3)}`;
      case 'unModified':
        return `${getIndent(depth)}  ${name}: ${stringify(value, depth + 2)}`;
      case 'modified':
        return `${getIndent(depth)}- ${name}: ${stringify(valueRemoved, depth + 3)}\n${getIndent(depth)}+ ${name}: ${stringify(valueAdded, depth + 3)}`;
      case 'parentNode':
        return `${getIndent(depth)}  ${name}: ${format(value, depth + 2)}`;
      default:
        return 'error: "wrong status property value"';
    }
  });
  //console.log(`{\n${res.join('\n')}\n}`);
  return `{\n${res.join('\n')}\n}`;
};

export default format;