const RequestService = require('../Services/RequestService');
const FlashCardRepo = require('../Data/FlashCardRepo');
const _flashcardRepo  =  new FlashCardRepo();
const HomeRepo = require('../Data/HomeRepo');
const _homeRepo = new HomeRepo();

exports.Index = async function (request, response) {
    let flashcards = await _homeRepo.allFlashCards();

    

    if (flashcards != null) {
        let reqInfo = RequestService.reqHelper(request);
        response.render('Home/Index', { flashcards: flashcards, reqInfo: reqInfo, Title: Title});
    }
    else {
        response.render('Home/Index', { flashcards: [] })
    }
};