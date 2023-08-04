const Fastfood = require("../model/Fastfood");
const cloudinary = require("../Middlewares/cloudinary");


exports.add = async(req , res) =>{
    try {
        const result = await cloudinary.uploader.upload(req.file.path);
        let fastfood = new Fastfood({
            name: req.body.name,
            reviews: req.body.reviews,
            rating: req.body.rating,
            profile_img: result.secure_url,
            cloudinary_id: result.public_id,
          });
        await fastfood.save()
        res.status(200).send({msg : " fastfood added successfully", fastfood});
    } catch (error) {
        res.status(400).send({msg : "can not add fastfood adress"})
    }

}

exports.all_fastfoods = async (req, res) => {
    try {
        const listfastfoods = await Fastfood.find()
        res.status(200).send({msg : "fastfoods list", listfastfoods});
    } catch (error) {
        res.status(403).send({msg : "can not get list"})
    }
}

exports.fastfood = async (req, res) => {
    try {
        let fastfoodToGet = await Fastfood.findOne({_id: req.params._id});
        res.status(200).send({msg : "fastfood found", fastfoodToGet});
      } catch (err) {
        res.status(400).send({msg : "can not get this fastfood"})
      }
}

exports.add_review = async (req, res) => {
    try {
      const fastfood = await Fastfood.findByIdAndUpdate(
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
  
      if (!fastfood) {
        return res.status(404).send({ msg: "Fastfood not found" });
      }
  
      res.status(200).send({ msg: "Review added", fastfood });
    } catch (error) {
      res.status(400).send({ msg: "Unable to add review" });
    }
  };
  
  exports.delete_fastfood = async(req,res)=>{
    try {  
    let fastfood = await Fastfood.findById(req.params._id);
 
    await cloudinary.uploader.destroy(fastfood.cloudinary_id);
 
    await fastfood.deleteOne()
 
    res.status(200).send({msg : "fastfood deleted"});
     
    } catch (error) {
     res.status(400).send({msg : "can not delete fastfood"})
    }
 }