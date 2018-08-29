# @oriented/express
A collection of drivers for creating and configuring an express.js server in the oriented framework.
## Installation

Oriented requires [Node.js](https://nodejs.org/) v4+ to run.

```sh
$ npm install --save @oriented/express
```
## Getting Started
To start a simple express app, import the ExpressDriver and call the `start()` method. This returns an express app, where you can define routes, add middleware, etc...
### Javascript
```js
const eDriver = require('@oriented/express').ExpressDriver
var app = eDriver.start()
app.get('/', function(req, res) {
  res.json('Hello world!')
})
```
### TypeScript
```ts
import { ExpressDriver} from '@oriented/express';
let app = ExpressDriver.start();
app.get('/', (req, res) => {
  res.json('Hello World!');
});
```

License
----

MIT