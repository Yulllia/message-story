const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    from:{type:String, require:true},
    name:{type:String, require:true},
    message:({type:String, require:true}),
    date:{type:Date, require:true},
})
module.exports = model('Message', schema)