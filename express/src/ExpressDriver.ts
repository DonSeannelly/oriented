import * as express from 'express';
import { Express } from "express";
import * as bodyParser from 'body-parser';
import * as http from 'http';

/**
 * A driver class that handles serving the API through the express framework.
 * 
 * @author Sean Donnelly
 */
export class ExpressDriver {
  static app: Express = express();

  static start() {
    // configure app to use bodyParser()
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());

    // set header to allow connection by given url
    this.app.use(function (req, res, next) {

      // Website you wish to allow to connect
      res.header('Access-Control-Allow-Origin', '*');

      // Request methods you wish to allow
      res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

      // Request headers you wish to allow
      res.header('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

      // Set to true if you need the website to include cookies in the requests sent
      // to the API (e.g. in case you use sessions)
      res.header('Access-Control-Allow-Credentials', 'true');

      // Pass to next layer of middleware
      next();
    });

    /**
     * Get port from environment and store in Express.
     */
    const port = process.env.PORT || '3000';
    this.app.set('port', port);

    /**
     * Create HTTP server.
     */
    const server = http.createServer(this.app);

    /**
     * Listen on provided port, on all network interfaces.
     */
    server.listen(port, () => console.log(`Oriented on port ${port}!`));


    return this.app;
  }
}