const {DataTypes, where} = require('sequelize');

module.exports = (sequelize)=>{
    const Jamboards = sequelize.define('Jamboards',{
        id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey:true,
        },
        name:{
            type:DataTypes.STRING,
            allowNull: false,
        },
        description:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        html:{
            type:DataTypes.STRING,
            defaultValue:'',
            allowNull: true,
        },
        css:{
            type:DataTypes.STRING,
            defaultValue:'',
            allowNull: true,
        },
        js:{
            type:DataTypes.STRING,
            defaultValue:'',
            allowNull: true,
        }
    })

    Jamboards.createBoard = async function (board, user) {
        try {
            const createdBoard = await this.create(board)

            await createdBoard.addUsers(user); 
            
            return createdBoard;
        } catch (error) {
            console.error("Error while creating board:", error.message);
              throw error;
        }
    }
    Jamboards.updateBoard = async function(board_id, newBoard){
        try {
            const board = await this.update(newBoard,{
            where:{
                id:board_id,
            }})
           
            if (!board[0]){
                throw new Error('No results were obtained.')
            }
            
            return true;

        } catch (error) {
            console.error("Error while updating board:", error.message);
            throw error;  
        }
    }
    Jamboards.addUserToBoard = async function(board_id, user){
        try {
            const board = await this.findByPk(board_id);
            if(!board){
                throw new Error('Error while getting board, check data');
            }

            await board.addUsers(user);
            return true;
        } catch (error) {
            console.error("Error while updating board:", error.message);
            throw error;  
        }
    }
    Jamboards.getBoards = async function(user){
        try {
            const myBoards = await user.getJamboards();

            return myBoards;
            
        } catch (error) {
            console.error("Error while getting board:", error.message);
            throw error;  
        }
    }

    return Jamboards;
}