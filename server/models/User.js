import pkg from 'mongoose';
const {Schema, model} = pkg;

const User = new Schema({
		mail: {type: String, unique: true, required: true},
    username: {type: String, unique: true, required: true},
		registrationTime: {type: String},
		pastLoginTime: {type: String}, 
    password: {type: String, required: true},
    roles: {type: String},
})
// ref: 'timePastLogin'
// id mongo генерирует автоматически, поэтому тут не пишу.

export default model('User', User);
