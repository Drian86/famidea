const mongoose=require("mongoose")
mongoose.connect("mongodb+srv://casibuaadrian:dbsys@cluster0.cetnh0z.mongodb.net/user")
.then(()=>{
    console.log("mongodb connected");
})
.catch(()=>{
    console.log('failed');
})


const newSchema=new mongoose.Schema ({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const collection = mongoose.model("collection", newSchema)

module.exports=collection
