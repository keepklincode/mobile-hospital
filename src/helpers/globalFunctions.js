const dataStripper  = (object) => {
    const {password, ...objJson} = JSON.parse(JSON.stringify(object))
return objJson
};


module.exports = {
    dataStripper,
    // dataStripperArray
};