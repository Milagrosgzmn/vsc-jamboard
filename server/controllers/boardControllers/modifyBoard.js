const { Jamboards } = require("../../DB_connection");

const modifyBoard = async (req, res)=>{
    const {newBoard} = req.body;
    const {board_id} = req.params
    try {
        if (!board_id || !newBoard){
            return res.status(400).json({ errors: 'Missing Data' });
        }
        await Jamboards.updateBoard(board_id, newBoard);
        
        return res.status(200).json({success: true})


    } catch (error) {
        return res.status(400).json({errors: error.message});
    }
}
module.exports = modifyBoard;