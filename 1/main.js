(function($) {

  var ListView = Backbone.View.extend({

    el: $('body'),

    initialize() {
      _.bindAll(this, 'render', 'otherMethod');

      console.log('this.options:', this.options);

      this.render();
    },

    render() {
      $(this.el).append("<p>hello backbone</p>");
    },

    otherMethod() {
      console.log('in otherMethod');
    }
  });


  var listView = new ListView({ prop1: 'prop1' });

  console.log('listView:', listView);
  console.log('ListView:', ListView);
  console.log(
    'Backbone.View.extend:',
    Backbone.View.extend
  );


}(jQuery));
