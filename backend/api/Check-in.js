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
       },
        _id:{$ne: req.cookies.id}
   }).sort({time: 1}).then(data => {
        var newObject = data.map((user, index) => {
            const newUser = Object.assign({}, user.toObject())
            var result = geolib.getDistance([ req.query.lat, req.query.lng ], user.location)
            newUser.distance = `${result} meters`
            return newUser
        })
        
        res.json(newObject)
    }, reason => {
        
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
                user.update({_id: req.cookies.id} ,
                    {$set:{
                    
                        name,
                        location,
                        time: new Date() 
                    }
                }, {upsert: true}).exec(function (err, result) {
                    result.upserted ? 
                        res.cookie("id", result.upserted[0]._id)
                        : null;
                    res.cookie("name", req.body.name)
                    res.status(200).send('user successfully added')
                })
               
            }

        })

    
    
})

module.exports = checkIn