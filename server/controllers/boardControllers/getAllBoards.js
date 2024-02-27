const { Jamboards, Users } = require("../../DB_connection");

const getAllBoards = async (req, res)=>{
    try {
        const {user_id} = req.params;

        const user = await Users.getUser(user_id);

        const boards = await Jamboards.getBoards(user);

        return res.status(200).json(boards)
    } catch (error) {
        return res.status(400).json({errors: error.message});        
    }
}

module.exports = getAllBoards;