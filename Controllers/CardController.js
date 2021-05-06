const Card           = require('../Models/Card');
var   passport       = require('passport');
const RequestService = require('../Services/RequestService');
const CardRepo   = require('../Data/CardRepo');
const _CardRepo  = new CardRepo();

exports.Index = async function(request, response){
    let cards = await _CardRepo.getallcards();
    if(cards!= null) {
        response.render('Card/Index', { cards:cards })
    }
    else {
        response.render('Card/Index', { cards:[] })
    }
};

// Shows one single object at a time. 
exports.Detail = async function(request, response) {
    // request.query used to get url parameter.
    let cardTitle  = request.query.title; 
    
    let cardObj = await _CardRepo.getCard(cardTitle);
    response.render('Card/Detail', { cards:cardObj });
}

// GET request calls here to display 'Card' create form.
exports.Create = async function(request, response) {
    response.render('Card/Create', { errorMessage:"", cards:{} });
};

// Receives POST data and tries to save it.
exports.CreateCard = async function(request, response) {

    // Package object up nicely using content from 'body'
    // of the POST request.
    let tempCardObj  = new Card( {
        "title":        request.body.title,
        "context":      request.body.context,
    });

    // Call Repo to save 'Product' object.
    let responseObject = await _CardRepo.create(tempCardObj);

    // No errors so save is successful.
    if(responseObject.errorMessage == "") {
        console.log('Saved without errors.');
        console.log(JSON.stringify(responseObject.obj));
        response.render('Card/Detail', { cards:responseObject.obj, 
                                            errorMessage:""});
    }
    // There are errors. Show form the again with an error message.
    else {
        console.log("An error occured. Item not created.");
        response.render('Card/Create', {
                        cards:responseObject.obj,
                        errorMessage:responseObject.errorMessage});
    }


};
