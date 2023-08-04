const { add, all_clubs, club, add_review, delete_club} = require("../controllers/nightLife");
const express = require('express');

const upload = require("../Middlewares/multer");

const router = express.Router();

router.get("/test", (req,res)=> {
    res.send("api is running")
})

router.post("/add",upload.single("image"),add)
router.get("/all-clubs",all_clubs)
router.get("/oneclub/:_id",club)
router.put("/add-review/:_id",add_review)
router.delete("/:_id",delete_club)


module.exports = router 