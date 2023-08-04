const NightLife = require("../model/NightLife");
const cloudinary = require("../Middlewares/cloudinary");


exports.add = async(req , res) =>{
    try {
        const result = await cloudinary.uploader.upload(req.file.path);
        let club = new NightLife({
            name: req.body.name,
            reviews: req.body.reviews,
            rating: req.body.rating,
            profile_img: result.secure_url,
            cloudinary_id: result.public_id,
          });
        await club.save()
        res.status(200).send({msg : " club added successfully", club});
    } catch (error) {
        res.status(400).send({msg : "can not add the club"})
    }

}

exports.all_clubs = async (req, res) => {
    try {
        const listclubs = await NightLife.find()
        res.status(200).send({msg : "clubs list", listclubs});
    } catch (error) {
        res.status(400).send({msg : "can not get list"})
    }
}

exports.club = async (req, res) => {
    try {
        let clubToGet = await clubToGet.findOne({_id: req.params._id});
        res.status(200).send({msg : "club found", clubToGet});
      } catch (err) {
        res.status(400).send({msg : "can not get this club"})
      }
}

exports.add_review = async (req, res) => {
    try {
      const club= await NightLife.findByIdAndUpdate(
        req.params._id,
        {
          $push: {
            reviews: {
              user: req.body.user,
              title: req.body.title,
              comment: req.body.comment,
            }
          }
        },
        { new: true }
      );
  
      if (!club) {
        return res.status(404).send({ msg: "club not found" });
      }
  
      res.status(200).send({ msg: "Review added", club});
    } catch (error) {
      res.status(400).send({ msg: "Unable to add review" });
    }
  };


  exports.delete_club = async(req,res)=>{
    try {  
    let club = await NightLife.findById(req.params._id);
 
    await cloudinary.uploader.destroy(club.cloudinary_id);
 
    await club.deleteOne()
 
    res.status(200).send({msg : "club deleted"});
     
    } catch (error) {
     res.status(400).send({msg : "can not delete club"})
    }
 }