const format = (data, depth = 1) => {
  const res = data.map((item) => {
    const basicIndent = '  ';
    const indent = basicIndent.repeat(depth);
    const { name, status, value, valueRemoved, valueAdded } = item;
    switch (status) {
      case 'removed':
        return `${indent}- ${name}: ${value}`;
      case 'added':
        return `${indent}+ ${name}: ${value}`;
      case 'unModified':
        if (typeof value === 'object' && value !== 'null' && !Array.isArray(value)) {
          return format(value, depth + 1);
        }
        return `${indent}  ${name}: ${value}`;
      case 'modified':
        if (typeof value === 'object' && value !== 'null' && !Array.isArray(value)) {
          return format(value, depth + 1);
        }
        return `${indent}- ${name}: ${valueRemoved}\n${indent}+ ${name}: ${valueAdded}`;
      case 'parentNode':
        return format(value, depth + 1);
      default:
        return 'error: "wrong status property value"';
    }
  });
  //console.log(`{\n${res.join('\n')}\n}`);
  return `{\n${res.join('\n')}\n}`;
};

export default format;
