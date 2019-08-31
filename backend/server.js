const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const db = require('knex')({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'denizevrendilek',
        password: '',
        database: 'users'
    }
});

app.use(bodyParser.json());
app.use(cors());

const app = express();

const database = {
    users: [
        {
            id: "123"
        }, {
            id: "456"
        }

    ]
}

app.get('/', (request, response) => {})

app.post('/signin', (request, response) => {
    if (true) {
        response.json('success');
    } else {
        response
            .status(400)
            .json(`Error Logging in`);
    }
})

app.post('/signup', (request, response) => {
    const {email, name, password} = request.body;
    db('users')
        .returning('*')
        .insert({email: email, name: name, joined: new Date()})
        .then(response => {
            response.json(response);
        })
})

app.get('profile/:id', (request, response) => {
    const {id} = request.params;
    let found = false;
    database
        .users
        .forEach(users => {
            if (users.id === id) {
                response.json(user);
                found == true;

            }
        })
    if (!found) {
        response
            .status(404)
            .json('This user does not exists!');
    }
})

app.listen(3002, () => {})