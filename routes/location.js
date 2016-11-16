import express from 'express';
import {
  getAll,
  getById,
  updateById,
  insert,
  deleteById,
} from '../controllers/generic';

import {
  getCitiesFromState
} from '../controllers/location';

const CITY_MODEL = 'City';
const STATE_MODEL = 'State';

const locations = express.Router();

/**
 * GET /locations/cities
 * Get all cities from database
 */
locations.get('/cities', (req, res) => {
  getAll(CITY_MODEL, req, res);
});

/**
 * GET /locations/states
 * Get all states from database
 */
locations.get('/states', (req, res) => {
  getAll(STATE_MODEL, req, res);
});

/**
 * GET /locations/states/:id/cities
 * Get all cities of a given state from database
 */
locations.get('/states/:id/cities', (req, res) => {
  getCitiesFromState(req, res);
});

/**
 * GET /locations/cities/:id
 * Get all details of a given city by ID
 */
locations.get('/cities/:id', (req, res) => {
  getById(CITY_MODEL, req, res)
});

/**
 * GET /locations/states/:id
 * Get all details of a given state by ID
 */
locations.get('/states/:id', (req, res) => {
  getById(STATE_MODEL, req, res)
});

/**
 * PUT /locations/cities/:id
 * Updates a given city by ID
 */
locations.put('/cities/:id', (req, res) => {
  updateById(CITY_MODEL, req, res)
});

/**
 * PUT /locations/states/:id
 * Updates a given state by ID
 */
locations.put('/states/:id', (req, res) => {
  updateById(STATE_MODEL, req, res)
});

/**
 * POST /locations/cities
 * Inserts a new City
 */
locations.post('/cities', (req, res) => {
  insert(CITY_MODEL, req, res)
});

/**
 * POST /locations/states
 * Inserts a new State
 */
locations.post('/states', (req, res) => {
  insert(STATE_MODEL, req, res)
});

/**
 * DELETE /locations/cities/:id
 * Deletes a given city by ID
 */
locations.delete('/cities/:id', (req, res) => {
  deleteById(CITY_MODEL, req, res)
});

/**
 * DELETE /locations/states/:id
 * Deletes a given state by ID
 */
locations.delete('/states/:id', (req, res) => {
  deleteById(STATE_MODEL, req, res)
});

export default locations;