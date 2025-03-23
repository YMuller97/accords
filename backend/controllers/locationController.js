/** @file locationController.js
 *  @brief Controller for locations operations
 */

const NodeGeocoder = require('node-geocoder');
const geolib = require('geolib');

const geocoder = NodeGeocoder({
    provider: 'openstreetmap',
    formatter: null
});

/**
 * @namespace locationController
 * @description Controller object containing methods to handle location-related requests
 */
const locationController = {
    
    /**
     * @function getDistance
     * @async
     * @description Calculate the distance between two postal codes and return detailed information about the points
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     */
    getDistance: async (req, res) => {
        const { cp1, cp2 } = req.query;
        // Validate the input postal codes
        if (!cp1 || !cp2) {
            return res.status(400).json({ error: 'Les deux codes postaux sont requis' });
        }
        try {
            // Geocode the locations based on postal codes
            const location1Result = await geocoder.geocode(`${cp1} France`);
            const location2Result = await geocoder.geocode(`${cp2} France`);
            
            // Check if the locations were found
            if (!location1Result || location1Result.length === 0) {
                return res.status(404).json({ error: `Code postal non trouvé: ${cp1}` });
            }
            
            if (!location2Result || location2Result.length === 0) {
                return res.status(404).json({ error: `Code postal non trouvé: ${cp2}` });
            }
            
            // Validate that both locations have latitude and longitude coordinates
            const location1 = location1Result[0];
            const location2 = location2Result[0];
            
            if (!location1.latitude || !location1.longitude || !location2.latitude || !location2.longitude) {
                return res.status(500).json({ error: 'Coordonnées géographiques incomplètes' });
            }
            
            // Calculate the distance between the two points
            const distance = geolib.getDistance(
                { latitude: location1.latitude, longitude: location1.longitude },
                { latitude: location2.latitude, longitude: location2.longitude }
            );

            // Respond with the calculated distance and detailed point information
            res.json({ 
                distance: distance / 1000, // Convert meters to kilometers
                points: {
                    point1: { 
                        latitude: location1.latitude, 
                        longitude: location1.longitude,
                        address: location1.formattedAddress 
                    },
                    point2: { 
                        latitude: location2.latitude, 
                        longitude: location2.longitude,
                        address: location2.formattedAddress 
                    }
                }
            });

        } catch (error) {

            console.error("Erreur détaillée:", error);
            res.status(500).json({ 
                error: 'Erreur lors du calcul de la distance', 
                details: error.message 
            });
        }
    }
};

module.exports = locationController;