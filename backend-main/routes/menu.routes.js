import express from 'express';
import { getPizzas, getPizzaById, createPizza, updatePizza, deletePizza } from '../controllers/menu.controller.js';
import { protect, admin } from '../middleware/auth.middleware.js';

const router = express.Router();

router.route('/')
  .get(getPizzas)
  .post(protect, admin, createPizza);

router.route('/:id')
  .get(getPizzaById)
  .put(protect, admin, updatePizza)
  .delete(protect, admin, deletePizza);

export default router;