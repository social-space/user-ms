const express = require('express');
const app = express();
const port = process.env.PORT || 5002;
const passport = require('./components/passport');
app.use(require('cookie-parser')())
app.use(passport.initialize());
app.use(express.json())
app.use(passport.authenticate('jwt', { session: false }), require('./routes'));
app.use(require('./routes'))
app.get('/', (req, res) => {
    res.json('foo')
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));