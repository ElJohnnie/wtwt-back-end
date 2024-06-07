import { Request, Response, NextFunction } from 'express';
import { enviroment } from '../config/dotEnvConfig';

const AUTHORIZATION_TOKEN = enviroment.AUTHORIZATION_TOKEN;

const checkAuthorizationCode = (req: Request, res: Response, next: NextFunction): void | Response => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).send('Unauthorized: No token provided');
  }

  const token = authHeader.split(' ')[1];

  if (token !== AUTHORIZATION_TOKEN) {
    return res.status(401).send('Unauthorized: Invalid token');
  }


  next();
};

export default checkAuthorizationCode;
