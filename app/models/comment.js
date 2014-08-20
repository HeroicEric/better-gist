import Ember from 'ember';

var Comment = Ember.Object.extend({
  init: function() {
    var body = this.get('body');
    var firstLine = body.split('\n')[0];
    var metadata = JSON.parse(firstLine);

    this.setProperties({
      filename: metadata.filename,
      line: metadata.line
    });
  }
});

export default Comment;
