const express = require('express');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
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
    if(true){

    }
    else{
        response.status(400).json(`Error Logging in`);
    }
})

app.post('/signup', (request, response) => {
    const {email, name, password} = request.body;
    response.json('');
})

app.listen(3002, () => {})