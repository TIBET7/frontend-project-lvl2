const format = (data, depth = 1) => {
  const res = data.map((item) => {
    const basicIndent = '  ';
    const indent = basicIndent.repeat(depth);
    const { name, status, value, valueRemoved, valueAdded } = item;
    switch (status) {
      case 'removed':
        return `${indent}- ${name}: ${JSON.stringify(value).replace(/["]/g, '')}`;
      case 'added':
        return `${indent}+ ${name}: ${JSON.stringify(value).replace(/["]/g, '')}`;
      case 'unModified':
        return `${indent}  ${name}: ${value}`;
      case 'modified':
        return `${indent}- ${name}: ${JSON.stringify(valueRemoved).replace(/["]/g, '')}\n
        ${indent}+ ${name}: ${JSON.stringify(valueAdded).replace(/["]/g, '')}`;
      case 'parentNode':
        return `${indent}  ${name}: ${format(value, depth + 2)}`;
      default:
        return 'error: "wrong status property value"';
    }
  });
  //console.log(`{\n${res.join('\n')}\n}`);
  return `{\n${res.join('\n')}\n}`;
};

export default format;
