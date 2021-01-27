const express = require('express')
const { aggregate } = require('../models/reporter')
const router = new express.Router()
const Reporter = require('../models/reporter')
const auth = require('../middleware/auth')


router.post('/reporters',async(req,res)=>{
    const reporter = new Reporter(req.body)
    try{
        await reporter.save()
        const token = await reporter.generateToken()
        res.status(200).send({reporter,token})
    }
    catch(e){
        res.status(400).send(e)
    }

})

router.get('/reporters',auth,(req,res)=>{
    Reporter.find({}).then((reporters)=>{
        res.status(200).send(reporters)
    }).catch((e)=>{
        res.status(500).send('Inetrnal server error')
    })
})

router.get('/reporters/:id',(req,res)=>{
    const _id = req.params.id

    Reporter.findById(_id).then((reporter)=>{
        if(!reporter){
            return res.status(400).send('Unable to find reporter')
        }
        res.status(200).send(reporter)
    }).catch((e)=>{
        res.status(500).send('Internal server error')
    })
})
////////////////////////////////////////////////haioda
router.patch('/reporters/:id', async(req,res)=>{

    const updates = Object.keys(req.body) 
    console.log(updates)
    const allowedUpdates = ['name','password']
    const isValid = updates.every((update) => allowedUpdates.includes(update))

    if(!isValid){
      return  res.status(400).send("can\'t update")
    }
    const _id = req.params.id
    try{
        
        const reporter = await Reporter.findById(_id)
        console.log(reporter)
        updates.forEach((update)=> user[update] = req.body[update])
        await reporter.save()
    if(!reporter){
        return res.send('No reporter is found')
    }
    res.status(200).send(reporter)
    } catch(e){
        res.status(400).send('Error has occurred')
    }
})

router.delete('/reporters/:id',auth,async(req,res)=>{
    const _id = req.params.id
    try{
        const reporter = await Reporter.findByIdAndDelete(_id)
        if(!reporter){
            return res.status(400).send('Not found')
        }
        res.status(200).send(user)
    }
    catch(e){
        res.send(e)
    }
})

router.post('/reporters/login',async (req,res)=>{

    try{
    const reporter = await Reporter.findByCredentials(req.body.email,req.body.password)
    const token = await reporter.generateToken()
    res.send({reporter,token})
    }
    catch(error){
        res.status(400).send('Unable to login please check password and email')
    }
    
})


module.exports = router