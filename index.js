/**
* A basic bootstrap that will route request to REST API
* end points. 
**/
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var ContactsModel = require('./app/models/contacts');

var app = express();
var router = express.Router();

app.use(bodyParser.urlencoded({extented: true}));
app.use(bodyParser.json());
app.use('/api', router);
app.use(express.static(__dirname + '/public'));

app.set('port', (process.env.PORT || 5000));

mongoose.connect(process.env.MONGOLAB_URI);

console.log('MONGOLAB_URI: ' + process.env.MONGOLAB_URI);

router.use(function(request, response, next){
	console.log('request: ' + request.path + " method: " + request.method);
	next();
});

router.get('/', function(request, response) {
	response.json({message: 'address-book API is running'});
});


router.route('/contacts')
	
	// Contacts: POST
	.post(function(request, response) {

		var contacts = new ContactsModel();
		
		contacts.name = request.body.name;
		contacts.phone = request.body.phone; 

		contacts.save(function(err) {
			
			if (err) {
				response.json(err);
			};

			response.status(201);
			response.send(); 
		});
	})
	// Contacts: GET
	.get(function(request, response) {

		ContactsModel.find(function(err, contacts) {
			if (err) {
				response.status(404)
				response.json(err);
				response.send();
			};

			response.status(200);
			response.json(contacts);
			response.send();
		});
	});

router.route('/contacts/:contact_id')
	// Contacts: params GET
	.get(function(request, response) {
		ContactsModel.findById(request.params.contact_id, function(err, contact) {
			if(err) {
				response.json(err);
			}

			if(contact === null) {
				response.status(404)
			} else {
				response.status(200);
			}

			response.json(contact);
		});
	})
	.delete(function(request, response) {
		ContactsModel.findById(request.params.contact_id, function(err, contact) {
			if(err) {
				response.json(err);
			}

			if(contact === null) {
				response.status(404).send();
			} else {
				ContactsModel.remove({_id : request.params.contact_id}, function(err) {
					if(err) {
						response.json(err);
					}

					response.status(200).send();	
				});
			}
		});
	});


// Start server to listen at $PORT 
app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});
