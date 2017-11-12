'use strict';

const mysql = require('mysql');

let Schema = mysql.Schema;

let ProductsSchema = new Schema({
    id: Number,
    title: String,
    description: String,
    manufacturer: String,
    price: Number,
    image: String
}, { collection: 'products' });

module.exports = mongoose.model('Products', ProductsSchema);