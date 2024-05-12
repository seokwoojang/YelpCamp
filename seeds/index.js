const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

//db 연결
mongoose.connect("mongodb://127.0.0.1:27017/yelp-camp");
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 200; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "66177f23e32a813b65d9e954",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
      images: [
        {
          url: "https://res.cloudinary.com/dfyxxfnwe/image/upload/v1713323590/YelpCamp/bbkaskwjipqovogc0rzz.png",
          filename: "YelpCamp/bbkaskwjipqovogc0rzz",
        },
        {
          url: "https://res.cloudinary.com/dfyxxfnwe/image/upload/v1713323590/YelpCamp/qtowjovveifsagluqiye.png",
          filename: "YelpCamp/qtowjovveifsagluqiye",
        },
      ],
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Et dolorum optio, enim, nobis ut, non eaque harum amet odio repudiandae voluptate. Laborum, aliquam labore velit modi suscipit magnam. Sed, iusto!",
      price,
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
