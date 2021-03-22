const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./src/routers/index");

let app = express();
const db = require("./src/config/database");
app.use(express.static("public"));
// var corsOptions = {
//   origin: "http://localhost:1234",
// };

// app.use(cors());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use("/shop/api", routes);

// db.sequelize.sync({ force: true }).then(() => {});

const PORT = process.env.PORT || 1234;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

module.exports = app;
