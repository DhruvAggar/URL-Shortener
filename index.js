const express = require('express');
const urlRoute = require('./routes/url.js');
const { connectMongoDB } = require('./connect.js');
const URL = require('./models/url.js');
const path = require('path');
const staticRoute = require('./routes/staticRouter.js');


const app = express();
const port = 8080;

connectMongoDB('mongodb://localhost:27017/short-url')
.then(() => console.log('MongoDB connection established')); // it is the promise that will return always when mongodb connection is established

app.set('view engine', 'ejs'); // this is used to set the engine for the server side rendering for the frontend
app.set('views', path.resolve("./views"));

app.use(express.json()); 
app.use(express.urlencoded({ extended: false })); // this is used for the form data for the server side rendering for the frontend

app.use('/url', urlRoute);
app.use('/', staticRoute);


app.get('/url/:shortid', async (req, res) => {
    const shortId = req.params.shortid;
    const entry = await URL.findOneAndUpdate({
        shortId
    }, { $push: {
        visitHistory: {
            timestamp: Date.now()
        }
    } })
    res.redirect(entry.redirectURL);
});


app.listen(port, ()=>console.log(`Server Started on port at: ${port}`)); 