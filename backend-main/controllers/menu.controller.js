import Pizza from '../models/Pizza.model.js';

// Get all pizzas
const getPizzas = async (req, res) => {
  try {
    const pizzas = await Pizza.find({ isAvailable: true });
    res.json(pizzas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get pizza by ID
const getPizzaById = async (req, res) => {
  try {
    const pizza = await Pizza.findById(req.params.id);
    if (pizza) {
      res.json(pizza);
    } else {
      res.status(404).json({ message: 'Pizza not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create pizza (admin only)
const createPizza = async (req, res) => {
  try {
    const pizza = new Pizza(req.body);
    const createdPizza = await pizza.save();
    res.status(201).json(createdPizza);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update pizza (admin only)
const updatePizza = async (req, res) => {
  try {
    const pizza = await Pizza.findById(req.params.id);
    if (pizza) {
      Object.assign(pizza, req.body);
      const updatedPizza = await pizza.save();
      res.json(updatedPizza);
    } else {
      res.status(404).json({ message: 'Pizza not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete pizza (admin only)
const deletePizza = async (req, res) => {
  try {
    const pizza = await Pizza.findById(req.params.id);
    if (pizza) {
      await pizza.remove();
      res.json({ message: 'Pizza removed' });
    } else {
      res.status(404).json({ message: 'Pizza not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getPizzas, getPizzaById, createPizza, updatePizza, deletePizza };