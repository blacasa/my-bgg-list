
import axios from 'axios'
import { Observable } from 'rxjs';

import xmlToJson from './xmlToJson.service.js'
import arrayService from './array.service.js'

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
                });
                var thingsXml = await thisService.getBggThing(gameIds);
                var thingsJson = xmlToJson.convertThingsToJson(thingsXml);
                // merge thingsJson et collection dans fullCollection
                fullCollection = arrayService.arrayGameMerge(collection, thingsJson);

                return fullCollection;
            });
    },
    getBggThing(thingId) {
        return axios
            .get('https://api.geekdo.com/xmlapi2/thing?id='+thingId+'&stats=1')
            .then(function(xmlResponse) {
                return xmlResponse.data;
            });
    },
    syncBGGObservable(bggAccount) {
        return Observable.create( ( observer ) => {
            axios
            .get('https://api.geekdo.com/xmlapi2/collection?username='+bggAccount+'&stats=1')
            .then( ( response ) => {
                observer.next( response.data );
                observer.complete();
            } )
            .catch( ( error ) => {
                observer.error( error );
            } );
        } );
    },
    getBggThingObservable(thingId) {
        return Observable.create( ( observer ) => {
            axios
            .get('https://api.geekdo.com/xmlapi2/thing?id='+thingId+'&stats=1')
            .then( ( response ) => {
                observer.next( response.data );
                observer.complete();
            } )
            .catch( ( error ) => {
                observer.error( error );
            } );
        } );

    }
}