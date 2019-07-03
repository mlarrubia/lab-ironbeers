
const express = require('express');
const hbs     = require('hbs');
const app     = express();
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();


// -------------   Express   --------------------------------
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));



//  --------------  Partials   --------------------------------

hbs.registerPartials(__dirname + '/views/partials');

// ---------------   Pages   -----------------------------------



app.get('/', (req, res, next) => {
  res.render('index');
});

app.get('/beers', (req, res, next) => {
  punkAPI.getBeers()
  .then(beers => {
    console.log(beers.name);
    
    
  
    
    res.render('beers', {bunchaBeers: beers})
  })
  .catch(error => {
    console.log(error)
  })


});

app.get('/random-beer', (req, res, next) => {
  
  punkAPI.getRandom()
  .then(beers => {   

    res.render('randomBeer', {random:  beers[0]});
    
  })
  .catch(error => {
    console.log(error)
  })
  
});


app.listen(3000);
