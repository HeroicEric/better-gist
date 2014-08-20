import Ember from 'ember';
import Comment from './comment';
import File from './file';

var Gist = Ember.Object.extend({
  comments: [],
  files: [],

  fetchComments: function() {
    var apiUrl = this.get('commentsUrl');
    var _this = this;

    return Ember.$.getJSON(apiUrl).then(function(commentsData) {
      commentsData.map(function(data) {
        var comment = Comment.create({
          url: data.url,
          id: data.id,
          user: data.user,
          body: data.body
        });

        var filename = comment.get('filename');
        var lineNumber = comment.get('line');
        var file = _this.get('files').filter(function(file) {
          return file.get('filename') === filename;
        })[0];

        var line = file.get('lines').filter(function(line) {
          return line.get('lineNumber') === lineNumber;
        })[0];

        line.get('comments').pushObject(comment);
        _this.get('comments').pushObject(comment);
      });
    });
  }
});

Gist.reopenClass({
  find: function(id) {
    var apiUrl = 'https://api.github.com/gists/' + id;

    return Ember.$.getJSON(apiUrl).then(function(attrs) {
      var gist = Gist.create({
        id: attrs.id,
        url: attrs.url,
        commentsUrl: attrs.comments_url,
        htmlUrl: attrs.html_url,
        description: attrs.description
      });

      var filesData = attrs.files;
      var files = _.toArray(filesData).forEach(function(data) {
        var file = File.create({
          filename: data.filename,
          language: data.language,
          content: data.content
        });

        gist.get('files').pushObject(file);
      });

      return gist.fetchComments().then(function() {
        debugger;
        return gist;
      });
    });
  }
});

export default Gist;
