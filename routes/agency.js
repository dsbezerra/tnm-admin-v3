import express from 'express';
import {
  getAll,
  getById,
  updateById,
  insert,
  deleteById,
} from '../controllers/generic';

const MODEL = 'Agency';
const agencies = express.Router();

/**
 * GET /agencies
 * Get all agencies from database
 */
agencies.get('/', (req, res) => {
  getAll(MODEL, req, res);
});

/**
 * GET /agencies/:id
 * Get all details of a given agency by ID
 */
agencies.get('/:id', (req, res) => {
  getById(MODEL, req, res)
});

/**
 * PUT /agencies/:id
 * Updates a given agency by ID
 */
agencies.put('/:id', (req, res) => {
  updateById(MODEL, req, res)
});

/**
 * POST /agencies
 * Inserts a new Agency
 */
agencies.post('/', (req, res) => {
  insert(MODEL, req, res)
});

/**
 * DELETE /agencies/:id
 * Deletes a given agency by ID
 */
agencies.delete('/:id', (req, res) => {
  deleteById(MODEL, req, res)
});

export default agencies;