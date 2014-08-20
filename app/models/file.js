import Ember from 'ember';
import Line from './line';

var File = Ember.Object.extend({
  lines: [],

  init: function() {
    var linesData = this.get('content').split('\n');
    var _this = this;

    linesData.forEach(function(data, index) {
      var line = Line.create({
        lineNumber: index + 1,
        body: data
      });

      _this.get('lines').pushObject(line);
    });
    binding.pry
  }
});

export default File;
