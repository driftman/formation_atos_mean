/**
 * UserController
 *
 * @description :: Ceci est un controlleur qui va gérer l'API Items
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
	// cette fonction retourne l'ensemble des articles ou items
	get: function egt(req, res) {
		Item.find().then(function(items, err) {
			// Faites attention 
			// La disposition ou la cération de callback 
			// change d'un ENV à l'autre
			// vérifiez les toujours avant de les utiliser
			// sails.log("Error: ");
			// sails.log(err);
			// sails.log("Items: ");
			// sails.log(items);
			if(err) {
				sails.log(err);
				res.forbidden(getError());
			}
			res.ok(items);
		});
	},

	update: function update(req, res) {
		var item = req.body;
		Item.update(item.id, item)
		.then(function(item, err) {
			// sails.log('I\'m heeere [error]', err);
			if(err) {
				sails.error(err);
				res.forbidden(getError());
			}
			// sails.log('I\'m heeere [success]', item);
			res.ok(item)
		});
	},

	// ajoute un nouvel article
	add: function add(req, res) {
		var item = req.body;
		Item.create(item)
		.then(function(item, err) {
			if(err) {
				sails.error(err);
				res.forbidden(getError());
			}
			res.ok(item);
		});
	}

};

function getError() {
	return { status: 'NOK', message: '' };
}

