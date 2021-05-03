const Home = require('../Models/Home');

class HomeRepo {
    
    // This is the constructor.
    HomeRepo() {        
    }

    // Gets all movies.
    async allFlashCards() {     
        let FlashCards = await Home.find().exec();
        return   FlashCards;
    }

    async getMovieById(Title) {
        let flashcard = await Home.findOne({Title: Title}).exec();
        return   flashcard;
    }
}

module.exports = HomeRepo;