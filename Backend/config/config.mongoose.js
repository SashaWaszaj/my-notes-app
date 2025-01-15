const mongoose = require('mongoose');

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Conection to MongoDB succesful'))
  .catch((error) => console.error('Error conecting to MongoDB:', error));