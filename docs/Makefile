.PHONY: install run build clean deploy

install:
	npm install

run:
	npm run dev

build:
	npm run build

clean:
	rm -rf .next node_modules

deploy:
	git pull
	npm install
	npm run build
	pm2 restart portfolio