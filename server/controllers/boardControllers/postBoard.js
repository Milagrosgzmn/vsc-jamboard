const {Jamboards, Users} = require('../../DB_connection');

const postBoard = async (req, res)=>{
    const {board, user_id} = req.body;

    try {
        if(!board || !user_id){
            return res.status(400).json({ errors: 'Missing Data' });
        }
        const user = await Users.getUser(user_id);
        const createdBoard = await Jamboards.createBoard(board, user);

        return res.status(200).json(createdBoard)

    } catch (error) {
        console.error(error.message);
        return res.status(400).json({errors: error.message});
    }   
};

module.exports = postBoard;