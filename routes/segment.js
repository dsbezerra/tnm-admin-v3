import express from 'express';
import {
  getAll,
  getById,
  updateById,
  insert,
  deleteById,
  count,
} from '../controllers/generic';

const MODEL = 'Segment';
const segments = express.Router();

/**
 * GET /segments
 * Get all segments from database
 */
segments.get('/', (req, res) => {
  getAll(MODEL, req, res);
});

/**
 * GET /segments/:id
 * Get all details of a given segment by ID
 */
segments.get('/:id', (req, res) => {
  getById(MODEL, req, res)
});

/**
 * PUT /segments/:id
 * Updates a given segment by ID
 */
segments.put('/:id', (req, res) => {
  updateById(MODEL, req, res)
});

/**
 * POST /segments
 * Inserts a new Segment
 */
segments.post('/', (req, res) => {
  insert(MODEL, req, res)
});

/**
 * DELETE /segments/:id
 * Deletes a given segment by ID
 */
segments.delete('/:id', (req, res) => {
  deleteById(MODEL, req, res)
});

/**
 * GET /segments/count
 * Get count of segments from database
 */
segments.get('/count', (req, res) => {
  count(MODEL, req, res);
});

export default segments;