'use strict;'

var myApp = angular.module("myApp", []);

// L'ajout d'un nouveau service
// on a injecté le service $http
// pour envoyer des requêtes Http API WS
myApp.factory('MainService', function($http) {

	// déclarer les fonction que notre
	// met à disposition

	return {
		getDummyData: getDummyData,
		add: add
	};

	function add(article) {
		var request = {
			url: '/items',
			method: 'POST',
			data: article
		};
		return $http(request);
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
		}, 3000);
	}
})


// Ajout d'un nouveau controlleur
myApp.controller('ItemCtrl', function($scope, MainService) {
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
	// c'est la fonction qui gère le clique au niveau
	// du bouton envoyer
	$scope.ajouterArticle = function(article) {
		MainService.add(article)
		.then(function(success) {
			$scope.article.title = '';
			$scope.article.description = '';
			var article = success.data;
			if(article !== undefined) 
				alert('Nom de l\'article : ' + article.title + ', description: ' + article.description);
		}, function(error) {
			console.error(error);
		});
	};
	// la on va lancer un appel au ws associé 
	// pour le listage des article
	// TODO
});



