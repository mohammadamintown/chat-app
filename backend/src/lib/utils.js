import jwt from 'jsonwebtoken';

export const generateToken = (res, userId) => {
  const { JWT_SECRET } = process.env;
  if (!JWT_SECRET) throw new Error('JWT_SECRET is not configured');

  const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: '7d' });

  res.cookie('token', token, {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === 'development' ? false : true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return token;
};