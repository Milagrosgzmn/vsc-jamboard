const {DataTypes} = require('sequelize');

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
        contributors:{
            type:DataTypes.ARRAY(DataTypes.STRING),
            allowNull: true,
            defaultValue:[]
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
        },
        deleted:{
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        }
    })

    Jamboards.createBoard = async function (board, user) {
        try {
            const createdBoard = await this.create(board)

            await createdBoard.addUsers(user, { through: { role: 'owner' } }); 
            
            return createdBoard;
        } catch (error) {
            console.error("Error while creating board:", error.message);
              throw error;
        }
    }
    Jamboards.getBoard = async function(board_id){
        
        try {
            const board = await this.findByPk(board_id,{
                where:{
                    deleted:false,
                }
            });
            
            if(!board) throw new Error('Error while getting board, check data');
            return board;
  
          } catch (error) {
            console.error("Error getting board:", error.message);
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
            const board = await this.findByPk(board_id,{
                where:{
                    deleted:false,
                }
            });
            if(!board){
                throw new Error('Error while getting board, check data');
            }

            await board.addUsers(user, { through: { role: 'contributor' } });
            
            await this.update({contributors:[...board.contributors, user.id]},{
                where:{
                    id:board_id,
                }})
            return true;
        } catch (error) {
            console.error("Error while updating board:", error.message);
            throw error;  
        }
    }
    Jamboards.getBoards = async function(user){
        try {
            const myBoards = await user.getJamboards({
                where: {
                    deleted: false
                }
            });

            return myBoards;
            
        } catch (error) {
            console.error("Error while getting board:", error.message);
            throw error;  
        }
    }    
    Jamboards.deleteBoard = async function(board_id, user){
        try {
            const boards = await user.getJamboards({
                where:{
                    id: board_id,
                    deleted:false,
                }
            })
            if(!boards[0]){
                throw new Error('Error while getting board, check data');
            }
            if(boards[0].UserBoard.role === 'owner'){
                await this.update({deleted:true},{
                    where:{
                        id:board_id,
                    }});
                return;
            }
            await this.deleteUserFromBoard(boards[0],user);
            return
            
        } catch (error) {
            console.error("Error while deleting:", error.message);
            throw error;    
        }
    }
    Jamboards.deleteUserFromBoard = async function(board, user){
        try {
            const contributors = board.contributors.filter( contributorId => contributorId!== user.id);

            const deleted = await board.removeUsers(user);
            if(!deleted){
                throw new Error('Error while deleting, check data');
            }
            await this.update({contributors},{
                where:{
                    id:board.id
                }
            })
            return;

        } catch (error) {
            console.error("Error while deleting:", error.message);
            throw error; 
        }
    }

    return Jamboards;
}