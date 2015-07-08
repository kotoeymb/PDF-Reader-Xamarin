exports.definition = {
	config: {
		columns: {
		    "id": "string",
		    "name": "string",
		    "date": "string"
		},
		adapter: {
			type: "sql",
			collection_name: "pdfs"
		}
	},
	extendModel: function(Model) {
		_.extend(Model.prototype, {
			// extended functions and properties go here
		});

		return Model;
	},
	extendCollection: function(Collection) {
		_.extend(Collection.prototype, {
			guid : function(opts) {
				function s4() {
					return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
				}

				return (s4() + s4() + '-' + s4() + s4()).toUpperCase();
			}
		});

		return Collection;
	}
};
