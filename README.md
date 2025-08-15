# Brazilian Post Office Nightmares

This is the sourcecode for https://importacaonaoautorizada.com/

Run docker to start the db and the redis instance:

```
docker compose up -d
```

Move .env.example to .env and fill in the values.

BPON uses refinery and will automatically update the database schema.

```
cargo run
```

BPON is also a ReactJS-based SSR application.

```
cd client && npm i
```

Run watch to keep the transpiled JS up to date.

```
cd client && npm run watch
```
