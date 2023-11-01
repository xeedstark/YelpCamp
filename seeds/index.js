const mongoose = require('mongoose');
const Campground = require('../models/campground');

const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp');
mongoose.connection.on("error", console.error.bind(console, "connection error."))
mongoose.connection.once("open", () => {
    console.log("Database connected");
});
const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    // const c = new Campground({ title: "Purple field" });
    // await c.save();
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '652f81efb529f25c848e0433',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            geometry: {
                type: 'Point',
                coordinates: [cities[random1000].longitude, cities[random1000].latitude]
            },
            title: `${sample(descriptors)} ${sample(places)}`,
            images: [
                {
                    url: 'https://res.cloudinary.com/dd1nhopsz/image/upload/v1698262601/YelpCamp/xfd5ea4cdmwv2wl9bkcd.jpg',
                    filename: 'YelpCamp/xfd5ea4cdmwv2wl9bkcd',
                },
                {
                    url: 'https://res.cloudinary.com/dd1nhopsz/image/upload/v1698262595/YelpCamp/kmf7jvxdvgl1plcficov.jpg',
                    filename: 'YelpCamp/kmf7jvxdvgl1plcficov',
                }
            ],
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia doloremque fugiat quis, totam et aspernatur ex ipsa ea! Non, sit quo? Voluptatem odit ipsum ab perspiciatis delectus minima, quasi fuga!',
            price
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});
