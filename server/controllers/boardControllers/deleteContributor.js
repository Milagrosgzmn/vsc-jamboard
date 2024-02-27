const { Jamboards, Users } = require("../../DB_connection");

const deleteContributor = async (req, res)=>{
    try {
        const {id} = req.params;
        const [board_id, user_id] = id.split('_');

        const board = await Jamboards.getBoard(board_id);
        const user = await Users.getUser(user_id);

        await Jamboards.deleteUserFromBoard(board, user);

        return res.status(200).json({success:true});
        
    } catch (error) {
        console.error(error.message);
        return res.status(400).json({errors: error.message});
    }
}

module.exports = deleteContributor;