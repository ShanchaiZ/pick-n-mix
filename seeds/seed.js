const {Category, ListItem, Product, User} = require("../models")
const sequelize = require("../config/connection")

const categoryData = require("./categoryData.json")
const productData = require("./productData.json")

const seedDatabase = async () => {
    await sequelize.sync({force:true})

    for (const category of categoryData) {
        await Category.create({
            ...category
        })

    }

    for (const product of productData) {
        await Product.create({
            ...product
        });
    }
    process.exit(0)
}

seedDatabase();