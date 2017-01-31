/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': {
    view: 'homepage'
  },

  /***************************************************************************
  *                                                                          *
  * Custom routes here...                                                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the custom routes above, it   *
  * is matched against Sails route blueprints. See `config/blueprints.js`    *
  * for configuration options and examples.                                  *
  *                                                                          *
  ***************************************************************************/

  /**
  * Ce bloc est un exemple de paramètrage d'une route
  * 1- 'post /path/to' décrit la méthode HTTP avec laquelle
  * le client va intérroger le serveur, ici dans l'exemple
  * on utilise la méthode "POST"
  * 2- controller: décrit le nom du controlleur qui sera responsable de
  * de cette route
  * 3- action: c'est un fonction qui se trouve à l'intérieur du controlleur
  * qu'on a paramétré pendant l'étape 2
  * 4- skipAssets: veut dire que cette route n'a pas une vue à rendre au client
  * on l'utilise si la route est utilisée comme API 
  * 5- view: décrit le nom de la vue qu'on veut utiliser
  **/

  // Ceci est un exemple de création d'une API customizé
  // J'ai utilisé une méthode POST
  // dans laquelle j'envoie un objet de type
  // item que je vais intercepté plutard
  // au niveau du controlleur et plus précisemment
  // la méthode add
  'get /items': {
    controller: 'ItemController',
    action: 'get',
    skipAssets: true
  },

  'post /items': {
    controller: 'ItemController',
    action: 'add',
    skipAssets: true
  }

  // 'post /path/to': {
  //  controller: 'CustomRouteController',
  //  action: 'actionName',
  //  skipAssets: true || false
  //  view: 'viewName'
  // },

};
