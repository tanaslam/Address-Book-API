/**
* contacts schema file 
**/

var mongoose = require('mongoose');


var contactsShema = new mongoose.Schema( {
	name: String,
	phone: String
});

module.exports = mongoose.model('Contacts', contactsShema);