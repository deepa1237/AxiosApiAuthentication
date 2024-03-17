const { default: axios } = require('axios');
const express =  require('express');
const app = new express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com";
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
let key;
const username = "userdeevispu";
const password = "userdeevispu";
const apiKey = "6654cad1-1819-4b60-9085-28e6c4a39664";
const bearertoken = "57330dca-e849-4471-888d-22485ba61da9";

app.get("/", (req, res)=> {
    return res.render("index.ejs", {content: 'Api respponse'});
})

app.get('/noauth', async (req, res) => {
    const response =  await axios.get(API_URL + "/random")
    .then((response) => {
        res.render("index.ejs", {content: JSON.stringify(response.data)})
    }).catch((error) => {
       res.status(400).send({'Error': error.message})
    })
})

app.get('/basicauth', async (req, res) => {
    const response =  await axios.get(API_URL + "/all?page=1", {
        auth: {
            username : username,
            password: password
        }
    })
    .then((response) => {
        res.render("index.ejs", {content: JSON.stringify(response.data)})
    }).catch((error) => {
       res.status(400).send({'Error': error.message})
    })
})

app.get('/apikey', async (req, res) => {
    const response =  await axios.get(API_URL + "/filter", {
        params: {
            score :'5',
            apiKey: apiKey
        }
    })
    .then((response) => {
        res.render("index.ejs", {content: JSON.stringify(response.data)})
    }).catch((error) => {
       res.status(400).send({'Error': error.message})
    })
})

app.get('/bearertoken', async (req, res) => {
    const response =  await axios.get(API_URL + "/secrets/1", {
        headers: {
            Authorization :`Bearer ${bearertoken}`
        }
    })
    .then((response) => {
        key = response.data;
        res.render("index.ejs", {content: JSON.stringify(response.data)})
    }).catch((error) => {
       res.status(400).send({'Error': error.message})
    })
})

app.listen(port);