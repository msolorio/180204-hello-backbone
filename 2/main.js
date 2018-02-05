(function($) {

  var ListView = Backbone.View.extend({
    el: $('body'),

    events: {
      'click button#add': 'addItem'
    },

    initialize() {
      _.bindAll(this, 'render', 'addItem');

      this.counter = 1;
      this.render();
    },

    render() {
      $(this.el).append('<input id="input" />');
      $(this.el).append('<button id="add">Add Item</button>');
      $(this.el).append('<ul id="ul"></ul>');
    },

    addItem() {
      var text = $('#input', this.el).val();
      $('#ul', this.el).append(`<li>${this.counter}. ${text}</li>`);
      this.counter = this.counter += 1;
    }
  });

  var listView = new ListView();

  console.log(
    'listView:',
    listView
  );

}(jQuery));
