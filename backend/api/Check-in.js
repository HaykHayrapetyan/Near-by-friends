const express = require('express')
const checkIn = express.Router();
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const geolib = require('geolib')
const user = mongoose.model('checkinData')
const Joi = require('joi')

const validation = Joi.object().keys({
    name: Joi.string().min(1).max(50).regex(/^[a-zA-Z]+$/).required(),
})


checkIn.get('/', (req, res) => {
    user.find({
     location:
       { $near :
          {
            $geometry: { type: "Point",  coordinates: [ req.query.lat, req.query.lng ] },
            $maxDistance: 1000,
          },
       }
   }).sort({time: -1}).then(data => {
        var newObject = data.map((user, index) => {
            const newUser = Object.assign({}, user.toObject())
            var result = geolib.getDistance([ req.query.lat, req.query.lng ], user.location)
            newUser.distance = `${result} meters`
            return newUser
        })
        console.log('new', newObject);
        res.json(newObject)
    }, reason => {
        console.log('error', reason)
    })
})

checkIn.post('/', (req, res) => {
    const {name, location} = req.body
    Joi.validate({
			name
		},
        validation, function (err, value) {
            if(err){
                res.status(500).send(err)
            }
            else{
                user.insertMany({
                    name,
                    location,
                    time: new Date() 
                }).then(result => {
                    console.log(result[0]._id)
                    res.cookie("id", result[0]._id);
                    res.cookie("name", result[0].name)
                    res.status(200).send('user successfully added')
                },)
               
            }

        })

    
    
})

module.exports = checkIn