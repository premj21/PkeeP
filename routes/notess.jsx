const express = require('express'); 
const UserNotes = require('../models/UserNotes.jsx');
const router = express.Router();
const fetchuser = require('../Userathenticate/fetchuser.jsx');
router.get('/fetchall',fetchuser ,async (req, res) => {
     try {
        const notes = await UserNotes.find({ user: req.user.id });
        res.json(notes)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
router.post('/addnt', fetchuser,async (req, res) => {
        try {
              const { title, Discription } = req.body; 
            const note = new UserNotes({
                title, Discription, user: req.user.id
            })
             await note.save();
             const notes = await UserNotes.find({ user: req.user.id });
        res.json(notes);
        } catch (error) {
            console.error(error.message);
            res.status(500);
        }
    });
router.put("/editnote",fetchuser,async(req,res)=>{
    const {title, Discription,id} = req.body; 
    try{
    const newnote= {};
        if(title) {newnote.title= title}; 
        if(Discription) {newnote.Discription = Discription}; 
        let note = await UserNotes.findById(id); 
        if(!note) {return res.status(404).send("Not found note ")}; 
        note = await UserNotes.findByIdAndUpdate(id,{$set:newnote},{new:true}); 
      const notes = await UserNotes.find({ user: req.user.id});
        res.status(200).send(notes); 
    }catch (error) {
        console.error(error.message);
       return  res.status(500).send("Internal Server Error");
    }
})
router.post("/delete",fetchuser,async(req,res)=>{
    const {id} = req.body; 
    try{
        let note = await UserNotes.findById(id); 
        if(!note) {return res.status(404).send("Not found note ")}; 
        if(note.user.toString() !== req.user.id){
            {return res.status(401).send("Not allowed")}; 
        }
        note = await UserNotes.findByIdAndDelete(id); 
        const notes = await UserNotes.find({ user: req.user.id});
        res.send(notes); 

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
module.exports = router
