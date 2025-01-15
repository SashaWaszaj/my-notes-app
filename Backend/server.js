const express = require("express");
const cors = require("cors");
const noteRoutes = require("./routes/notes.routes");
const categoryRoutes = require("./routes/category.routes");
const userRoutes = require('./routes/user.routes');

require('dotenv').config();
require("./config/config.mongoose");

const app = express();
const port = 8080;

app.use((req, res, next) => {
    res.setHeader('Content-Security-Policy', "default-src 'self'; img-src 'self' http://localhost:8080;");
    next();
  });
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use("/note", noteRoutes);
app.use("/category", categoryRoutes);
app.use('/api/auth', userRoutes);


app.listen(port, () => console.log(`Conection succesfull at port ${port}`));