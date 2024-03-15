import jwt, { JwtPayload } from 'jsonwebtoken';

export const createToken = (
  jwtPayload: {
    iat: number;
    exp: number;
    name: string
    role: string;
    _id: string;
    email: string;
  },
  secret: string,
): string => {
  try {
    return jwt.sign(jwtPayload, secret, {});
  } catch (error) {
    console.error('Error creating JWT token:', error);
    throw new Error('Error creating JWT token');
  }
};

export const verifyToken = (token: string, secret: string): JwtPayload => {
  try {
    return jwt.verify(token, secret) as JwtPayload;
  } catch (error) {

    console.error('Error verifying JWT token:', error);
    throw new Error('Error verifying JWT token');
  }
};