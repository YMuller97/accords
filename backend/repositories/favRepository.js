const Fav = require('../models/fav.model');

const favRepository = {
    getAllFavs: async () => {
        try {
            const favs = await Fav.findAll();
            return favs;
        } catch(error) {
            console.error("Erreur dans le repository lors de la récupération de la liste des favoris : ", error);
            throw error;
        }
    },

    getUserFavs: async (id) => {
        try {
            const userFavs = await Fav.findAll({where: {
                id_user: id
            }});
            return userFavs;
        } catch(error) {
            console.error("Erreur dans le repository lors de la récupération des favoris de l'utilisateur ",id, " : ", error);
            throw error;
        }
    },

    checkIsFav: async (userId, favId) => {
        try {
            const fav = await Fav.findOne({where: {
                id_user: userId,
                id_fav: favId
            }});
            return fav;
        } catch (error) {
            console.error("Erreur dans le repository lors de la verification d'un favori");
            throw error;
        }
    },

    addUserFav: async (userId, favId) => {
        try {
            console.log("favRepo : user : ", userId, ", fav : ", favId)
            const newFav = await Fav.create({id_user: userId, id_fav: favId});
            return newFav;
        } catch(error) {
            console.error("Erreur dans le repository lors de l'ajout d'un nouveau favori");
            throw error;
        }
    },

    deleteUserFav: async (userId, favId) => {
        try {
            console.log("repo : fav : ", favId, " user : ", userId)
            const favToDelete = await Fav.findOne({where: {
                id_user: userId,
                id_fav: favId
            }});
            if(!favToDelete)
                throw new Error("Erreur dans le repository lors de la suppression d'un favori : favori introuvable");

            await Fav.destroy({where: {
                id_user: userId,
                id_fav: favId
            }});
        } catch(error) {
            console.error("Erreur dans le repository lors de la suppression d'un favori");
            throw error;
        }
    }
}

module.exports = favRepository;