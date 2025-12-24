const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.CONN_STRING);
    console.log("✅ Database connected successfully");
  } catch (error) {
    console.error("❌ Database connection failed");
    console.error(error.message);
    throw error;
  }
};

module.exports = connectDB;
