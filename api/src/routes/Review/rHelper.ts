import { sequelize } from "../../db";
import { Op } from "sequelize";

const {Review, Broker} = sequelize.models;

export const getReviewsHelper = async() =>{
  const reviews = await Review.findAll();
  return reviews;
}

export const createReviewHelper = async (target, grade, message) =>{
  // obtengo el id del broker por medio de su nombre
  let broker = await Broker.findOne({
    where:{
      name: {[Op.eq]: target}
    },
    attributes:["id"]
  })
  const newReview = await Review.create({
    target:target, 
    grade:grade, 
    message:message, 
    brokerId: broker.dataValues.id
  })
  return (newReview);
}

export const deleteReviewHelper = async (id) => {
  const review = await Review.destroy({
    where:{
      id: {[Op.eq]: id}
    }
  });
  const resp = review === 1? `Review ${id} borrado con Éxito` : `Review ${id} no encontrado`;
  return resp;
}