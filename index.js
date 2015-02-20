var express = require('express');
var app = express();
var cool = require('cool-ascii-faces');

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response) {
	
	var out = ''
	var times = process.env.TIMES || 5

	console.log('times: ' + times);
	
	for (i = 0; i < times; i++)
		out+=cool() + ' ';
  	response.send(out);
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});
