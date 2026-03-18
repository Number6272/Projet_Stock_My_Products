const mongoose = require("mongoose");

const connectDB = async () => {

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB bien connecteee avec succes");
  } catch (error) {

    console.error("erreur mongodb :", error.message);
    process.exit(1);
    
  }
};

module.exports = connectDB;