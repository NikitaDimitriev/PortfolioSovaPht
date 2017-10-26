// grab the mongoose module
var mongoose = require('mongoose');

// define our nerd model
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('Album', {
	title : {type : String, default: ''},
	discription : {type: String, default: ''},
	category : {type: String, default: ''},
	camera : {type: String, default: ''},
	titlePhoto : {data: Buffer, type: String},
	photos : {type: Array, default: ''},
	uploadDate: {type: Date, default: Date.now}
});
