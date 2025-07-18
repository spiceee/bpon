# Brazilian Post Office Nightmares

Run docker to start the db and the redis instance:

```
docker compose up -d
```

BPON uses refinery and will automatically update the database schema.

```
cargo run
```

BPON is also a ReactJS application.

```
cd client && npm i
```

Run watch to keep the transpiled JS up to date.

```
cd client && npm run watch
```
