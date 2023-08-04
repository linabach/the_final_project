const Restaurent = require("../model/Restaurent");
const cloudinary = require("../Middlewares/cloudinary");


exports.add = async(req , res) =>{
    try {
        const result = await cloudinary.uploader.upload(req.file.path);
        let restaurent = new Restaurent({
            name: req.body.name,
            reviews: req.body.reviews,
            rating: req.body.rating,
            profile_img: result.secure_url,
            cloudinary_id: result.public_id,
          });
        await restaurent.save()
        res.status(200).send({msg : " restaurent added successfully", restaurent});
    } catch (error) {
        res.status(400).send({msg : "can not add the restaurent"})
    }

}

exports.all_restaurents = async (req, res) => {
    try {
        const listrestaurents = await Restaurent.find()
        res.status(200).send({msg : "restaurents list", listrestaurents});
    } catch (error) {
        res.status(400).send({msg : "can not get list"})
    }
}

exports.restaurent = async (req, res) => {
    try {
        let restaurentToGet = await restaurentToGet.findOne({_id: req.params._id});
        res.status(200).send({msg : "restaurent found", restaurentToGet});
      } catch (err) {
        res.status(400).send({msg : "can not get this restaurent"})
      }
}

exports.add_review = async (req, res) => {
    try {
      const restaurent = await Restaurent.findByIdAndUpdate(
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
  
      if (!restaurent) {
        return res.status(404).send({ msg: "restaurent not found" });
      }
  
      res.status(200).send({ msg: "Review added", restaurent });
    } catch (error) {
      res.status(400).send({ msg: "Unable to add review" });
    }
  };
  

  exports.delete_restaurent = async(req,res)=>{
    try {  
    let restaurent = await Restaurent.findById(req.params._id);
 
    await cloudinary.uploader.destroy(restaurent.cloudinary_id);
 
    await restaurent.deleteOne()
 
    res.status(200).send({msg : "restaurentdeleted"});
     
    } catch (error) {
     res.status(400).send({msg : "can not delete restaurent"})
    }
 }