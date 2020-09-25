const mongoose = require('mongoose');

const TransactionSchema = mongoose.Schema({
    
    fullName: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    from: {
        type: String,
        required: true,
    },
    to:{
        type: String,
        required: true,
    },
    amount: {
        type: mongoose.Decimal128,
        required: true
    },
    
}, 
{collection: 'transactions'}
);

module.exports = mongoose.model('Transactions', TransactionSchema);