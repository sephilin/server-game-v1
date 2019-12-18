import express, { Application, Request, Response, NextFunction } from 'express';


class App {
  public express: Application;

  constructor() {
    this.express = express();

    const router = express.Router()
    router.get('/', (req: Request, res: Response, next: NextFunction) => {
      res.json({
        message: 'Hello Everybody'
      });
    })
    this.express.use('/', router);
  }
}

export default new App().express;