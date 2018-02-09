//////////////////////////////////////////////////////
const Item = Backbone.Model.extend({
  defaults: {
    content: 'default item'
  }
});

const List = Backbone.Collection.extend({
  model: Item
});

//////////////////////////////////////////////////////
const ListView = Backbone.View.extend({
  el: $('#lists'),

  initialize() {
    const methods = [
      'render',
      'appendItem'
    ];

    _.bindAll(this, ...methods);

    this.collection = this.options.collection;
    this.listName = this.options.listName;

    this.collection.bind('add', this.appendItem);

    this.render();
  },

  render() {
    $(this.el).append(`<ul id="${this.listName}"></ul>`);
  },

  appendItem(item) {
    $(`#${this.listName}`).html('');

    this.collection.models.forEach((item, index) => {
      $(`#${this.listName}`).append(`
        <li>${index+ 1}. ${item.attributes.content}</li>
      `);
    });
  }
});

//////////////////////////////////////////////////////////
const FormGroupView = Backbone.View.extend({
  el: $('#form'),

  initialize() {
    const methods = [
      'addItem',
      'render'
    ];

    _.bindAll(this, ...methods);

    this.formGroupName = this.options.formGroupName;
    this.inputLabel = this.options.inputLabel;

    this.collection = this.options.collection;

    this.render();
  },

  events: {
    'click .button': 'addItem'
  },

  render() {
    $(this.el).append(
      `<div id="formGroup-${this.formGroupName}">
        <label for="input-${this.formGroupName}" id="label-${this.formGroupName}">${this.inputLabel}</label>
        <input id="input-${this.formGroupName}" type="text" />
        <button class="button" id="button-${this.formGroupName}">add Item</button>
      </div>`
    );
  },

  addItem(event) {
    event.preventDefault();

    const newItem = new Item();

    newItem.set({
      content: $(`#input-${this.formGroupName}`).val()
    });

      this.collection.add(newItem);
  }
});

const fruitList = new List();

const fruitFormGroupView = new FormGroupView({
  formGroupName: 'fruit',
  inputLabel: 'add a fruit',
  collection: fruitList
});

const fruitListView = new ListView({
  collection: fruitList,
  listName: 'fruit'
});
