import { Response, Request } from "express";
import {
  getAllFavorites,
  getFavorite,
  deleteFavorite
} from "./fHelper";
import { sequelize } from "../../db";


//Traemos la tabla de nuestra DB.
const { Favorites, Property, User } = sequelize.models;

//  GET FAVORITES  //
export const getFavs = async (req: Request, res: Response) => {
  try {
    const favorites = await getAllFavorites();
    return res.status(200).json(favorites);
  } catch (error) {
    return res.status(404).send({ error: error });
  }
};

//  GET FAVORITE  //
export const getFav = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    let result = await getFavorite(id);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(404).send({ error: error });
  }
};

//  POST SIGNAL  //
export const postFav = async (req: Request, res: Response) => {
  try {
    const { propertyId, email } = req.body;

    const user = await User.findOne({where : {email : email}})

    const newFavorite = await Favorites.create({
      propertyId: propertyId, 
      userId: user.dataValues.id
    });

    res.send({ msj: "Favorite Agreado correctamente", newFavorite });
  } catch (error) {
    res.status(404).send(error);
  }
};

export const deleteFav = async (req: Request, res: Response) => {
  let { id } = req.params;
  try {
    const favorite = await deleteFavorite(Number(id));
    res.status(200).json(favorite);
  } catch (error: any) {
    return res.status(404).send({ error: error });
  }
};
