const router = require("express").Router();
const { ListItem } = require("../../models");
const withAuth = require("../../utils/auth");

router.post("/", async (req, res) => {
  console.log("Post req successful!");
  try {
    const newListItem = await ListItem.create({
      quantity: req.body.quantity,
      product_id: req.body.product_id,
      user_id: req.session.user_id,
    });
    console.log("Post req successful2!");
    res.json(newListItem);
  } catch (err) {
    console.log("Post req successful3!");
    res.status(400).json(err);
  }
});

router.put("/:id", withAuth, async (req, res) => {
  console.log("put route");
  console.log(req.body);
  try {
    const listItemData = await ListItem.update(
      {
        quantity: req.body.quantity,
      },
      {
        where: {
          id: req.body.id,
        },
      }
    );

    if (!listItemData) {
      res.status(404).json({ message: "No post found with this id!" });
      return;
    }

    res.status(200).json(listItemData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", withAuth, async (req, res) => {
  try {
    const listItemData = await ListItem.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!listItemData) {
      res.status(404).json({ message: "No list item found with this id!" });
      return;
    }

    res.status(200).json(listItemData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/", withAuth, async (req, res) => {
  try {
    const listItemData = await ListItem.destroy({
      where: {
        user_id: req.session.user_id,
      },
    });

    if (!listItemData) {
      res.status(404).json({ message: "No list items found with this id!" });
      return;
    }

    res.status(200).json(listItemData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
