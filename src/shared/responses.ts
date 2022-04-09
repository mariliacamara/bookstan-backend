import { Response } from 'express';

export class ResponseTemplates {
  success(res: Response, statusCode, data) {
    return res.status(statusCode).send({
      statusCode,
      data,
    });
  }
  error(res: Response, statusCode, message) {
    return res.status(statusCode).send({
      statusCode,
      message,
    })
  }
}
