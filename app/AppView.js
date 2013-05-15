var AppView = Backbone.View.extend({
	events:{
		'click #byName':'sortByName',
		'click #byBirthday':'sortByBirthday',
		'keyup #search':'search'
	},
	initialize: function(friends){
		this.collection.on('reset', this.render, this);
		this.$friendList = this.$el.find('.friend-list');
	},
	search: function(e){
	   	this.collection.search(e.currentTarget.value);
	},
	sortByName: function(){
		// Sort général grâce à un index avec les actions à éxécutées sur la liste
		this.collection.sortByName();
	},
	sortByBirthday: function(){
		this.collection.sortByBirthday();
	},
	render: function(collection){
		this.$friendList.empty();
		var $container = $('<div/>');
		collection.forEach(function(friend){
			var view = new FbApp.FriendView({model: friend});
			view.render().$el;
			// view.$el retourne l'élément jquery de la vue
			// on ajoute des éléments à $container afin d'éviter qu'il y ai un repaint après chaque ajout d'un element
			$container.append(view.render().$el);
		},this);
		this.$friendList.append($container);
	}
});
