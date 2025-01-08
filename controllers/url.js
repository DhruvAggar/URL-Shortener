// firstly install the package nanoid to use the package
const shortid = require('shortid');
const Url = require('../models/url');


// this is the service that uses to generate short id numbers -- source npmjs website and nanoid is a package...
async function generateShortUrl(req, res){
    const body = req.body;

    /* The code `if(!body.Url) return res.status(400).json({error: 'Please provide a redirect URL'});`
    is a validation check. It checks if the `Url` property is missing or empty in the request body.
    If the `Url` property is not provided, it returns a response with a status code of 400 (Bad
    Request) and a JSON object containing an error message indicating that a redirect URL needs to
    be provided. This helps ensure that the necessary data is present before proceeding with
    generating a short URL. */

    if(!body.Url) return res.status(400).json({error: 'Please provide a redirect URL'});
    const shortID = shortid();

    /* The code snippet `await Url.create({ shortId: shortID, redirectURL: body.Url, visitHistory: []
    });` is creating a new record in a database using the `Url` model. It is inserting a new
    document with the following fields: */
    await Url.create({
        shortId : shortID,
        redirectURL: body.Url,
        visitHistory: []
    });

    return res.json({ id: shortID });
}

// async function get(req, res){
//     const shortId = req.params.shortid;
//     const entry = await URL.findOneAndUpdate({
//         shortId
//     }, { $push: {
//         visitHistory: {
//             timestamp: Date.now()
//         }
//     } })
//     res.redirect(entry.redirectURL);
// }

async function GetAnalytics(req, res){
    const shortId = req.params.shortId;
    const result = await Url.findOne({ shortId }); 
    return res.json({ 
        totalClicks: result.visitHistory.length, 
        analytics: result.visitHistory 
    });
}

module.exports = { generateShortUrl, GetAnalytics};