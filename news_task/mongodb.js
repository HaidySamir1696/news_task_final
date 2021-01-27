const mongodb = require("mongodb");

// Inalize Connection

const MongoClient = mongodb.MongoClient;

const connectionUrl = "mongodb://127.0.0.1:27017";

const dbName = "news-manager";

MongoClient.connect(
  connectionUrl,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (error, client) => {
    if (error) {
      return console.log("Error has occurred");
    }
    console.log("Success");

    // Get refrence to our database
    const db = client.db(dbName);

    // Add documents
    // Insert One document
    // db.collection('users').insertOne({
    //     name:'Omar',
    //     age:27
    // })

    // Insert multiple documents

    // db.collection('users').insertMany([
    //     {name:'Ali',age:27},
    //     {name:'Moahmed',age:27},
    //     {name:'Malek',age:27},
    //     {name:'Salma',age:27},
    //     {name:'Maged',age:27},
    // ])

    //////////////////////////////////////////////////////////////////////////////

    // Insert our own generated id
    const ObjectID = mongodb.ObjectID;

    // const _id = new ObjectID()
    // console.log(_id)
    // db.collection('users').insertOne({
    //     _id:_id,
    //     name:'Osama',
    //     age:28
    // })
    ////////////////////////////////////////////////////////////////////////////

    // Get data
    // Find one --> get first occurrence
    // db.collection('users').findOne({age:27},(error,user)=>{
    //   if(error){
    //     return console.log('error has occurred')
    //   }
    //   console.log(user)
    // })

    // Find one by id

    // db.collection('users').findOne({_id: new ObjectID('5ffd4d9dab3e8e2474b817b')},(error,user)=>{
    //   if(error){
    //     return console.log('error has occurred')
    //   }
    //   console.log(user)
    // })

    // Find  -- > data (Array of object)

    // db.collection('users').find({age:27}).toArray((error,users)=>{
    //         if(error){
    //     return console.log('error has occurred')
    //   }
    //   console.log(users)
    // })

    // Count

    //     db.collection('users').find({age:27}).count((error,users)=>{
    //       if(error){
    //   return console.log('error has occurred')
    // }
    // console.log(users)

    // })

    // limit
    //   db.collection("users")
    //     .find({ age: 27 })
    //     .limit(3)
    //     .toArray((error, users) => {
    //       if (error) {
    //         return console.log("error");
    //       }
    //       console.log(users);
    //     });

    /////////////////////////////////////////////////////////////////////////

    //Update One
    // db.collection("users")
    //   .updateOne(
    //     { _id: new ObjectID("5ffd5860cd00e006305ed97b") },
    //     {
    //       $set: { name: "Amr" },
    //       $inc: { age: 3 },
    //     }
    //   )
    //   .then((result) => {
    //     console.log(result.modifiedCount);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    ///////////////////////////////////////////////////////////////////////////////////////

    // Update many
    // db.collection("users")
    //   .updateMany({}, { $inc: { age: 5 } })
    //   .then((result) => console.log(result.modifiedCount))
    //   .catch((error) => {
    //     console.log(error);
    //   });

    ////////////////////////////////////////////////////////////////////////////////////

    //Delete --> Delete One

    // db.collection('users').deleteOne({age:32}).then((result)=>{
    //   console.log(result.deletedCount)
    // }).catch((error)=>{
    //   console.log(error)
    // })

    // Delete Many
    db.collection("reporters")
      .deleteMany({})
      .then((result) => console.log(result.deletedCount))
      .catch((error) => console.log(error));
  }
);
