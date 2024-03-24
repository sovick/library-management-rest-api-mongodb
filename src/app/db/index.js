const mongoose = require('mongoose');
const { DB_URI } = require('../../config');

/**
 * For local MongoDB databases, we recommend using 127.0.0.1 instead of localhost. 
 * That is because Node.js 18 and up prefer IPv6 addresses, which means, on many machines, 
 * Node.js will resolve localhost to the IPv6 address ::1 and Mongoose will be unable to connect, 
 * unless the mongodb instance is running with ipv6 enabled.
 */
const connectTodb = async ()=>{
    try{
        await mongoose.connect(DB_URI);
        console.log('connected to db');
    }catch(e){
        throw e;
    }
}

module.exports = {
    connectTodb
}