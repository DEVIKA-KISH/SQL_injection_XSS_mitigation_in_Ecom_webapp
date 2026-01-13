import { sequelize, Product } from "./db";

const seedDatabase = async () => {
  await sequelize.sync({ force: true }); // Recreates the tables

  await Product.bulkCreate([
    {
      name: "Laptop",
      description: "A powerful laptop",
      price: 1200,
      imageUrl: "https://via.placeholder.com/300x200?text=Laptop",
    },
    {
      name: "Mouse",
      description: "Wireless mouse",
      price: 20,
      imageUrl: "https://via.placeholder.com/300x200?text=Mouse",
    },
    {
      name: "Keyboard",
      description: "Mechanical keyboard",
      price: 100,
      imageUrl: "https://via.placeholder.com/300x200?text=Keyboard",
    },
  ]);

  console.log("Database seeded!");
  process.exit();
};

seedDatabase();
