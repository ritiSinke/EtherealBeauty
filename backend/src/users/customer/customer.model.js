
// Define the Customer model
const { DataTypes } = require("sequelize");
const sequelize = require("../../database/db.config");
//const bcrypt = require('bcryptjs');


// Define the Customer model
const Customer = sequelize.define("Customers", {
  customer_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,  // Explicitly set as the primary key
    autoIncrement: true,  // Automatically increment the value for new records
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone_no: {
    type: DataTypes.STRING,
    allowNull: false,
   unique: true,  // Ensure the phone number is unique
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,  // Validate email format
    },
  },
},
  {
    timestamps: false, // Disabling Sequelize's automatic timestamps
    tableName: "Customers",
  }
  

 );




// Sync the table
// (async () => {
//   await sequelize.sync({ alter: true });
//   console.log("Customers table synced!");
// })();

module.exports = Customer;