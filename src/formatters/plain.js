const stringify = (item) => {
  switch (typeof item) {
    case 'object':
      return '[complex value]';
    case null:
      return null;
    case 'string':
      return `'${item}'`;
    default:
      return `${item}`;
  }
};
//   if (typeof item === 'object' && item !== null && !Array.isArray(item)) {
//     return '[complex value]';
//   }
//   return typeof item === 'string' ? `'${item}'` : `${item}`;
// };

const format = (data, path = '') => {
  const res = data.filter((item) => !(item.status === 'unModified')).map((item) => {
    const {
      name,
      status,
      value,
      child,
      valueRemoved,
      valueAdded,
    } = item;
    const absolutePath = `${path}${name}`;
    switch (status) {
      case 'removed':
        return `Property '${absolutePath}' was removed`;
      case 'added':
        return `Property '${absolutePath}' was added with value: ${stringify(value)}`;
      case 'modified':
        return `Property '${absolutePath}' was updated. From ${stringify(valueRemoved)} to ${stringify(valueAdded)}`;
      case 'parentNode':
        return format(child, `${absolutePath}.`);
      default:
        return `error: ${status} is invalid value for status property`;
    }
  });
  return res.join('\n');
};

export default format;
