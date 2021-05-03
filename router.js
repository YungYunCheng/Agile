var HomeController = require('./Controllers/HomeController');
var UserController = require('./Controllers/UserController');
var FlashCardController = require('./Controllers/FlashCardController');


// Routes
module.exports = function(app){  
    // Main Routes
    app.get('/',      HomeController.Index);

    app.get('/User/Register', UserController.Register);
    app.post('/User/RegisterUser', UserController.RegisterUser);
    app.get('/User/Login', UserController.Login);
    app.post('/User/LoginUser', UserController.LoginUser);
    app.get('/User/Logout', UserController.Logout);
    app.get('/Flash Card/MyFlashCard', UserController.MyFlashCard);
    app.get('/User/Profile', UserController.Profile);
    app.get('/Flash Card/Create', FlashCardController.Create);
    app.post('/Flash Card/CreateFlashCard', FlashCardController.CreateFlashCard);
    app.get('/Flash Card/Detail', FlashCardController.Detail);
    app.get('/Flash Card/Edit', FlashCardController.Edit);
    app.get('/Flash Card/Delete', FlashCardController.Delete);
    
};
