var express = require('express');
var override = require('method-override');
var bodyParser = require('body-parser');
var connection = require('./config/connection');

var exphbs = require('express-handlebars');



var app = express();


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





connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  };

  console.log('connected as id ' + connection.threadId);

});


app.get('/', function (req, res) {

    connection.query('SELECT * FROM burgers;', function(err, data) {
      
        if (err) throw err;

//        console.log(rows[0].id);
//   res.end(toString(rows[0].id));
        var obj=[];
        
        data.forEach(function (value) {

           obj.push(value);
//            console.log(value);


        });
        
        console.log(obj);
         res.render('index',{database:obj});

    });
        



    console.log('im here');
   
//    res.end('sss');

});






var PORT = 3000;
app.listen(PORT, function () {
    console.log('IM LISTENING IS PORT ' + PORT);

})