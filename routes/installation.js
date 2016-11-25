import express from 'express';
import {
  getAll,
  getById,
  updateById,
  insert,
  deleteById,
} from '../controllers/generic';

const MODEL = 'User';
const installations = express.Router();

/**
 * GET /installations
 * Get all installations from database
 */
installations.get('/', (req, res) => {
  getAll(MODEL, req, res);
});

/**
 * GET /installations/:id
 * Get all details of a given installation by ID
 */
installations.get('/:id', (req, res) => {
  getById(MODEL, req, res)
});

/**
 * PUT /installations/:id
 * Updates a given installation by ID
 */
installations.put('/:id', (req, res) => {
  updateById(MODEL, req, res)
});

/**
 * POST /installations
 * Inserts a new Installation
 */
installations.post('/', (req, res) => {
  insert(MODEL, req, res)
});

/**
 * DELETE /installations/:id
 * Deletes a given installation by ID
 */
installations.delete('/:id', (req, res) => {
  deleteById(MODEL, req, res)
});

export default installations;