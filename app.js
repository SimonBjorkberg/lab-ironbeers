const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

hbs.registerPartials(__dirname + '/views/partials');

let beer = [];
let beers = [];

punkAPI
  .getRandom()
  .then(beerFromApi => {
    beer = beerFromApi;
  })
  .catch(error => console.log(error));

punkAPI
  .getBeers()
  .then(beersFromApi => {
    beers = beersFromApi;
  })
  .catch(error => console.log(error));

//INDEX PAGE

app.get('/', (req, res) => {
  res.render('index');
});

//ALL THE BEERS
app.get('/beers', (req, res) => {
  res.render('beers', { beers });
});

//RANDOM BEER
app.get('/random-beer', (req, res) => {
  punkAPI
  .getRandom()
  .then(beerFromApi => {
    console.log(beerFromApi)
    beer = beerFromApi;
  })
  .catch(error => console.log(error));
  res.render('random-beer', { beer });
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
