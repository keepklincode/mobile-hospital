// const dataStripper  = (object) => {
//     const {password, ...objJson} = JSON.parse(JSON.stringify(object))
// return objJson
// };

const dataStripper = (data) => {
    if (Array.isArray(data)) {
      return data.map((object) => {
        const { password, ...objJson } = JSON.parse(JSON.stringify(object));
        return objJson;
      });
    } else {
      const { password, ...objJson } = JSON.parse(JSON.stringify(data));
      return objJson;
    }
  };

module.exports = {
    dataStripper,
    // dataStripperArray
};