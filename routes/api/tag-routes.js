const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    const TagData = await Tag.findAll();
    res.status(200).json(TagData);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/:id', async (req, res) => {
  try {
    const TagData = await Tag.findByPk(req.params.id, {
      // JOIN with ProductTags, using the Product through table
      include: [{ model: ProductTag, through: Product, as: 'planned_Products' }]
    });
 
    if (!TagData) {
      res.status(404).json({ message: 'No Tag found with this id!' });
      return;
    }
 
    res.status(200).json(TagData);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.post('/', async (req, res) => {
  try {
    const TagData = await Tag.create(req.body);
    res.status(200).json(TagData);
  } catch (err) {
    res.status(400).json(err);
  }
});


// router.put('/:id', (req, res) => {
//   // update a tag's name by its `id` value
// });

router.delete('/:id', async (req, res) => {
  try {
    const TagData = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });
 
    if (!TagData) {
      res.status(404).json({ message: 'No Tag found with this id!' });
      return;
    }
 
    res.status(200).json(TagData);
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;
