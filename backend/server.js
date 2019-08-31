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

app.get('/', (request, response) => {})

app.post('/signin', (request, response) => {
    db
        .select('email', 'hash')
        .where('email', '=', request.body.email)
        .from('login')
        .then(data => {
            const isValid = bcrypt.compareSync(request.body.password, data[0].hash);
            if (isValid) {
                return db
                    .select('*')
                    .from('users')
                    .where('email', '=', request.body.email)
                    .then(user => {
                        response.json(user[0])
                    })
                    .catch(error => response.status(400).json('Cant get the user'))
            }
            else{
                response.status(400).json('Wrong credentials')
            }
        })
        .catch(error => response.status(400).json('Wrong credentials'))

})

app.post('/signup', (request, response) => {
    const {email, name, password} = request.body;
    const hash = bcrypt.hashSync(password);
    db.transaction(trx => {
        trx
            .insert({hash: hash, email: email})
            .into('login')
            .returning('email')
            .then(loginEmail => {
                return trx('users')
                    .returning('*')
                    .insert({email: loginEmail[0], name: name, joined: new Date()})
                    .then(user => {
                        response.json(user);
                    })
            })
            .then(trx.commit)
            .catch(trx.rollback)
    }).catch(error => response.status(400).json('Error signin up!'))
})

app.get('profile/:id', (request, response) => {
    const {id} = request.params;
    db
        .select('*')
        .from('users')
        .where({id: id})
        .then(user => {
            if (user.length) {
                response.json(user[0])
            } else {
                response
                    .status(400)
                    .json('Not found!')
            }
        })
        .catch(error => response.status(400).json('Error getting the user!'))
})

app.listen(3002, () => {})