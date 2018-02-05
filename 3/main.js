var Item = Backbone.Model.extend({
  defaults: {
    text: 'hello',
    color: 'pink'
  }
});

var List = Backbone.Collection.extend({
  model: Item
});

var ListView = Backbone.View.extend({
  el: $('body'),

  events: {
    'click button#add': 'addItem'
  },

  initialize() {
    var methods = [
      'render',
      'addItem',
      'appendItem',
      'updateFromPersistance',
      'updatePersistanceOnAdd'
    ];

    _.bindAll(this, ...methods);

    this.collection = new List();
    this.collection.bind('add', this.appendItem);
    this.counter = 0;

    this.render();
    this.updateFromPersistance();
  },

  render() {
    $(this.el).append("<input id='inputText' type='text' placeholder='text'/>");
    $(this.el).append("<input id='inputColor' type='text' placeholder='color'/>");
    $(this.el).append("<button id='add'>add Item</button>");
    $(this.el).append("<ul></ul>");
  },

  updateFromPersistance() {
    var storage = window.localStorage['hello-backbone-3-collection'];

    if (!storage) {
      window.localStorage['hello-backbone-3-collection'] = JSON.stringify({
        collection: [],
        counter: 0
      });
    } else {
      var parsedStorage = JSON.parse(storage);
      this.counter = parsedStorage.counter;
      parsedStorage.collection.forEach((item) => {
        this.collection.add(item);
      });
    }
  },

  addItem() {
    this.counter++;

    var item = new Item();

    item.set({
      text: $('#inputText', this.el).val(),
      color: $('#inputColor', this.el).val(),
      number: this.counter
    });

    this.collection.add(item);
    this.updatePersistanceOnAdd(item);
  },

  updatePersistanceOnAdd(item) {
    var storage = JSON.parse(window.localStorage['hello-backbone-3-collection']);
    storage.collection.push(item);
    storage.counter = this.counter;
    window.localStorage['hello-backbone-3-collection'] = JSON.stringify(storage);
  },

  appendItem(item) {
    $('ul', this.el).append(
      `<li style="background: ${item.get('color')};">${item.get('number')}. ${item.get('text')}</li>`
    );
  }
});

var listView = new ListView();
