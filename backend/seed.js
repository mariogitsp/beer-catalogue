const mongoose = require('mongoose');
const Location = require('./models/Location');

const seedLocations = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await Location.deleteMany({});

    const croatianLocations = [
      {
        name: 'Pivovara Karlovačka',
        type: 'brewery',
        address: {
          street: 'Trpimirova 2',
          city: 'Karlovac',
          postal_code: '47000',
          country: 'Croatia',
        },
        coordinates: { type: 'Point', coordinates: [15.5556, 45.4942] },
        phone: '+385 47 601 111',
        website: 'https://www.karlovacko.hr',
        description: "Home of Karlovačko beer - Croatia's most popular lager",
        common_beers: [
          { beer_name: 'Karlovačko Lager', brewery_name: 'Karlovačka Pivovara', is_available: true },
          { beer_name: 'Karlovačko Radler', brewery_name: 'Karlovačka Pivovara', is_available: true },
        ],
      },
      {
        name: 'Pivovara Zagrebačka',
        type: 'brewery',
        address: {
          street: 'Savska cesta 154',
          city: 'Zagreb',
          postal_code: '10000',
          country: 'Croatia',
        },
        coordinates: { type: 'Point', coordinates: [15.9889, 45.8011] },
        phone: '+385 1 6333 333',
        website: 'https://www.ozujsko.hr',
        description: "Home of Ožujsko beer - Zagreb's iconic brewery",
        common_beers: [
          { beer_name: 'Ožujsko Lager', brewery_name: 'Zagrebačka Pivovara', is_available: true },
          { beer_name: 'Ožujsko Cool', brewery_name: 'Zagrebačka Pivovara', is_available: true },
        ],
      },
      {
        name: 'Pivovara Osječka',
        type: 'brewery',
        address: {
          street: 'Donji Grad 1',
          city: 'Osijek',
          postal_code: '31000',
          country: 'Croatia',
        },
        coordinates: { type: 'Point', coordinates: [18.6939, 45.5543] },
        phone: '+385 31 543 111',
        website: 'https://www.osjecko.hr',
        description: "Croatia's oldest brewery, founded 1697",
        common_beers: [
          { beer_name: 'Osječko Lager', brewery_name: 'Osječka Pivovara', is_available: true },
          { beer_name: 'Osječko Dark', brewery_name: 'Osječka Pivovara', is_available: true },
        ],
      },
      {
        name: 'Velebitska Pivovara',
        type: 'brewery',
        address: {
          street: 'Zagrebačka 42',
          city: 'Gospić',
          postal_code: '53000',
          country: 'Croatia',
        },
        coordinates: { type: 'Point', coordinates: [15.3763, 44.5453] },
        phone: '+385 53 551 222',
        website: 'https://www.velebitska.hr',
        description: 'Craft brewery from Lika region',
        common_beers: [
          { beer_name: 'Velebitsko Lager', brewery_name: 'Velebitska Pivovara', is_available: true },
          { beer_name: 'Velebitsko Dark Lager', brewery_name: 'Velebitska Pivovara', is_available: true },
        ],
      },
      {
        name: 'Tomislav Pivovara',
        type: 'brewery',
        address: {
          street: 'Industrijska zona',
          city: 'Tomislavgrad',
          postal_code: '80240',
          country: 'Bosnia and Herzegovina',
        },
        coordinates: { type: 'Point', coordinates: [17.2333, 43.7333] },
        phone: '+387 34 301 111',
        website: 'https://www.pivotomislav.ba',
        description: 'Regional brewery from western Bosnia',
        common_beers: [
          { beer_name: 'Tomislav Lager', brewery_name: 'Pivovara Tomislav', is_available: true },
        ],
      },
    ];

    await Location.insertMany(croatianLocations);
    console.log(`Seeded ${croatianLocations.length} locations`);
    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
};

seedLocations();
