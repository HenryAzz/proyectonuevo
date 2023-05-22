import { sequelize } from "../../db";
import { Op } from "sequelize";

const {Review, Broker} = sequelize.models;

export const getReviewsHelper = async() =>{
  const reviews = await Review.findAll();
  return reviews;
}

export const createReviewHelper = async (target, grade, message) =>{
  console.log(`nombre del broker ${target}`);
  let broker = await Broker.findOne({
    where:{
      name: {[Op.eq]: target}
    },
    // attributes:["id"]
  })
  console.log(broker);
  
  const newReview = await Review.create({
    target:target, 
    grade:grade, 
    message:message, 
    brokerId: broker.dataValues.id
  })
  return (newReview);

}