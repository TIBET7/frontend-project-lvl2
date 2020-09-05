install: 
	@npm install

start:
	@node bin/gendiff.js -h

auxTest: 
	@node bin/gendiff.js file1.json file2.json

jest: 
	@npm run test

lint: 
	@npx eslint .
	



