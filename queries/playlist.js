const db = require("../db/dbConfig")



const getAllPlay = async () => {
  try{
  const allPlay = await db.any('SELECT * FROM playlist')
  return allPlay
  }
  catch(error){
      return error;
  }
  }
  



const getPlay = async (id) => {
try{
    const onePlay = await db.one('SELECT * FROM playlist WHERE id=$1', id)
    return onePlay
}
catch(error){
    return error
}
}


const createPlay = async (play) => {
    try {
      const newPlay = await db.one(
        "INSERT INTO playlist (name, description, is_favorite) VALUES($1, $2, $3) RETURNING *",
        [play.name, play.description, play.is_favorite]
      );
      return newPlay;
    } catch (error) {
      return error;
    }
  };



  const deletePlay = async (id) => {
    try{
        const deletedPlay = await db.one(
            'DELETE FROM playlist WHERE id = $1 RETURNING *', id
        )
        return deletedPlay
    }
    catch(error){
        return error
    }
}


const updatePlay = async (id, play) => {
  try {
    const updatedPlay = await db.one(
      "UPDATE playlist SET name=$1, description=$2,is_favorite=$3 where id=$4 RETURNING *",
      [play.name, play.description, play.is_favorite, id]
    );
    return updatedPlay;
  } catch (error) {
    return error;
  }
};




module.exports = { getAllPlay , getPlay , createPlay , deletePlay, updatePlay  };