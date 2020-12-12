// const express = require('express');
// // const bodyParser = require('body-parser');

// const app = express();
// app.use((req, res, next) => {
//   var ip = req.headers['x-forwarded-for'] ||
//     req.connection.remoteAddress ||
//     req.socket.remoteAddress ||
//     (req.connection.socket ? req.connection.socket.remoteAddress : null);
//   console.log(ip);
//   next();
// });
// app.use(express.static('public'));
// // app.use(bodyParser.json());

// app.listen(process.env.PORT || 8000, function() {
//   console.log('server is on.')
// });

// module.exports = app;

const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const app = express();

app.use(bodyParser.json());

const generateJwt = (payload, expiresIn) => {
    return jwt.sign(
        payload,
        '123456789',
        {
            expiresIn: 24 * 60 * 60 * 1000
        }
    );
};

// param /api/3 id=3
// query ?a=1&b=2
app.post('/api/:id', function(req, res) {
    const message = req.query.message || 'World';
    const id = req.params.id;
    res.json({
        message: `Hello ${message} ${id}`
    });
})

app.get('/token/:id', function(req, res) {
    const id = req.params.id;
    res.json({
        token: generateJwt({ id })
    })
})

app.listen(7000, function() {
    console.log('server is running');
});