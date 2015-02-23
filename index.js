var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extented: true}));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));
app.set('port', (process.env.PORT || 5000));

var router = express.Router();

router.get('/', function(request, response) {
	response.json({message: 'address-book API is running'});
});

router.get('/contacts', function(request, response) {
	response.json({"contacts":[{"name":"Tanveer","phone":"0207 834521"},{"name":"Aslam","phone":"0787 834521"},{"name":"Billy","phone":"+44787834521"}]});
})

app.use('/api', router);

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});
