import program from 'commander';
import version from '../package.json';
import  description from '../package.json';

program
    .version(version)
    .description(description);

program.parse(process.argv);
