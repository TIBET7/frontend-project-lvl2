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

const format = (data) => {
  const iter = (innerData, path = '') => {
    const res = innerData.filter((item) => !(item.status === 'unModified')).map((item) => {
      const {
        name,
        status,
        value,
        child,
        valueRemoved,
        valueAdded,
      } = item;
      const fullPath = `${path}${name}`;
      switch (status) {
        case 'removed':
          return `Property '${fullPath}' was removed`;
        case 'added':
          return `Property '${fullPath}' was added with value: ${stringify(value)}`;
        case 'modified':
          return `Property '${fullPath}' was updated. From ${stringify(valueRemoved)} to ${stringify(valueAdded)}`;
        case 'parentNode':
          return iter(child, `${fullPath}.`);
        default:
          return `error: ${status} is invalid value for status property`;
      }
    });
    return res.join('\n');
  };
  return iter(data);
};

export default format;
