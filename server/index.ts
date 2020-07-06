import express, { Request, Response } from 'express';
import path from 'path';

const port = process.env.PORT || 3001;

const app = express();

// SPA STATIC FILES MIDDLEWARE
app.use(express.static('build'));

// SPA ROUTER HANDLER MIDDLEWARE
app.get('*', (req: Request, res: Response) => {
  return res.sendFile(path.join(__dirname, '../build/index.html'));
});

// OPEN SERVER
app.listen(port, () => {
  console.log(`server api started in http://localhost:${port}`);
});