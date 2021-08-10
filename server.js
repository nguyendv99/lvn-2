const express = require('express');
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser')
const cors = require('cors')
const cookieParser = require('cookie-parser');
const config = require("./config")

const app = express();


app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors())


app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.get('/', function (req, res) {
    res.render('home');
});

require("./routes/user.routes.js")(app);
require("./routes/test.routes.js")(app);

app.listen(config.port);