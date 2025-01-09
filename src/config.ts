import dotenv from 'dotenv';

dotenv.config();

export const config = {
  DISCORD_TOKEN: process.env.DISCORD_TOKEN || '',
  CLIENT_ID: process.env.CLIENT_ID || '',
  PREFIX: '!'
};