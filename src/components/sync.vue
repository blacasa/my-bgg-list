<template>
    <div>
        <b-form-group
            id="bggName"
            description="Nom du compte BGG à synchroniser."
            label="Compte BGG"
            label-for="input-bgg-name"
            :invalid-feedback="invalidFeedback"
            :valid-feedback="validFeedback"
            :state="state">
            <b-form-input id="input-bgg-name" v-model="name" trim></b-form-input>
        </b-form-group>
        <!--
        <div id="btn-sync-div">
            <b-button id="btn-sync" :disabled="!state" variant="outline-primary" v-on:click="synchronization">Sync</b-button>
        </div>
        <div id="btn-sync-div">
            <b-button id="btn-sync" :disabled="!state" variant="outline-primary" v-on:click="synchronizationXML">Synchroniser !</b-button>
        </div>
        -->
        <div id="btn-sync-div">
            <b-button id="btn-sync" :disabled="!state" variant="outline-primary" v-on:click="synchronizationXMLObservable">Synchroniser !</b-button>
        </div>
    </div>
</template>

<script>
import { map, concatMap } from 'rxjs/operators'

import constant from '../constants'
import arrayService from '../services/array.service.js'
import syncService from '../services/sync.service'
import xmlToJson from '../services/xmlToJson.service.js'

export default {
    name: 'sync',
    computed: {
        state: function() {
            return this.name.length > 0 ? true : false
        },
        invalidFeedback: function() {
            if(this.name.length === 0) {
                return 'Merci de saisir un nom de compte.';
            }
            return '';
        },
        validFeedback: function() {
            return this.state === true ? 'Merci' : ''
        },
    },
    data: function() {
        return {
            name: localStorage.getItem(constant.SYNCED_ACCOUNT) ? localStorage.getItem(constant.SYNCED_ACCOUNT) : '',
        };
    },
    methods: {
        synchronization: function() {
            var component = this;
            syncService
                .sync(this.name)
                .then(function(gameList) {
                    // On stocke la liste des jeux dans le localStorage
                    localStorage.setItem(constant.GAME_LIST_ID, JSON.stringify(gameList));
                    component.$router.push({ name: 'games', params: { list: constant.GAME_LIST_ID } });
                });
        },
        synchronizationXML: function() {
            var component = this;
            // TODO: gestion d'un spinner
            syncService
                .syncBGG(this.name)
                .then(function(gameList) {
                    // On stocke la liste des jeux dans le localStorage
                    localStorage.setItem(constant.GAME_LIST_ID, JSON.stringify(gameList));
                    component.$router.push({ name: 'games', params: { list: constant.GAME_LIST_ID } });
                });
        },
        synchronizationXMLObservableOld: function() {
            /*
             * Fonctionne, mais ça me plait pas.
             * Ca fait trop "callback".
             */
            var component = this;
            syncService.syncBGGObservable(this.name).subscribe({
                next: function(xmlResponseData) {
                    let collection = xmlToJson.convertCollectionToJson(xmlResponseData);
                    let fullCollection = [];
                    let gameIds = '';
                    collection.forEach(function(game) {
                        gameIds += game.gameId + ',';
                    });
                    syncService.getBggThingObservable(gameIds).subscribe({
                        next: function(thingsXml) {
                            var thingsJson = xmlToJson.convertThingsToJson(thingsXml);
                            // merge thingsJson et collection dans fullCollection
                            fullCollection = arrayService.arrayGameMerge(collection, thingsJson);
                            // On stocke la liste des jeux dans le localStorage
                            localStorage.setItem(constant.GAME_LIST_ID, JSON.stringify(fullCollection));
                            component.$router.push({ name: 'games', params: { list: constant.GAME_LIST_ID } });
                        },
                        complete: function() {
                            //console.log('COMPLETE THING');
                        }
                    });
                },
                complete: function() {
                    //console.log('COMPLETE!!!');
                }
            });
        },
        synchronizationXMLObservable: function() {
            var component = this;
            let bggAccount = this.name;
            syncService.syncBGGObservable(bggAccount)
                .pipe(
                    concatMap(
                        function(collectionXmlResponseData) {
                            /*
                             * On reçoit le retour de syncBGGObservable qui
                             * est "collectionXmlResponseData" (le xml de la collection de jeux).
                             * concatMap prend en paramètre une fonction (celle-ci) qui retourne
                             * un Observable (ici, getBggThingObservable).
                             * concatMap est utilisé car getBggThingObservable est asynchrone. Si
                             * cela n'avait pas été le cas, il aurait fallu utiliser map à la
                             * place de concatMap.
                             */
                            let collection = xmlToJson.convertCollectionToJson(collectionXmlResponseData);
                            let gameIds = '';
                            collection.forEach(function(game) {
                                gameIds += game.gameId + ',';
                            });
                            /*
                             * On utilise pipe et map pour retourner un objet avec le résultat
                             * de l'Observable getBggThingObservable (à savoir thingsXml), et
                             * le résultat de l'Observable syncBGGObservable converti (à savoir collection).
                             */
                            return syncService.getBggThingObservable(gameIds).pipe(
                                map(function(thingsXml) {
                                    return ({thingsXml, collection});
                                })
                            );
                        }
                    )
                )
                .subscribe({
                    next: function({thingsXml, collection}) {
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
                        fullCollection = arrayService.arrayGameMerge(collection, thingsJson); 
                        // On stocke la liste des jeux dans le localStorage
                        localStorage.setItem(constant.GAME_LIST_ID, JSON.stringify(fullCollection));
                    },
                    complete: function() {
                        localStorage.setItem(constant.SYNCED_ACCOUNT, bggAccount);
                        // Rédirection vers la lsite des jeux qui viennent d'être synchronisés.
                        component.$router.push({ name: 'games', params: { list: constant.GAME_LIST_ID } });
                    }
                });
        }
    }
}
</script>

<style scoped>
    #btn-sync-div {
        display: flex;
        flex-direction: row;
        justify-content: center;
        margin-top: 15px;
    }
    #btn-sync {
        width: 33%;
    }
</style>