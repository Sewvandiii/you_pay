const mongoose = require('mongoose');

const UsersSchema = mongoose.Schema({
    
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    balance: {
        type: Number,
        required: false
    },
    
}, 
{collection: 'users'}
);

module.exports = mongoose.model('Users', UsersSchema);