import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const parseData = (filePath) => {
  const absolutePath = path.resolve(process.cwd(), filePath);
  const format = path.extname(filePath);
  let fileData;
  if (format === '.json') {
    fileData = JSON.parse(fs.readFileSync(absolutePath, 'utf-8'));
  }
  if (format === '.yml') {
    fileData = yaml.safeLoad(fs.readFileSync(absolutePath, 'utf-8'));
  }
  return fileData;
};

export default parseData;
