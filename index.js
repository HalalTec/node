const express = require('express')
const app = express()
const axios = require('axios')
require('dotenv').config()

const API_KEY = process.env.API_KEY;

app.get('/', (req, res) => {
    const url = 'https://api.ipify.org/?format=json'

    axios.get(url).then(response => {
         const data = response.data
         res.send(`<html><body style='text-align:center'><div>Your Ip Address is <br> ${data.ip} </div> <input type='hidden' name='ip' value=${data.ip}>
            <a href=/location/ip=${data.ip} style="margin-top:20px">Get Full Location </a> </body></html>`)

    })
    .catch(error => {
        console.log(error)
    })

})

app.get('/location/ip=:ip', (req, res) => {
         const ip = req.params['ip'];
        const uri= `https://ipinfo.io/${ip}/geo`
    axios.get(uri).then(response => {
        data = response.data
       res.send(`<html><body><div>Your Ip Address is: ${data.ip} <br> Region: ${data.region} <br>Organization: ${data.org} <br> Cordinate:${data.timezone} </div></body></html>`)
       console.log(data)
   })
   .catch(error => {
       console.log(error)
   })

})

app.listen(3030, () => {
    console.log('port connected')
})