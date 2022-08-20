const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    name:{type:String, require:true},
    message:{type:String, require:false},
    image:({type:String, require:true}),
})
module.exports = model('UserData', schema)