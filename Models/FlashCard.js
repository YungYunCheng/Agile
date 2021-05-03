var mongoose         = require('mongoose');

var flashcardSchema    = mongoose.Schema({
        // The _id property serves as the primary key. If you don't include it
        // the it is added automatically. However, you can add it in if you
        // want to manually include it when creating an object.

        // _id property is created by default when data is inserted.
        Title:    {"type" : "String", required: true},
        UserName:     {"type" : "String", required: true},
        context:      {"type" : "String", required: true},
        Date:         {"type" : Date, default: Date.now } ,
    }, 
    {   // Include this to eliminate the __v attribute which otherwise gets added
        // by default.
        versionKey: false 
    });
var FlashCard    = mongoose.model('FlashCard', flashcardSchema);
module.exports = FlashCard;
