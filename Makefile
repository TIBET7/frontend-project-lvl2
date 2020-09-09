install: 
	@npm install

start:
	@node bin/gendiff.js -h

auxTest: 
	@node bin/gendiff.js file1.json file2.json

test: 
	npx -n --experimental-vm-modules jest

jest-watch: 
	npx -n --experimental-vm-modules jest --watch

lint: 
	@npx eslint .
	



