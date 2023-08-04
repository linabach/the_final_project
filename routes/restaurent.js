const { add, all_restaurents, restaurent, add_review, delete_restaurent } = require("../controllers/restaurent");
const express = require('express');
const isAuth = require("../Middlewares/isAuth");

const upload = require("../Middlewares/multer");

const router = express.Router();

router.get("/test", (req,res)=> {
    res.send("api is running")
})

router.post("/add",isAuth,upload.single("image"),add)
router.get("/all-restaurents", all_restaurents)
router.get("/onerestaurent/:_id",restaurent)
router.put("/add-review/:_id",isAuth,add_review)
router.delete("/:_id",delete_restaurent)


module.exports = router 