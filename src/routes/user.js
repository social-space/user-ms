const router = require('express-promise-router')()
const conn = require('../db');

//Create a user profile
router.post('/', async (req, res) => {
    let db = await conn.connect();
    let userCollection = db.collection('user');

    let username = req.body.username.toString();

    let existing = await userCollection.findOne({
        username: username
    });

    if(existing) {
        return res.status(409).end()
    }

    await userCollection.insertOne({
        identity: req.user.identity.id,
        // Probably should focus on forcing these into models but I don't have the time right now.
        username: username
    });
    res.status(201).end()
});

//Worthless stub at the moment - need to add in profile picture, other details
router.get('/public/:username', async (req, res) => {
    let db = await conn.connect();
    let userCollection = db.collection('user');

    let user = await userCollection.findOne({
        username: req.params.username
    })

    if(user) {
        return res.json({
            username: user.username
        });
    } else {
        res.status(404).end();
    }
})

router.get('/private/:username', async (req, res) => {
    let db = await conn.connect();
    let userCollection = db.collection('user');

    let user = await userCollection.findOne({
        username: req.params.username,
        identity: req.user.identity.id
    })

    if(user) {
        return res.json(user);
    } else {
        res.status(404).end();
    }
})

module.exports = router;