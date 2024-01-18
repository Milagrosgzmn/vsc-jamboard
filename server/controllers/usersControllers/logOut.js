const logOut = async (req, res)=>{

    try {
        res.cookie('jwt','',{maxAge:1})
        return res.status(200).json({success:true})
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

module.exports= logOut;