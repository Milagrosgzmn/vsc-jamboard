const { Jamboards } = require("../../DB_connection");

const getBoardByCode = async (req, res)=>{
    try {
        const {enter_code} = req.params
        if(!enter_code) res.status(401).json('Missing Information, check data');

        const board = await Jamboards.getBoardByCode(enter_code);

        res.status(200).json(board);
    } catch (error) {
        console.error(error);
        res.status(400).json({error:'Board not found'});
    }
}
module.exports = getBoardByCode;