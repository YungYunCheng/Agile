var CardController = require('./Controllers/CardController');
var HomeController = require('./Controllers/HomeController');

// Routes
module.exports = function(app){  

    app.get('/',      HomeController.Index);
    
    app.get('/Card/Index',      CardController.Index);
    app.post('/Card/CreateCard', CardController.CreateCard);
    app.get('/Card/Create', CardController.Create);
    app.get('/Card/Detail', CardController.Detail);
};
