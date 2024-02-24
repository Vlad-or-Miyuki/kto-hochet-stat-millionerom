install:
	npm ci

lint:
	npx eslint .

fix:
	npx eslint . --fix

game:
	node question-game/questions.js