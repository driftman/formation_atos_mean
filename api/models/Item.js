

module.exports = {

	// Contient la liste des attributs pour le model Item
	// La clé désigne le nom de l'attribut
	// La valeur est un objet décrivant l'attribue; 
	// 1- type => désigne le type (string text integer float date time datetime boolean binary array json)
	// 2- required => indique que le champs est obligatoire ( Ce sont des tests qui se font au niveau de Waterline )
	// 3- size => indique le nombre de caratères
	// 4- unique => le champs doit être unique ou non ( Ce sont des tests qui se font au niveau de Waterline )
	// Autres propriétés 
	// 5 - defaultsTo
	// 6 - autoIncrement
	// 7 - primaryKey (Si autoPK === false)
	// 8 - enum ==> type: 'string', enum: ['pending', 'approved', 'denied']
	// 9 - size ==> varchar(255)
	// 10 - columnName ==> une nomenclature plus personnalisée des noms de collonne 

	attributes: {

		title: {
  		type: 'text',
  		size: 150,
  		required: true,
  		unique: false
  	},

  	description: {
  		type: 'longtext',
  		required: true
  	},

  	// Cette partie est
  	// pour les relations entre différents model

  	// Chaque Item a un User associé
  	// owner: {
  	//   model: 'User',
  	// 	 NB: Si le lien doit être FORT ou FAIBLE
  	//   required: true || false
  	// },

  	// Chaque Item 0 ou n 
  	// Add a reference to Pets
		// reactions: {
		//   collection: 'Reaction',
		//   via: 'item'
		// }

	},

	afterCreate: function afterCreate(post, next) {
        // do something
        next();
    },

    afterDestroy: function(post, next) {
    	// do whatever you want
      next();
    }
}