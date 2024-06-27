import jwt from 'jsonwebtoken';

export const jwtSign = (user: any) => {
  const payload = {
    sub: user._id,
    username: user.username,
    isAdmin: user.isAdmin
  };

  const secret = process.env.JWT_SECRET as string

  return jwt.sign(payload, secret, { expiresIn: '1h' });
};