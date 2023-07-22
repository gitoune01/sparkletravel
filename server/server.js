import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import db from './db.js';
import blogsRoutes from  './routes/blogsRoutes.js'
dotenv.config();
const app = express();
app.use(
  express.json({
    verify: (req, res, buf) => {
      req.rawBody = buf.toString();
    },
    limit: '50mb',
  })
);
app.use(cors());
//run db connection
db()

const port =process.env.PORT || 8000;

//root routes

app.use('/api/blogs/', blogsRoutes )




app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
