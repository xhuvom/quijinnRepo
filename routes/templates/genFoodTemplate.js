const Restaurant = require('../../model/Restaurants');
const Food = require('../../model/Foods');

module.exports.genFoodByFoodName = function (food_name, callback) {
    let perPage = 10;
    let page = 0;
    Food.find({food_name : food_name})
        .limit(perPage)
        .skip(perPage * page)
        .exec(function (err, foods) {
            callback(err, makeTemplate(foods));
        })
};

module.exports.genFoodByRestaurant = function (res_name, callback) {
    let perPage = 10;
    let page = 0;
    Restaurant.findOne({name : res_name}, function (err, restaurant){
        if (err) return err;
        Food.find({res_id: restaurant._id}, function(err, foods){
            if (err) return err;
            callback(err, makeTemplate(foods));
        })
    })

};

module.exports.genFoodByCuisine = function (cuisine, callback) {
    let perPage = 10;
    let page = 0;
    Food.find({cuisine : cuisine})
        .limit(perPage)
        .skip(perPage * page)
        .exec(function (err, foods) {
            callback(err, makeTemplate(foods));
        })
};


function makeTemplate(foods) {
    if(!foods.size) {
        let messageElements = foods.map(food => {
            return (
                {
                    "title": food.food_name,
                    "subtitle": food.cuisine + ', Rating :' + food.rating + ', ' + food.price + 'Tk',
                    "image_url": "https://media-cdn.tripadvisor.com/media/photo-s/0a/56/44/5a/restaurant.jpg",
                    "default_action": {
                        "type": "web_url",
                        "url": "fb.com/anjantb",
                        "messenger_extensions": false,
                        "webview_height_ratio": "compact"
                    },
                    "buttons": [
                        {
                            "type": "postback",
                            "title": "Add to cart",
                            "payload": food.food_name
                        }
                    ]
                }
            )
        });
        return {
            "attachment": {
                "type": "template",
                "payload": {
                    "template_type": "generic",
                    "elements": messageElements
                }
            }
        }
    }
    else {
        return [];
    }
}

