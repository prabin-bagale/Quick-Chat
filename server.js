const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const connectDB = require("./config/dbConfig");
const app = require("./app");

const PORT = process.env.PORT_NUMBER || 3000;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error("❌ Server failed to start");
    process.exit(1);
  }
};

startServer();
