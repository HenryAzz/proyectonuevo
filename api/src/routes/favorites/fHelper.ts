import { sequelize } from "../../db";
import { Op } from "sequelize";

const { Favorites, Property, User } = sequelize.models;

// HELPER GET SIGNALS //
export const getAllFavorites = async function () {
  return await Favorites.findAll({
    include: [Property, User],
  });
};

// HELPER GET FAVORITE //
export const getFavorite = async function (id) {
  const favorite = await Favorites.findOne({
    include: [Property, User],
    where: { id: id },
  });

  return favorite ? favorite : `Propiedad con id ${id} no encontrado`;
};

// HELPER DELETE FAVORITE
export const deleteFavorite = async (id: number) => {
  const favorite = await Favorites.destroy({
    where: {
      id: { [Op.eq]: id },
    },
  });
  const res =
    favorite === 1
      ? `Favorito con id ${id} borrado con Éxito`
      : `Favorito con id ${id} no encontrado`;
  return res;
};