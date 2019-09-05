const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');

const db = require('knex')({
    client: 'pg',
    connection: {
        connectionString: process.env.DATABASE_URL,
        ssl: true,
    }
});

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('home working');
})

app.post('/signin', (req, res) => {
    console.log('/signin');
    const {email, password} = req.body;
    if (!email || !password) {
        return res
            .status(400)
            .json("Incorrect form submission");
    }
    db
        .select('email', 'hash')
        .where('email', '=', email)
        .from('login')
        .then(data => {
            const isValid = bcrypt.compareSync(password, data[0].hash);
            if (isValid) {
                return db
                    .select('*')
                    .from('users')
                    .where('email', '=', email)
                    .then(user => {
                        res.json(user[0])
                    })
                    .catch(error => res.status(400).json('Cant get the user'))
            } else {
                res
                    .status(400)
                    .json('Wrong credentials')
            }
        })
        .catch(error => res.status(400).json('Wrong credentials'))

})

app.post('/signup', (req, res) => {
    const {email, name, password} = req.body;
    if (!email || !name || !password) {
        return res
            .status(400)
            .json("Incorrect form submission");
    }
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
                        res.json(user[0])
                    })
                    .then(trx.commit)
                    .catch(trx.rollback)
            })
    }).catch(error => res.status(400).json('Error signing up!'))

})

app.get('/profile/:id', (req, res) => {
    const {id} = req.params;
    db
        .select('*')
        .from('users')
        .where({id: id})
        .then(user => {
            if (user.length) {
                res.json(user[0])
            } else {
                res
                    .status(400)
                    .json('Not found!')
            }
        })
        .then(user => {
            console.log(user);
        })
        .catch(error => res.status(400).json('Error getting the user!'))
})

app.listen(process.env.PORT || 3000, () => {
    console.log('server is running');
})