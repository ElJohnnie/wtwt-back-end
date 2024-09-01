import { Request, Response, NextFunction } from 'express';
import { Errors } from '../../../interfaces/enums/errors';

const checkAuthorizationCode = (req: Request, res: Response, next: NextFunction): void | Response => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).send(Errors.NoTokenProvided);
  }

  const token = authHeader.split(' ')[1];

  if (token !== process.env.AUTHORIZATION_TOKEN) {
    return res.status(401).send(Errors.TokenInvalid);
  }


  next();
};

export default checkAuthorizationCode;
