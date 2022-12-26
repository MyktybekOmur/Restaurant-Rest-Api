// const mongoose = require("mongoose")
const { MongoClient } = require('mongodb');
const client = new MongoClient(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
// client.connect(process.env.DB_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// })
//     .then(() => {
//         console.log("Veritabanına Başarıyla Bağlandı");
//     })
//     .catch((err) => {
//         console.log("Veritabanına bağlanırken hata çıktı : ", err);
//     })
    client.connect(process.env.DB_URL,(err)=>{
        if(err){ console.error(err); return false;}
    })
        