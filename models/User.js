const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    password:{type:String, require:true},
    links:[{type:Types.ObjectId, ref:'Link'}],
    name:{type:String, require:true,unique:true},
    idFacebook:{type:String, require:false},
})
module.exports = model('User', schema)

