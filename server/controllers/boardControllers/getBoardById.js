const { Jamboards } = require("../../DB_connection");

const getBoardById = async (req, res)=>{
    try {
        const {board_id} = req.params

        const board = await Jamboards.findByPk(board_id);

        res.status(200).json(board);
    } catch (error) {
        console.error(error);
        return res.status(400).json({errors: error.message});
    }
}
module.exports = getBoardById;