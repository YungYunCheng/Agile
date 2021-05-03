const RequestService = require('../Services/RequestService');
const FlashCardRepo = require('../Data/FlashCardRepo');
const HomeRepo   = require('../Data/HomeRepo');
const _flashcardRepo  = new FlashCardRepo();
const _homeRepo = new HomeRepo();
const FlashCard       = require('../Models/FlashCard');

// Shows one single object at a time. 
exports.Detail = async function(request, response) {
    // request.query used to get url parameter.
    let flashcardID  = request.query._id; 
    console.log(flashcardID)
    let reqInfo = RequestService.reqHelper(request);

    let flashcardObj = await _flashcardRepo.getFlashCard(flashcardID);
    response.render('Review/Detail', { flashcards: flashcardObj, reqInfo: reqInfo});
};

// GET request calls here to display 'FlashCard' create form.
exports.Create = async function(request, response) {
    let reqInfo = RequestService.reqHelper(request);
    let Title  = request.query.Title; 
    let flashcardObj = await _homeRepo.getMovieById(Title)

    
    if(flashcardObj != null){
        response.render('Review/Create', { errorMessage:"", reqInfo: reqInfo, flashcardObj: flashcardObj } );
    }
    else{
       console.log("ohuh")
    }
};

// Receives POST data and tries to save it.
exports.CreateFlaschCard = async function(request, response) {
    let reqInfo = RequestService.reqHelper(request);

    // Package object up nicely using content from 'body'
    // of the POST request.
    let tempReviewObj  = new FlashCards( {
        Title:     request.body.Title,
        context:       request.body.context,
        UserName:      reqInfo.username,
    });
   
    // Call Repo to save 'Review' object.
    let responseObject = await _flashcardRepo.create(tempReviewObj);
    let flashcardreview = await _flashcardRepo.getFlashCard( request.body.Title);

    // No errors so save is successful.
    if(responseObject.errorMessage == "") {
        console.log('Saved without errors.');
        console.log(JSON.stringify(responseObject.obj));
        response.render('Flash Card/Detail', { flashcard:responseObject.obj, 
                                            reqInfo: reqInfo,
                                            errorMessage:"", flashcards: flashcardreview});
    }
    // There are errors. Show form the again with an error message.
    else {
        console.log("An error occured. Item not created.");
        response.render('Review/Create', {
                        flashcard:responseObject.obj, reqInfo: reqInfo,
                        errorMessage:responseObject.errorMessage});
    }
};

// Displays 'edit' form and is accessed with get request.
exports.Edit = async function(request, response) {
    let flashcardID  = request.query._id;
    let flashcardObj = await _flashcardRepo.getFlashCard(flashcardID);   
    response.render('Flash Card/Edit', {flashcard:flashcardObj, errorMessage:""});
}

// Receives posted data that is used to update the item.
exports.Update = async function(request, response) {
    let flashcardID = request.body._id;
    console.log("The posted review id is: " + flashcardID);

    // Parcel up data in a 'Flashcards' object.
    let tempReviewObj  = new FlashCards( {
        _id: flashcardID,
        UserName:    request.body.UserName,
        Title: request.body.Title,
        context: request.body.context,
        Date: request.body.Date
    });

    // Call update() function in repository with the object.
    let responseObject = await _flashcardRepo.update(tempReviewObj);

    // Update was successful. Show detail page with updated object.
    if(responseObject.errorMessage == "") {
        response.render('Flash Card/Detail', { flashcard:responseObject.obj, 
                                            errorMessage:"" });
    }

    // Update not successful. Show edit form again.
    else {
        response.render('Flash Card/Edit', { 
            flashcard:      responseObject.obj, 
            errorMessage: responseObject.errorMessage });
    }
}

exports.Delete = async function(request, response) {
    let id           = request.body._id;
    let deletedItem  = await _flashcardRepo.delete(id);

    // Some debug data to ensure the item is deleted.
    console.log(JSON.stringify(deletedItem));
    let flashcards     = await _flashcardRepo.allFlashCards();
    response.render('Home/Index', {flashcards:flashcards});
}
