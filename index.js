
const express = require("express");
const bodyParser = require("body-parser");

const PORT = process.env.PORT || 8005;
const db = require("./models");

var app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));


app.use(bodyParser.json());
app.use(express.static("public"));


require("./app/routes/routes")(app);

db.sequelize.sync({
    force: false
}).then(function () {
    app.listen(PORT, function () {
        console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
    });
});