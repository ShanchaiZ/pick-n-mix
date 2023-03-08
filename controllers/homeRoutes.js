const router = require("express").Router();
const { User, ListItem, Product, Category } = require("../models");
const withAuth = require("../utils/auth");

// Route that displays all products to the homepage
router.get("/", async (req, res) => {
  try {
    // Get all products and JOIN with user data
    const productData = await Product.findAll({
      include: [
        {
          model: Category,
        },
      ],
    });

    // Serialize data so the template can read it
    const products = productData.map((product) => product.get({ plain: true }));

    // Pass serialized data and session flag into template
    if (req.session.logged_in) {
      const userData = await User.findByPk(req.session.user_id);
      const user = userData.get({ plain: true });

      res.render("homepage", {
        products,
        user,
        logged_in: req.session.logged_in,
      });
    } else {
      res.render("homepage", {
        products,
        logged_in: req.session.logged_in,
      });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/list", withAuth, async (req, res) => {
  try {
    const listItemData = await ListItem.findAll({
      include: [
        {
          model: User,
          attributes: { exclude: ["password"] },
          where: { id: req.session.user_id },
        },
        {
          model: Product,
        },
      ],
    });

    // const product = userData.listItems.product.map((product) => product.get({ plain: true}));
    const listItems = listItemData.map((listItem) =>
      listItem.get({ plain: true })
    );
    console.log(listItems);

    res.render("list", {
      listItems,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to display a specific post by id and the comments associated with it
router.get("/category/:id", async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      attributes: ["id", "name"],
      include: [
        {
          model: Product,
        },
      ],
    });

    const category = categoryData.get({ plain: true });
    console.log(category);

    res.render("category", { category, logged_in: req.session.logged_in });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to login page
router.get("/login", (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

module.exports = router;
