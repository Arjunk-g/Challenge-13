const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const CategoryData = await Category.findAll();
    res.status(200).json(CategoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/:id', async (req, res) => {
  try {
    const CategoryData = await Category.findByPk(req.params.id, {
      // JOIN with Tags, using the Product through table
      include: [{ model: Tag, through: Product, as: 'planned_Products' }]
    });
 
    if (!CategoryData) {
      res.status(404).json({ message: 'No Category found with this id!' });
      return;
    }
 
    res.status(200).json(CategoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.post('/', async (req, res) => {
  try {
    const CategoryData = await Category.create(req.body);
    res.status(200).json(CategoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});


router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', async (req, res) => {
  try {
    const CategoryData = await Category.destroy({
      where: {
        id: req.params.id
      }
    });
 
    if (!CategoryData) {
      res.status(404).json({ message: 'No Category found with this id!' });
      return;
    }
 
    res.status(200).json(CategoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;
