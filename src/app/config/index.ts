import dotenv from 'dotenv';

import path from 'path';

dotenv.config({ path: path.join((process.cwd(), '.env')) });

export default {
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
};

// // Example config in server.ts
// const config = {
//   port: process.env.PORT || 5000,
//   database_url:
//     process.env.DATABASE_URL ||
//     'mongodb+srv://admin:admin@cluster0.rp8qrq9.mongodb.net/?retryWrites=true&w=majority',
// };

///home/rakib/Documents/first-project
