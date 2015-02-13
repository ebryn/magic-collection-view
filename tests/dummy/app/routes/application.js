function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

export default Ember.Route.extend({
  model: function() {
    this._id = 0;
    var rows = [];
    var generator = Chance();

    for (var i = 0, l = 1000; i < l; i++) {
      rows.push({id: ++this._id, firstName: generator.first(), lastName: generator.last(), birthday: generator.birthday()});
    }

    return rows;
  },

  actions: {
    addNewPerson: function(newPerson) {
      var model = this.get('controller.model');
      model.push({id: ++this._id, name: newPerson});
      this.set('controller.model', model.slice());
      this.set('controller.newPerson', null);
    },

    shuffle: function() {
      var model = this.get('controller.model');
      var self = this;
      for (var i = 0, l = 1000; i < l; i++) {
        Ember.run.later(function() {
          self.set('controller.model', shuffleArray(model).slice());
        }, i * 10);
      }
    },

    sortBy: function(propName) {
      if (this._descending === undefined) { this._descending = true; }
      if (propName === this._lastPropName) { this._descending = !this._descending; }
      var model = this.get('controller.model');
      model.sort(function(a, b) {
        if (this._descending) {
          return Ember.compare(a[propName], b[propName]);
        } else {
          return Ember.compare(b[propName], a[propName]);
        }
      }.bind(this));
      this.set('controller.model', model.slice());
      this._lastPropName = propName;
    }
  }
})
