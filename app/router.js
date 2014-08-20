import Ember from 'ember';

var Router = Ember.Router.extend({
  location: BetterGistENV.locationType
});

Router.map(function() {
  this.resource('gist', { path: 'gists/:id' });
});

export default Router;
