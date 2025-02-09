const { DataTypes } = require("sequelize");
const sequelize = require("../../database/db.config"); // Import Sequelize instance

// Define the Vendor model
const Vendor = sequelize.define(
  "Vendor",
  {
    vendor_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    vendorName: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    ownerName: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    emailAddress: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true, // Ensures proper email format
      },
    },
    phoneNo: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    businessName: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    businessRN: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    businessAddress: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    businessLicense: {
      type: DataTypes.STRING(255),
      allowNull: false, // Stores file path as a string
    },
    citizenShip: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    termsAccepted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      onUpdate: DataTypes.NOW, // Automatically updates timestamp
    },
  },
  {
    timestamps: true, // Enables createdAt & updatedAt
    tableName: "Vendors",
  }
);

// Sync the table
(async () => {
  await sequelize.sync({ alter: false });
  console.log("Vendors table synced!");
})();

module.exports = Vendor;
