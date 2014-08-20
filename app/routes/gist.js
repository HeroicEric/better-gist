import Ember from 'ember';
import Gist from '../models/gist';

export default Ember.Route.extend({
  model: function(params) {
    var gist = Gist.find(params.id);
    debugger;
    return gist;
    // return Ember.RSVP.hash({
    //   gist: Gist.find(params.id),
    //   comments: Ember.$.getJSON('https://api.github.com/gists/1c9c0fea6efde3e7b0bc/comments')
    // });
  }
});
