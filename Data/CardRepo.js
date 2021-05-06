const Card = require('../Models/Card');

class CardRepo {
    
    // This is the constructor.
    CardRepo() {        
    }

    // Gets all flashcards.
    async getallcards() {     
        let cards = await Card.find().exec();
        return   cards;
    }

    async getCard(title) {  
        let card = await Card.findOne({title:title}).exec();
        return   card;
    }

    async userFlashCards(title) {  
        let flashcards = await Card.find({title: title}).exec();
        return   flashcards;
    }

    async create(cardObj) {
        try {
            // Checks if model conforms to validation rules that we set in Mongoose.
            var error = await cardObj.validateSync();
    
            // The model is invalid. Return the object and error message. 
            if(error) {
                let response = {
                    obj:          cardObj,
                    errorMessage: error.message };
    
                return response; // Exit if the model is invalid.
            } 
    
            // Model is not invalid so save it.
            const result = await cardObj.save();
    
            // Success! Return the model and no error message needed.
            let response = {
                obj:          result,
                errorMessage: "" };
    
            return response;
        } 
        //  Error occurred during the save(). Return orginal model and error message.
        catch (err) {
            let response = {
                obj:          cardObj,
                errorMessage: err.message };
    
            return  response;
        }    
    }

    
}

module.exports = CardRepo;