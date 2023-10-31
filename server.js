const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const MongoClient = require('mongodb').MongoClient
const password = encodeURIComponent('Breezy11#');
const databaseName = 'star-wars-quotes';
const uri = `mongodb+srv://BriannaD:${password}@cluster0.izsfpbz.mongodb.net/${databaseName}?retryWrites=true&w=majority`;


app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.use(express.static('public'))

app.use(bodyParser.json())


async function startServer() {
    try {
        const client = await MongoClient.connect(uri);
        console.log('Connected to Database');

        // Set up any additional code that relies on the database connection here.

        const db = client.db(databaseName); // Access the database
        const quotesCollection = db.collection('quotes'); // Access the "quotes" collection


        app.listen(3000, function () {
            console.log('Server listening on port 3000');
        });


        app.post('/quotes', (req, response) => {
            quotesCollection
                .insertOne(req.body)
                .then(result => {
                    console.log(result);
                    response.redirect('/'); 
                    
                })
                .catch(error => {
                    console.error(error);
                });
        });

        app.get('/', (req, res) => {
            db.collection('quotes')
                .find()
                .toArray()
                .then(results => {
                    console.log("Quotes retrieved from the database:", results);
                    res.render('index.ejs', { quotes: results });
                })
                .catch(error => {
                    console.error(error);
                    res.render('index.ejs', { quotes: [] }); // Handle the error by rendering the template with an empty array
                });
        });

        app.put('/quotes', (req, res) => {
            console.log(req.body)
        })

    } catch (err) {
        console.error(err);
    }
}

startServer();