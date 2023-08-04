const { add, all_fastfoods, fastfood, add_review, delete_fastfood } = require("../controllers/fastfood");
const express = require('express');

const upload = require("../Middlewares/multer");

const router = express.Router();

router.get("/test", (req,res)=> {
    res.send("api is running")
})

router.post("/add",upload.single("image"),add)
router.get("/all-fastfoods",all_fastfoods)
router.get("/onefastfood/:_id",fastfood)
router.put("/add-review/:_id",add_review)
router.delete("/:_id",delete_fastfood)


module.exports = router 