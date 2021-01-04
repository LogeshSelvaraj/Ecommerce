const User = require("../models/user");

exports.createOrUpdateUser =async (req, res) => {
let { email, name } = req.user;
      if(!name){
          name=email.split("@")[0]
      }
    const user =await User.findOneAndUpdate({email},{name},{new:true});
    if(user){
        res.json(user)
    }else{
        const newUser=new User({
            email,name
        })
        newUser.save();
        res.json(newUser)
    }
};

exports.getUser=async (req,res)=>{
    let { email } = req.user;

    User.findOne({email},(err,founduser)=>{
        if(founduser){
            res.json(founduser)
        }
    })

}


