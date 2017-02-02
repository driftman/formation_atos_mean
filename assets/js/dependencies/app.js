'use strict';

var myApp = angular.module("myApp", []);

// L'ajout d'un nouveau service
// on a injecté le service $http
// pour envoyer des requêtes Http API WS
myApp.factory('MainService', function($http, $q) {

	// déclarer les fonction que notre
	// met à disposition

	return {
		getDummyData: getDummyData,
		add: add,
		get: get,
		update: update,
		deleteItem: deleteItem
	};

	function get() {
		// on crée une nouvelle Promise
		var deferred = $q.defer();

		var request = {
			url: '/items',
			method: 'GET'
		};

		$http(request)
		.then(function(success) {
			var items = success.data;
			angular.forEach(items, function(item) {
				item.edit = false;
			});
			deferred.resolve(items);
		}, function(error) {
			deferred.reject(error);
		});
		return deferred.promise;
	}

	function update(article) {
		// la on doit faire un petit clean
		// au niveau de l'objet
		delete article.updatingState;
		var _article = angular.copy(article);
		delete _article.edit;
		var request = {
			url: '/items',
			method: 'PUT',
			data: article
		};
		return $http(request);
	}

	function add(article) {
		var request = {
			url: '/items',
			method: 'POST',
			data: article
		};
		return $http(request);
	}

	function deleteItem() {

	}

	function getDummyData() {
		return [{ title: "MongoDB", description: "..."},
			{ title: "ExpressJS", description: "..."},
			{ title: "AngularJS", description: "..."},
			{ title: "NodeJS", description: "..."},
			{ title: "SailsJS", description: "..."}];
	}
});

// c'est le main controller
myApp.controller('MainCtrl', function($scope, $timeout, MainService) {
	// on initialize le tableau des formations
	$scope.formations = JSON.parse(window.localStorage['formationAjoutees'] || '[]');
	// nom de la formation à ajouter
	$scope.nomDeLaFormation = '';
	// une fonction d'ajout
	$scope.ajouterFormation = function(nomDeLaFormation) {

		if(nomDeLaFormation !== undefined && nomDeLaFormation.trim().length === 0)
			return;
		var formation = {
			title:nomDeLaFormation,
			description: ''
		};
		
		// on ajout l'objet récemment créé 
		$scope.formations.push(formation);
		// on ajoute la nouvelle formation au local storage
		window.localStorage['formationAjoutees'] = JSON.stringify(formationAjoutees || []);
		// on réinitialize l'objet
		$scope.nomDeLaFormation = '';
	};
	// si aucune donnée n'est enregistrée au niveau du local storage
	// on simule un appel un service pour collecter
	// la liste des formations
	if($scope.formations.length === 0) {
		$timeout(function() {
			// faire appel à notre service
			// qui gère la liste des rubriques fourni
			// par notre formation
			var formations = MainService.getDummyData();
			angular.forEach(formations, function(formation) {
				$scope.formations.push(formation);
			});
		}, 0);
	}
})


// Ajout d'un nouveau controlleur
myApp.controller('ItemCtrl', function($scope, $timeout, MainService) {
	// en premier on doit initialize nos attributs
	// on connait très bien le titre de notre page
	$scope.title = "Controlleur dédié pour les articles";
	// on a pas toujours les articles car on a pas encore fait
	// d'appels aux ws pour les récupérer, en attendant
	// on les déclare comme étant un tableau vide
	$scope.articles = [];
	// objet formation
	$scope.article = {
		title: '',
		description: ''
	};
	// la fonction qui gère la modification
	$scope.edit = function(article) {
		update(article);
	};
	// c'est la fonction qui gère le clique au niveau
	// du bouton envoyer
	$scope.ajouterArticle = function(article) {
		MainService.add(article)
		.then(function(success) {
			$scope.article.title = '';
			$scope.article.description = '';
			var article = success.data;
			if(article !== undefined) {
				alert('Nom de l\'article : ' + article.title + ', description: ' + article.description);
				getAllItems();
			}
		}, function(error) {
			console.error(error);
		});
	};

	// Après un événement de clique on active ou on désactive 
	// l'article
	$scope.activateOrDeactivate = function(article) {
		update(article, true);
	}

	// fonction qui applique la mise à jour au niveau du serveur
	function update(article, activateOrDeactivate) {
		// c'est l'état initial après une mise à jour
		var updating = {
			state: 'Mise à jour en cours ...',
			succeeded: -1
		};

		// c'est l'état ou le mise à jour est OK
		var updateSucceeded = {
			state: 'Mise à jour terminée avec succès ...',
			succeeded: 1
		};

		// c'est l'état ou le mise à jour est NOK
		var updateFailed = {
			state: 'Mise à jour échouée ...',
			succeeded: 0
		};

		// si on est déja en mode edit
		// alors on doit envoyer la
		// mise à jour au WS
		if(article.edit === true || activateOrDeactivate) {
			article.updatingState = updating;
			$timeout(function() {
				MainService.update(article)
				.then(function(success) {
					article.updatingState = updateSucceeded;
				}, function(error) {
					article.updatingState = updateFailed;
					// on ajoute le message message d'erreur
					article.updatingState.message = error.message;
				});
			}, 1500)
		}

		// si on est en mode Activation ou Désactivation
		// de l'article on force l'état de l'édition à FAUX
		// car on ne modifie que l'état pas les propriétés
		if(activateOrDeactivate === true) {
			article.edit = false;
		} else {
			// on active ou désactive le mode edit
			article.edit = !article.edit;
		}
	}
	
	// fonction qui ramène la liste des articles
	function getAllItems() {
		$scope.articles = [];
		// la on va lancer un appel au ws associé 
		// pour le listage des article
		// TODO
		MainService.get().then(function(items) {
			console.log(items);
			angular.forEach(items, function(item) {
				$scope.articles.push(item);
			});
		}, function(error) {
			alert('Une erreur est survenue: ' + error.message);
		});
	}

	// La on ramène la liste des articles
	getAllItems();
});



