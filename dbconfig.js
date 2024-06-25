const mon=require("mongoose")
mon.connect("mongodb+srv://mohkarohan:Ro17han6097@cluster0.toc6b4x.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(() => {
    console.log('database connection established');
})

.catch((err) => { 
    console.log('err',err);
})

//{ useNewUrlParser:true, useUnifiedTopology: true }

// database connection

module.exports = mon.connection;
