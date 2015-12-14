var mongoose = require('mongoose');

var videoModel;

var videoSchema = new mongoose.Schema({
  thumbnail: {
    type: String
  },
  author: {
    type: String
  },
  title: {
    type: String
  },
  duration: {
    // todo this should actually probably be a Number
    type: String
  },
  youtubeUrl: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now()
  }
});

videoSchema.methods.toAPI = function() {
  return {
    thumbnail: this.thumbnail,
    author: this.author,
    title: this.title,
    duration: this.duration,
    youtubeUrl: this.youtubeUrl,
    _id: this._id
  };
};

videoSchema.statics.all = function(callback) {
  var search = {};
  
  return videoModel.find(search, callback);
};

videoSchema.statics.newestTen = function(callback) {
  var search = {};
  
  return videoModel.find(search).
  limit(10).
  sort({date: -1}).
  exec(callback);
};

videoModel = mongoose.model('video', videoSchema);

module.exports.videoModel = videoModel;
module.exports.videoSchema = videoSchema;