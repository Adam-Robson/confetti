import express, { Router } from 'express';
import pool from '../db/pool.js';
import { Pool } from 'pg';

const postsRouter: Router = express.Router();

postsRouter.get('/posts', async (req, res) => {
  try {
    const db = pool as unknown as Pool;
    const result = await db.query(
      'SELECT * FROM posts ORDER BY created_at DESC'
    );
    res.status(200).json({ success: true, data: result.rows });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ success: false, error: error.message });
    } else {
      res.status(500).json({ success: false, error: 'Unknown error' });
    }
  }
});

postsRouter.post('/posts', async (req, res) => {
  const { title, content, excerpt, image, tags } = req.body;
  try {
    const db = pool as unknown as Pool;
    const result = await db.query(
      `INSERT INTO posts (title, content, excerpt, image, tags, created_at)
       VALUES ($1, $2, $3, $4, $5, NOW()) RETURNING *`,
      [title, content, excerpt, image, tags]
    );
    res.status(201).json({ success: true, data: result.rows[0] });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ success: false, error: error.message });
    } else {
      res.status(500).json({ success: false, error: 'Unknown error' });
    }
  }
});

export default postsRouter;
