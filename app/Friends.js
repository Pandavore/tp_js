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
	},
	initialize: function(){
  	},
	search: function(searchToken){
	    searchToken = searchToken.toLowerCase();

	    // Normalement on devrait avoir recourt à _.memoize pour ce genre
	    // de traitement "lourd" http://underscorejs.org/#memoize
	    console.time('flatten');
	    var friends = this._flatten(this.toJSON());
	    console.timeEnd('flatten');

	    console.time('search');
	    var sortedArray = friends.filter(function(friend){
	      return _.find(_.keys(friend), function(attr){
		  return friend[attr].toLowerCase().indexOf(searchToken) !== -1;
	      }, this) !== undefined;
	    }, this);
	    console.timeEnd('search');

	    this.trigger('reset', sortedArray);
	},
	_flatten: _.memoize(function(root){
	    // Since sometimes "bithday" is null, it won't be available in the finale object
	    // however, since the template requires it we have to define a default value.
	    var defaultValue = '';

	    function valueSelector(value){
	      return _.isString(value) && value.length > 0;
	    }

	    return root.map(function(friend){
	      return _.flattenObject(friend, valueSelector, defaultValue);
	    }, this);
	})
});
