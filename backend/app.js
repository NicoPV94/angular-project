const express = require('express');
const bodyParser = require('body-parser');

//Creating express app
const app = express();

app.use(bodyParser.json());


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers', 
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PATCH, DELETE, OPTIONS'
        );
    next();
});

app.post('/api/posts', (req, res, next) => {
    console.log();
});

app.use('/api/posts', (req, res, next) => {
    const posts = [
    {   id: 'askdjh',
        title: 'First server-side post!',
        content: 'This is coming form the server'  
    },
    { 
        id: 'ytrjlr',
        title: 'Second server-side post!',
        content: 'This is coming from the server'
    }
    ];
    res.status(200).json({
        message: 'Posts fetched successfully!',
        posts: posts
    });
});

module.exports = app;