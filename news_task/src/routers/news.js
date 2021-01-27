const express = require('express')
const News = require('../models/news')
const auth = require('../middleware/auth')
const router = new express.Router()


router.post('/news',auth,async(req,res)=>{
    const news = new News({
        ...req.body,
        reporter: req.reporter._id
    })
    try{
        await news.save()
        res.status(200).send(news)
    }catch(e){
        res.status(400).send(e)
    }
})
////
router.get('/news',auth,async(req,res)=>{
    try{
        const sort={}
         if(req.query.sortBy){
             const part = req.query.sortBy.split(':')
             sort[part[0]] = part[1]==='desc'?-1:1
         }
        const match={}
         if(req.query.completed){
         match.completed = req.query.completed==='true'
         }
        await req.reporter.populate({
            path:'news',
            match,
            options:{
                limit:parseInt(req.query.limit),
                skip:parseInt(req.query.skip),
                sort
            }
         }).execPopulate()
         res.send(req.reporter.news)
     }catch(e){
         res.status(500).send(e)
     }

})


router.get('/news/:id',async(req,res)=>{
    const _id = req.params.id
   console.log(_id)
    News.findById(_id).then((news)=>{
        if(!news)
        {
            return res.status(400).send('user not found')
        }
        res.status(200).send(news)
    }).catch((error)=>{
            res.status(500).send()
        })
    })
    //////
    router.patch('/news/:id', auth,async(req,res)=>{
 
        const updates = Object.keys(req.body)
        try{
    const news = await News.findOne({...req.params.id,reporter:req.reporter._id})
            if(!news){
                return res.status(404).send(e)
            }
            updates.forEach((update)=>news[update]=req.body[update])
            await news.save()
            res.send(news)
        }
        catch(e){
            res.status(400).send(e)
        }
    })

    router.delete('/news/:id',auth,async(req,res)=>{
        const _id = req.params.id
        try{
            const news = await News.findByIdAndDelete(_id)
            if(!news){
                return res.status(400).send('Not found')
            }
            res.status(200).send(news)
        }
        catch(e){
            res.send(e)
        }
        /////////////
        try{
            const news = await News.findOneAndDelete({...req.params._id,owner:req.reporter._id})
            if(!news){
              return  res.status(404).send()
            }
            res.send(news)
    
        }catch(e){
            res.status(500).send
        }

    })
    
module.exports = router