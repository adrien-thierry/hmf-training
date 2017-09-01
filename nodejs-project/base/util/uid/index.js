'use strict';

var alphabet = require('./alphabet');
var encode = require('./encode');
var decode = require('./decode');
var isValid = require('./is-valid');

var REDUCE_TIME = function(){ return (new Date(2016, 0, 1, 0, 0, 0) - 0);};

var version = function(){return new Date().getFullYear() - 2000;};

var clusterWorkerId = 0;
if(!cluster.isMaster)
    clusterWorkerId = cluster.worker.id % 16;

var counter;

var previousSeconds;

/*
 * Generate unique id
 * Returns string id
 */
function generate() {

    var str = '';

    var seconds = Math.floor((Date.now() - REDUCE_TIME()) * 0.001);

    if (seconds === previousSeconds) {
        counter++;
    } else {
        counter = 0;
        previousSeconds = seconds;
    }

    str = str + encode(alphabet.lookup, version());
    str = str + encode(alphabet.lookup, clusterWorkerId);
    if (counter > 0) {
        str = str + encode(alphabet.lookup, counter);
    }
    str = str + encode(alphabet.lookup, seconds);

    return str;
}


/*
 * Set the seed.
 * Highly recommended if you don't want people to try to figure out your id schema.
 * exposed as shortid.seed(int)
 * @param seed Integer value to seed the random alphabet.  ALWAYS USE THE SAME SEED or you might get overlaps.
 */
function seed(seedValue) {
    alphabet.seed(seedValue);
    return module.exports;
}

/*
 *
 * sets new characters to use in the alphabet
 * returns the shuffled alphabet
 */
function characters(newCharacters) {
    if (newCharacters !== undefined) {
        alphabet.characters(newCharacters);
    }

    return alphabet.shuffled();
}


// Export all other functions as properties of the generate function
//module.exports = generate;
module.exports.generate = generate;
module.exports.seed = seed;
module.exports.characters = characters;
module.exports.decode = decode;
module.exports.isValid = isValid;
