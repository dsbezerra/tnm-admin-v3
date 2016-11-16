import express from 'express';
import {
  getAll,
  getById,
  updateById,
  insert,
  deleteById,
} from '../controllers/generic';

const MODEL = 'Notice';
const notices = express.Router();

/**
 * GET /notices
 * Get all notices from database
 */
notices.get('/', (req, res) => {
  getAll(MODEL, req, res);
});

/**
 * GET /notices/:id
 * Get all details of a given notice by ID
 */
notices.get('/:id', (req, res) => {
  getById(MODEL, req, res)
});

/**
 * PUT /notices/:id
 * Updates a given notice by ID
 */
notices.put('/:id', (req, res) => {
  updateById(MODEL, req, res)
});

/**
 * POST /notices
 * Inserts a new Notice
 */
notices.post('/', (req, res) => {
  insert(MODEL, req, res)
});

/**
 * DELETE /notices/:id
 * Deletes a given notice by ID
 */
notices.delete('/:id', (req, res) => {
  deleteById(MODEL, req, res)
});

export default notices;