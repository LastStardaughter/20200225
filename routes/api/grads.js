const express = require('express');
const router = express.Router();
const Grad = require('../../models/Grad');

router.get('/', async (req, res) => {
    try{
        const users = await Grad.find().sort('name');
        console.log("Graduate info request received.")
        console.log(users);
        res.send(users);
    } catch(err) {
        res.status(300).json({msg: err.message});
    }
})

router.get('/test', async (req, res) => {
    const users = await Grad.find().sort('name');
    // res.send(users);
    // console.log(users);
    // console.log(users.length);
    for (let i=0;i<users.length;i++){
      res.write("<b>"+users[i].name+"</b> - <i> Class of "+users[i].yearOfGraduation.getMonth()+" "+users[i].yearOfGraduation.getYear()+"</i><br />");
      res.write(users[i].role+" at "+users[i].company+"<br /><br />");
    }
    res.end();
  });

router.post('/', async(req, res)=>{
    console.log("POST request received:");
    // console.log(req.body);
    const grad=new Grad({
        name: req.body.name,
        role: req.body.role,
        company:req.body.company,
        yearOfGraduation:req.body.yearOfGraduation
    })
    try{
        console.log(grad);
        const newGrad = await grad.save();
        res.status(201).json(newGrad);
    } catch (err){
        res.status(400).json({message:err.message});
    }

})

router.put('/:id', async(req, res)=>{
    console.log("PUT request received for ID: "+req.params.id);
    // console.log(req.body);
    Grad.findByIdAndUpdate(req.params.id)
    .then(grad = {
        name: req.body.name,
        role: req.body.role,
        company:req.body.company,
        yearOfGraduation:req.body.yearOfGraduation
    })
    try{
        console.log(grad);
        res.status(201).json(grad);
    } catch (err){
        res.status(400).json({message:err.message});
    }

})

router.delete('/:id', async(req, res)=>{
    console.log(req.params.id);
    Grad.findById(req.params.id)
    .then(grad => grad.remove().then(res.json({success:"true"})))
    .catch(err=>res.status(404).json("Not found."));

})

module.exports = router;