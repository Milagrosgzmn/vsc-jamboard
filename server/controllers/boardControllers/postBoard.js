const {Jamboards} = require('../../DB_connection');

const postBoard = async (req, res)=>{
    const {board} = req.body;

    try {
        if(!board){
            return res.status(400).json({ errors: 'Missing Data' });
        }

        const createdBoard = await Jamboards.createBoard(board);

        return res.status(200).json(createdBoard)

    } catch (error) {
        console.error(error.message);
        return res.status(400).json({errors: error.message});
    }   
};

module.exports = postBoard;