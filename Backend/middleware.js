




module.exports.isLoggedIn = (req,res,next)=>{
    if(!req.session || req.session.user){
        return res.status(401).json({message:"unauthorize user",success:false})
    }
    next();
}

module.exports.isOwner = (req,res,next) =>{
    console.log("isowner");
    next();
}


