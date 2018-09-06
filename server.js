const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

let app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');

//While in maintenance
/*app.use((req, res, next) => {
    res.render('maintenance.hbs', {
        header: 'Sorry, the site is unvailable',
        maintenanceMsg: `We are running some maintenance tasks. We'll be back soon`
    })
});*/

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
})

app.use((req, res, next) => {
    let now = new Date().toString();
    let log = `${now}: ${req.method} ${req.url}`
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {console.log('Unable to append server.log.');};
    });
    next();
});

app.get('/', (req, res) => {
   /* res.send({
        name: 'Roldan',
        likes: [
            'music',
            'sports'
        ]
    });*/
    res.render('welcome.hbs',{
        pageTitle: 'Home Page',
        welcomeMsg: 'Welcome to my Website'
    })
});

app.get('/about', (req, res) => {
    //res.send('<h1>About Page</h1>');
    res.render('about.hbs', {
        pageTitle: 'About Page',        
    });
});

app.get('/projects', (req, res) => {
    res.render('projects.hbs', {
        pageTitle: 'Projects Page',
        projectsMsg: 'Portfolio Page'
    })
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to handle request'
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});