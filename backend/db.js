const mongoose = require('mongoose');
const mongoURI="mongodb://127.0.0.1:27017/"

const connectToMongo = async () => {
  try {
      await mongoose.connect(mongoURI, 
    //     {
    //       useNewUrlParser: true,
    //       useUnifiedTopology: true,
    //   }
    );
      console.log('Connected to MongoDB successfully');
  } catch (error) {
      console.error('Failed to connect to MongoDB', error);
      process.exit(1);
  }
};

// const connectToMongo=()=>{
//     mongoose.connect(mongoURI,()=>{
//         console.log("Connected to Mongo")
//     })
// }

module.exports = connectToMongo;
