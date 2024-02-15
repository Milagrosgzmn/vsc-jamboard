const { Users, Jamboards } = require("../../DB_connection");

const addContributor = async (req, res)=>{
    const {board_id} = req.body;
    const {user_id} = req.params

    try {
        if (!user_id || !board_id) {
            return res.status(400).json({ errors: 'Missing Data' });
        }
        const user = await Users.getUser(user_id);

        await Jamboards.addUserToBoard(board_id, user)

        return res.status(200).json({success: true})
        
    } catch (error) {
        return res.status(400).json({errors: error.message});
    }
}

module.exports = addContributor;