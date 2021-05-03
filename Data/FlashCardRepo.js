const FlashCard = require('../Models/FlashCard');

class FlashCardRepo {
    
    // This is the constructor.
    FlashCardRepo() {        
    }

    // Gets all flashcards.
    async allFlashCards() {     
        let flashcards = await FlashCard.find().exec();
        return   flashcards;
    }

    async getFlashCard(title) {  
        let flashcard = await FlashCard.find({Title:title}).exec();
        return   flashcard;
    }

    async userFlashCards(user) {  
        let flashcards = await FlashCard.find({UserName: user}).exec();
        return   flashcards;
    }

    async create(flashcardObj) {
        console.log(flashcardObj)
        try {
            // Checks if model conforms to validation rules that we set in Mongoose.
            var error = await flashcardObj.validateSync();
            
            // The model is invalid. Return the object and error message. 
            if(error) {
                let response = {
                    obj:          flashcardObj,
                    errorMessage: error.message };
                console.log(JSON.stringify(response))
                return response; // Exit if the model is invalid.
            } 
    
            // Model is not invalid so save it.
            const result = await flashcardObj.save();
    
            // Success! Return the model and no error message needed.
            let response = {
                obj:          result,
                errorMessage: "" };
    
            return response;
        } 
        //  Error occurred during the save(). Return orginal model and error message.
        catch (err) {
            let response = {
                obj:          flashcardObj,
                errorMessage: err.message };
            
            return  response;
        }    
    } 
    
    async update(editedObj) {   
    
        // Set up response object which contains origianl flashcard object and empty error message.
        let response = {
            obj:          editedObj,
            errorMessage: "" };
            
        try {
            // Ensure the content submitted by the user validates.
            var error = await editedObj.validateSync();
            if(error) {
                response.errorMessage = error.message;
                return response;
            } 
    
            // Load the actual corresponding object in the database.
            let flashcardObject = await this.getFlashCard(editedObj.id);
    
            // Check if flashcard exists.
            if(flashcardObject) {
    
                // FlashCard exists so update it.
                let updated = await FlashCard.updateOne(
                    { _id: editedObj.id}, // Match id.
    
                    // Set new attribute values here.
                    {$set: { Title: editedObj.Title }}); 
    
                // No errors during update.
                if(updated.nModified!=0) {
                    response.obj = editedObj;
                    return response;
                }
                // Errors occurred during the update.
                else {
                    response.errorMessage = 
                        "An error occurred during the update. The item did not save." 
                };
                return response; 
            }
                
            // FlashCard not found.
            else {
                response.errorMessage = "An item with this id cannot be found." };
                return response; 
            }
    
                    // An error occurred during the update. 
        catch (err) {
            response.errorMessage = err.message;
            return  response;
        }    
    }  
    
    async delete(id) {
        console.log("Id to be deleted is: " + id);
        let deletedItem =  await FlashCard.find({_id:id}).remove().exec();
        console.log(deletedItem);
        return deletedItem;
    }
    
    async getallFlashCardbyTitle(title){
        let flashcards =  await FlashCard.find({ Title: title}).exec();
        return flashcards
    }


   async getFlashCardPerUser(user)  {
       let flashcard = await FlashCard.find({ UserName: user}).exec();
       return flashcard
   }
}

module.exports = FlashCardRepo;