import { Response } from 'express';

/**
 * A driver class that contains implementation logic for sending a response from the server to the client.
 * 
 * @author Sean Donnelly
 */
export class ExpressResponder {


  constructor(private res: Response) { }

  /**
   * Sends custom or default error message and status code in response
   * 
   * @param {string} [error] 
   * @param {number} [status] 
   * @memberof ExpressResponder
   */
  sendOperationError(error?: string, status?: number): void {
    error && status ? this.res.status(status).send(error)
      : error && !status ? this.res.status(400).send(error)
        : !error && status ? this.res.status(status).send("Server error encounter.")
          : this.res.status(400).send("Server error encounter.");
  }
}
