const router = require("express").Router()


const auth = require("./auth.routes")
const meals = require("./meal.routers")
const orders = require("./orders.routes")
const costs = require("./cost.routers")
const cooked = require("./cooked.routers")

router.use(auth)
router.use(meals)
router.use(orders)
router.use(costs)
router.use(cooked)




// router.post("/upload", function (req, res) {
 
  
//     upload(req, res, function (err) {
//         console.log(req.file);
//         console.log(req.body);
//         if (err instanceof multer.MulterError) 
//             throw new APIError("Resim Yüklenirken Multer Kaynaklı Hata Çıktı : ", err)
//         else if (err) 
//             throw new APIError("Resim Yüklenirken Hata Çıktı : ", err)
//         else return new Response(req.savedImages, "Yükleme Başarılı").success(res)
//     })
// })


module.exports = router