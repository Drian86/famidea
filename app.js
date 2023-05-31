const express = require("express")
const collection = require("./mongo")
const cors = require("cors")
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())


app.get("/", cors(), (req, res)=>{

})

app.post("/", async(req, res)=>{
    const{email, password}=req.body

    try{
        const check = await collection.findOne({email:email, password:password}) 

         if(check) {
            res.json("exist")
         }
         else {
            res.json("notexist")
         }
    }
    catch(e){
        res.json("notexist")
    }
})

app.post("/signup", async(req, res)=>{
    const{email, password}=req.body

    const data ={
        email:email,
        password:password
    }

    try{
        const check = await collection.findOne({email:email}) 

         if(check) {
            res.json("exist")
         }
         else {
            res.json("notexist")
            await collection.insertMany([data])
         }
    }
    catch(e){
        res.json("notexist")
    }
})

app.delete('/deleterecord/:email', async (req, res) => {
    const { email } = req.params;
  
    try {
      const deletedRecord = await collection.findOneAndDelete({ email: email });
  
      if (deletedRecord) {
        res.json('Record successfully deleted.');
      } else {
        res.json('Record not found.');
      }
    } catch (error) {
      console.error('Error deleting record:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  })
  
  app.put('/updatepassword/:email', async (req, res) => {
    const { email } = req.params;
    const { password } = req.body;
  
    try {
      const updatedRecord = await collection.findOneAndUpdate(
        { email: email },
        { $set: { password: password } },
        { new: true }
      );
  
      if (updatedRecord) {
        res.json('Password updated successfully.');
      } else {
        res.json('Record not found.');
      }
    } catch (error) {
      console.error('Error updating password:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  })
  

  

app.listen(8000, ()=>{
    console.log("port connected");
})

