// Get all songs for playlist
audioRouter.get('/audio', async (req, res) => {
  try {
    const db = pool as unknown as Pool;
    const result = await db.query('SELECT * FROM songs ORDER BY track_number ASC');
    res.status(200).json({ success: true, songs: result.rows });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ success: false, error: error.message });
    } else {
      res.status(500).json({ success: false, error: 'Unknown error' });
    }
  }
});
import express, { Router } from 'express';
import pool from '../db/pool.js';
import { Pool } from 'pg';

const audioRouter: Router = express.Router();

audioRouter.get('/audio/:artist/albums/:album/:song', async (req, res) => {
  const { artist, album, song } = req.params;
  try {
    const db = pool as unknown as Pool;
    const result = await db.query(
      `SELECT * FROM songs
       WHERE artist = $1 AND album = $2 AND title = $3`,
      [artist, album, song]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Song not found' });
    }

    const songData = result.rows[0];
    res.status(200).json({ success: true, data: songData });
  }
  catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ success: false, error: error.message });
    } else {
      res.status(500).json({ success: false, error: 'Unknown error' });
    }
  }
});
// get all songs from album
audioRouter.get('/audio/:artist/albums/:album', async (req, res) => {
  const { artist, album } = req.params;
  try {
    const db = pool as unknown as Pool;
    const result = await db.query(
      `SELECT * FROM songs
       WHERE artist = $1 AND album = $2
       ORDER BY track_number ASC`,
      [artist, album]
    );

    res.status(200).json({ success: true, data: result.rows });
  }
  catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ success: false, error: error.message });
    } else {
      res.status(500).json({ success: false, error: 'Unknown error' });
    }
  }
});

export default audioRouter;
