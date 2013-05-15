FbApp.Friends = Backbone.Collection.extend({
	model: FbApp.Friend,
	sortByName: function(){
		var sortedArray = this.sortBy(function(friend){
			return friend.get('name');
		});

		this.trigger('reset', sortedArray);
	},
	sortByBirthday: function(){
		var sortedArray = this.sortBy(function(friend){
			return friend.get('birthday_date');
		});

		this.trigger('reset', sortedArray);
	}
});
