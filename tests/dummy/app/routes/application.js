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
    var items = [
      {id: ++this._id, name: 'Erik'},
      {id: ++this._id, name: 'Kris'},
      {id: ++this._id, name: 'Martin'}
    ];

    return items;
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
      this.set('controller.model', shuffleArray(model).slice());
    }
  }
})
