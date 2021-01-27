const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require ('bcryptjs')
const jwt = require ('jsonwebtoken')

const reporterSchema = mongoose.Schema({
    name: {
      type: String,
      required:true,
      trim:true
    },
    age: {
      type: Number,
       default:29,
      required:true,
      validate(value){
        if(value<0){
          throw new Error ('Age must be a positive number')
         
        }
      }
    },
    email:{
      type:String,
      unique:true,
      required:true,
      lowercase:true,
      validate(value){
        if(!validator.isEmail(value)){
          throw new Error('Email is invalid')
        }
      }
    },
    password:{
      type:String,
      required:true,
      trim:true,
      minLength:6,
      validate(value){
        if(value.toLowerCase().includes('password')){
          throw new Error ('Password can\'t contain word password')
        }
      }
    },
    tokens:[{
      token:{
        type:String,
        required:true
      }
    }],
    avatar:{
      type:Buffer
    }
})
reporterSchema.virtual('news',{
  ref:'News',
  localField:'_id',
  foreignField:'reporter'
})

reporterSchema.pre('save',async function(next){
   const reporter = this
   if(reporter.isModified('password')){
     reporter.password = await bcrypt.hash(reporter.password,8)
   }
   next()
})
reporterSchema.statics.findByCredentials = async(email,password) =>{

  const reporter = await Reporter.findOne({email:email})
  if(!reporter){
    throw new Error('Email is incorrect')
  }

  const isMatch = await bcrypt.compare(password,reporter.password)

  if(!isMatch){
    throw new Error('Password is incorrect')
  }

 return reporter

}

reporterSchema.methods.generateToken = async function(){
  const reporter = this
  const token = jwt.sign({_id:reporter._id.toString()},'node course')
  reporter.tokens = reporter.tokens.concat({token})
  await reporter.save()
  return token
}
 
reporterSchema.methods.toJSON = function(){
  const reporter = this

  const reporterObject = reporter.toObject()

  delete reporterObject.password
  delete reporterObject.tokens

  return reporterObject

}




const Reporter = mongoose.model("Reporter", reporterSchema);
module.exports = Reporter