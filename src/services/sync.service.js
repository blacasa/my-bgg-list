
import axios from 'axios'
import xmlToJson from './xmlToJson.service.js'

export default {
    sync(bggAccount) {
        return axios
            .get('https://bgg-json.azurewebsites.net/collection/'+bggAccount)
            .then(response => (response.data));
    },
    syncBGG(bggAccount) {
        let thisService = this;
        return axios
            .get('https://api.geekdo.com/xmlapi2/collection?username='+bggAccount+'&stats=1')
            .then(async function(xmlResponse) {
                let collection = xmlToJson.convertCollectionToJson(xmlResponse.data);
                let fullCollection = [];
                let gameIds = '';
                collection.forEach(function(game) {
                    gameIds += game.gameId + ',';
                    //var thingJson = thisService.getBggThing(game.gameId);
                    
                    fullCollection.push(game); // A supprimer
                });
                var thingsXml = await thisService.getBggThing(gameIds);
                var thingsJson = xmlToJson.convertThingsToJson(thingsXml);
                // merge thingsJson et collection dans fullCollection

                return fullCollection;
            });
    },
    getBggThing(thingId) {
        return axios
            .get('https://api.geekdo.com/xmlapi2/thing?id='+thingId+'&stats=1')
            .then(function(xmlResponse) {
                return xmlResponse.data;
            });
    }
}