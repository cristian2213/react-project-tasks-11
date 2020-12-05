const mongoose = require('mongoose');

// dependencia para adminitras las variables de entorno
require('dotenv').config({ path: 'variables.env' });

// conect with the db
const connectDB = async () => {
  try {
    // to connect with mongoDB: url && config object
    await mongoose.connect(process.env.DB_MONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: true
    });
    console.log('DB connected');
  } catch (error) {
    console.log(error);
    // if exist one error, so stop the app
    process.exit(1);
  }
}

// export default
module.exports = connectDB;