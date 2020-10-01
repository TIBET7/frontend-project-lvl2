const stringify = (item) => {
  switch (typeof item) {
    case 'object':
      return '[complex value]';
    case 'string':
      return `'${item}'`;
    default:
      return item;
  }
};

const format = (data) => {
  const iter = (innerData, path = '') => {
    const res = innerData.filter((item) => !(item.status === 'unModified')).map((item) => {
      const fullPath = `${path}${item.name}`;
      switch (item.status) {
        case 'removed':
          return `Property '${fullPath}' was removed`;
        case 'added':
          return `Property '${fullPath}' was added with value: ${stringify(item.value)}`;
        case 'modified':
          return `Property '${fullPath}' was updated. From ${stringify(item.valueRemoved)} to ${stringify(item.valueAdded)}`;
        case 'parentNode':
          return iter(item.children, `${fullPath}.`);
        default:
          return `error: ${item.status} is invalid value for status property`;
      }
    });
    return res.join('\n');
  };
  return iter(data);
};

export default format;
