/**
 *                          Block class
 *  The Block class is a main component into any Blockchain platform, 
 *  it will store the data and act as a dataset for your application.
 *  The class will expose a method to validate the data... The body of
 *  the block will contain an Object that contain the data to be stored,
 *  the data should be stored encoded.
 *  All the exposed methods should return a Promise to allow all the methods 
 *  run asynchronous.
 */

const SHA256 = require('crypto-js/sha256');
const hex2ascii = require('hex2ascii');

class Block {

    // Constructor - argument data will be the object containing the transaction data
	constructor(data){
		this.hash = null;                                           // Hash of the block
		this.height = 0;                                            // Block Height (consecutive number of each block)
		this.body = Buffer(JSON.stringify(data)).toString('hex');   // Will contain the transactions stored in the block, by default it will encode the data
		this.time = 0;                                              // Timestamp for the Block creation
		this.previousBlockHash = null;                              // Reference to the previous Block Hash
    }

    validate() {
        let self = this;
        return new Promise((resolve, reject) => {
            // Save in auxiliary variable the current block hash
            let auxiliaryHash = self.hash;        
            // Recalculate the hash of the Block
            const recalculatedHash = SHA256(JSON.stringify(self)).toString();
            // Comparing if the hashes changed
            // Returning the Block is not valid
            if (auxiliaryHash != recalculatedHash) {
                console.log('The given hash is different');
                resolve(false);
            }
            // Returning the Block is valid
            resolve(true);
        });
    }
    
    getBData() {
        // Getting the encoded data saved in the Block
        let self = this;
        // Decoding the data to retrieve the JSON representation of the object
        const decodedData = hex2ascii(self.body);
        // Parse the data to an object to be retrieve.
        const block = JSON.parse(decodedData);
        // Resolve with the data if the object isn't the Genesis block
        return new Promise((res, rej) => {
            if (block.data == 'Genesis Block') {
                console.log('Requested Genesis Block');
                reject('Genesis Block');
            }

            console.log(`getBData: ${block.data}`);
            resolve(block);
        });
    }

}

module.exports.Block = Block;