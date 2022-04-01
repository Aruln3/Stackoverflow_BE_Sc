const bcryptjs = require('bcryptjs');

const hashing = async(value)=>{
    try{
        const salt = await bcryptjs.genSalt(10);
        console.log(salt);
        const hash = await bcryptjs.hash(value,salt);
        return hash
    }
    catch(error){
        return error
    }
}
const hashCompare = async(value,hash)=>{
    try{
         return await bcryptjs.compare(value,hash);
    }
    catch(error){
         return error
    }
}

module.exports = {hashing, hashCompare}