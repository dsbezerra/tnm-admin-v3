import express from 'express';
import {
  getAll,
  getById,
  updateById,
  insert,
  deleteById,
} from '../controllers/generic';

const MODEL = 'Bidding';
const biddings = express.Router();

/**
 * GET /biddings
 * Get all biddings from database
 */
biddings.get('/', (req, res) => {
  getAll(MODEL, req, res);
});

/**
 * GET /biddings/:id
 * Get all details of a given bidding by ID
 */
biddings.get('/:id', (req, res) => {
  getById(MODEL, req, res)
});

/**
 * PUT /biddings/:id
 * Updates a given bidding by ID
 */
biddings.put('/:id', (req, res) => {
  updateById(MODEL, req, res)
});

/**
 * POST /biddings
 * Inserts a new Bidding
 */
biddings.post('/', (req, res) => {
  insert(MODEL, req, res)
});

/**
 * DELETE /biddings/:id
 * Deletes a given bidding by ID
 */
biddings.delete('/:id', (req, res) => {
  deleteById(MODEL, req, res)
});

export default biddings;