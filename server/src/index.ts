import express, { Application } from 'express';
import postsRouter from './lib/routes/posts.js';
import audioRouter from './lib/routes/audio.js';

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT ?? 8080;

app.use('/api', postsRouter);
app.use('/api', audioRouter);

app.listen(PORT, () => {
  console.info(`Server is running on port ${PORT.toString()}`);
});
export default app;
