import axios from "axios";
import { Observable } from "rxjs";
import { map, concatMap } from "rxjs/operators";

import arrayService from "./array.service.js";
import xmlToJson from "./xmlToJson.service.js";

export default {
  sync(bggAccount) {
    return axios
      .get("https://bgg-json.azurewebsites.net/collection/" + bggAccount)
      .then(response => response.data);
  },
  syncBGG(bggAccount) {
    let thisService = this;
    return axios
      .get(
        "https://api.geekdo.com/xmlapi2/collection?username=" +
          bggAccount +
          "&stats=1"
      )
      .then(async function(xmlResponse) {
        let collection = xmlToJson.convertCollectionToJson(xmlResponse.data);
        let fullCollection = [];
        let gameIds = "";
        collection.forEach(function(game) {
          gameIds += game.gameId + ",";
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
      .get("https://api.geekdo.com/xmlapi2/thing?id=" + thingId + "&stats=1")
      .then(function(xmlResponse) {
        return xmlResponse.data;
      });
  },
  syncBGGObservable(bggAccount) {
    return Observable.create(observer => {
      axios
        .get(
          "https://api.geekdo.com/xmlapi2/collection?username=" +
            bggAccount +
            "&stats=1"
        )
        .then(response => {
          observer.next(response.data);
          observer.complete();
        })
        .catch(error => {
          observer.error(error);
        });
    });
  },
  getBggThingObservable(thingId) {
    return Observable.create(observer => {
      axios
        .get("https://api.geekdo.com/xmlapi2/thing?id=" + thingId + "&stats=1")
        .then(response => {
          observer.next(response.data);
          observer.complete();
        })
        .catch(error => {
          observer.error(error);
        });
    });
  },
  bggSync(bggAccount) {
    let syncService = this;
    return this.syncBGGObservable(bggAccount).pipe(
      concatMap(function(collectionXmlResponseData) {
        /*
         * On reçoit le retour de syncBGGObservable qui
         * est "collectionXmlResponseData" (le xml de la collection de jeux).
         * concatMap prend en paramètre une fonction (celle-ci) qui retourne
         * un Observable (ici, getBggThingObservable).
         * concatMap est utilisé car getBggThingObservable est asynchrone. Si
         * cela n'avait pas été le cas, il aurait fallu utiliser map à la
         * place de concatMap.
         */
        let collection = xmlToJson.convertCollectionToJson(
          collectionXmlResponseData
        );
        let gameIds = "";
        collection.forEach(function(game) {
          gameIds += game.gameId + ",";
        });
        /*
         * On utilise pipe et map pour retourner un objet avec le résultat
         * de l'Observable getBggThingObservable (à savoir thingsXml), et
         * le résultat de l'Observable syncBGGObservable converti (à savoir collection).
         */
        return syncService.getBggThingObservable(gameIds).pipe(
          map(function(thingsXml) {
            /*
             * On reçoit un objet issu des opérations ayant eu lieu dans le pipe précédent.
             * On a donc ici le résultat des 2 appels aux WS de BGG. Reste à faire la conversion
             * de thingsXml, puis de merge avec collection.
             * On stocke le résultat dans le localStorage.
             * On laisse complete faire la redirection vers le bon écran.
             */
            var thingsJson = xmlToJson.convertThingsToJson(thingsXml);
            // merge thingsJson et collection dans fullCollection
            let fullCollection = [];
            fullCollection = arrayService.arrayGameMerge(
              collection,
              thingsJson
            );
            return fullCollection;
          })
        );
      })
    );
  }
};
