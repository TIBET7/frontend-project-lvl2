install: 
	@npm install

start:
	@node bin/gendiff.js -h

auxTest: 
	@node bin/gendiff.js file1.json file2.json

jest: 
	npx -n --experimental-vm-modules jest --watch

lint: 
	@npx eslint .
	



