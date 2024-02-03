const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const colors = require("colors");

const app = require("./index");

// database connect
mongoose.connect(process.env.DATABASE).then(() => {
    console.log(`Database is connected successfully!`.yellow.bold)
})

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Server app is listenign on port : ${port}`.red.bold);
});
