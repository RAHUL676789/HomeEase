




module.exports.isLoggedIn = (req,res,next)=>{
    if(!req.session || req.session.user){
        return res.status(401).json({message:"unauthorize user",success:false})
    }
    next();
}