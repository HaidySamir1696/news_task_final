const express = require('express')
const reporterRouter = require('./routers/reporter')
const newsrouter = require('./routers/news')
const cors = require('cors')

// Connect to db
require('./db/mongoose')

// Intalize varible store to our express app
const app = express()

app.use(newsrouter)

app.use(express.json())

app.use(reporterRouter)


// Declare port
const port = 3000

const multer = require('multer')
const uploads= multer({dest:'images',
limits:{
  fileSize:1000000
},
fileFilter(req,file,cb){
  if(!file.originalname.match(/\.(jpg|png|jpeg)$/))
  {
    return cb(new Error('please upload an image'))
  }
  cb(undefined,true)

}
})
app.post('/upload',uploads.single('uploads'),(req,res)=>{
  res.send()
})
app.listen(port,()=>console.log('Server is running'))