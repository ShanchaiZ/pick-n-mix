//REQUIRE LIBRARY:
//=======================================================

//1. Install the dependencies.
const express = require("express");
const exphbs = require("express-handlebars");
const routes = require("./controllers");
const path = require("path");
const helpers = require("./utils/helpers");

const session = require("express-session");
const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

//2. SET UP THE EXPRESS SERVER:
const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({ helpers });

//Session Setup:
//===============================================

const sess = {
  secret: "Super secret secret",
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

//SET UP MIDDLEWARE:
//=======================================================

//setup app engine //Set up our view engine: our view engine is handlebars for the V in MVC
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

//Sets up the Express app to handle html parsing.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// This lets express server know where the static html pages are located. in this case its public html folder. this is where the html get parsed.
app.use(express.static(path.join(__dirname, "public")));

//we need to use express server to use the routes we code:
app.use(routes);

//SERVER START:
//===============================================

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`App is running on port ${PORT}`));
});

//we want our app to listen to a certain port during development but by default we will use 3001.
