install: 
	@npm install

start:
	@node bin/gendiff.js -h

aux: 
	@node bin/gendiff.js file3.json file4.json

test: 
	npx -n --experimental-vm-modules jest

test-coverage:
	npm test -- --coverage --coverageProvider=v8

jest-watch: 
	npx -n --experimental-vm-modules jest --watch

lint: 
	@npx eslint .
	