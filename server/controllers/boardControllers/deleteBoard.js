const {Jamboards, Users} = require("../../DB_connection");

const deleteBoard = async (req, res)=>{
    try {
        const {id} = req.params;
        const [board_id, user_id] = id.split('_');

        const user = await Users.getUser(user_id);

        await Jamboards.deleteBoard(board_id, user)

        return res.status(200).json({success: true});
    } catch (error) {
        return res.status(400).json({errors: error.message});   
    }
}

module.exports = deleteBoard;