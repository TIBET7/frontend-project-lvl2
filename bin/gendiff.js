#!/usr/bin/env node

import program from 'commander';
import genDiff from '../src/genDiff.js';

program
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<firstFilePath> <secondFilePath>')
  .option('-f, --format [type]', 'output format')
  .action((firstFilePath, secondFilePath) => {
    console.log(genDiff(firstFilePath, secondFilePath));
  });

program.parse(process.argv);
