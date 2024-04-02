const { Jamboards } = require("../../DB_connection");

const modifyBoard = async (req, res)=>{
    const {patch} = req.body;
    const {board_id} = req.params
    try {
        if (!board_id){
            return res.status(400).json({ errors: 'Missing Data' });
        }
        const board = await Jamboards.getBoard(board_id);

        const leng = patch.language === 'xml' ? 'html' : (patch.language === 'css' ? 'css' : 'js');

        const newCode = handlePatch(board[leng], patch)
        const newBoard = {
            [leng]: newCode
        }
        
    
        await Jamboards.updateBoard(board_id, newBoard);
        
        return res.status(200).json({success:true});


    } catch (error) {
        return res.status(400).json({errors: error.message});
    }
}
const handlePatch = (value, patch)=>{
    if (patch.action === 'add') {
        return value.slice(0,patch.start) + patch.value +value.slice(patch.start)
    }else if(patch.action === 'delete'){
        return value.slice(0,patch.start)+value.slice(patch.end)
    } else {
        return value;
    }
}
module.exports = modifyBoard;