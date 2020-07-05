import program from 'commander';



program
    .version('1.0.0')
    .description('Compares two configuration files and shows a difference.')
    .arguments('<filepath1> <filepath2>');

program.parse(process.argv);
