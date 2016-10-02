var express = require('express');
var override = require('method-override');
var bodyParser = require('body-parser');
var connection = require('./config/connection');

var exphbs = require('express-handlebars');


var app = express();

app.use(express.static(process.cwd() + '/public'));

app.use(override('_method'));

app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.text());
app.use(bodyParser.json({
  type: 'application/vnd.api+json'
}));


connection.connect(function (err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  };

  console.log('connected as id ' + connection.threadId);

});


app.get('/', function (req, res) {
  
  connection.query('ALTER TABLE burgers AUTO_INCREMENT = 1',function(err,data){});

  connection.query('SELECT * FROM burgers;', function (err, data) {

    if (err) throw err;

    var obj = [];

    data.forEach(function (value) {

      obj.push(value);


    });

    console.log(obj[0].devoured);
    res.render('index', {
      hamburgers: obj
    });

  });
});


app.post('/create', function (req, res) {
  
    connection.query('INSERT INTO burgers (burger_name,devoured) VALUES (?,0)', [req.body.burger], function (err, data) {

      if (err) throw err;

      //      req.body.devoured = 0;

      console.log('Im in create');
      console.log(req.body.burger);

      res.redirect('/');
    });
});


app.put('/update', function (req, res) {
  connection.query('UPDATE burgers SET devoured = 1 WHERE id = ?',[req.body.id], function (err, result) {
    if (err) throw err;
    res.redirect('/');
  });
});


var PORT = process.env.PORT || 3001;
app.listen(PORT, function () {
  console.log('IM LISTENING IS PORT ' + PORT);

})