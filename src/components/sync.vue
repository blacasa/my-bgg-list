<template>
  <div>
    <b-form-group
      id="bggName"
      description="Nom du compte BGG à synchroniser."
      label="Compte BGG"
      label-for="input-bgg-name"
      :invalid-feedback="invalidFeedback"
      :valid-feedback="validFeedback"
      :state="state"
    >
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
      <b-button
        id="btn-sync"
        :disabled="!state"
        variant="outline-primary"
        v-on:click="synchronizationXMLObservable"
      >Synchroniser !</b-button>
    </div>
  </div>
</template>

<script>
import constant from "../constants";
import arrayService from "../services/array.service.js";
import syncService from "../services/sync.service";
import xmlToJson from "../services/xmlToJson.service.js";

export default {
  name: "sync",
  computed: {
    state: function() {
      return this.name.length > 0 ? true : false;
    },
    invalidFeedback: function() {
      if (this.name.length === 0) {
        return "Merci de saisir un nom de compte.";
      }
      return "";
    },
    validFeedback: function() {
      return this.state === true ? "Merci" : "";
    }
  },
  data: function() {
    return {
      name: localStorage.getItem(constant.SYNCED_ACCOUNT)
        ? localStorage.getItem(constant.SYNCED_ACCOUNT)
        : ""
    };
  },
  methods: {
    synchronization: function() {
      var component = this;
      syncService.sync(this.name).then(function(gameList) {
        // On stocke la liste des jeux dans le localStorage
        localStorage.setItem(constant.GAME_LIST_ID, JSON.stringify(gameList));
        component.$router.push({
          name: "games",
          params: { list: constant.GAME_LIST_ID }
        });
      });
    },
    synchronizationXML: function() {
      var component = this;
      // TODO: gestion d'un spinner
      syncService.syncBGG(this.name).then(function(gameList) {
        // On stocke la liste des jeux dans le localStorage
        localStorage.setItem(constant.GAME_LIST_ID, JSON.stringify(gameList));
        component.$router.push({
          name: "games",
          params: { list: constant.GAME_LIST_ID }
        });
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
          let gameIds = "";
          collection.forEach(function(game) {
            gameIds += game.gameId + ",";
          });
          syncService.getBggThingObservable(gameIds).subscribe({
            next: function(thingsXml) {
              var thingsJson = xmlToJson.convertThingsToJson(thingsXml);
              // merge thingsJson et collection dans fullCollection
              fullCollection = arrayService.arrayGameMerge(
                collection,
                thingsJson
              );
              // On stocke la liste des jeux dans le localStorage
              localStorage.setItem(
                constant.GAME_LIST_ID,
                JSON.stringify(fullCollection)
              );
              component.$router.push({
                name: "games",
                params: { list: constant.GAME_LIST_ID }
              });
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
      syncService.bggSync(bggAccount).subscribe({
        next: function(fullCollection) {
          // On stocke la liste des jeux dans le localStorage
          localStorage.setItem(
            constant.GAME_LIST_ID,
            JSON.stringify(fullCollection)
          );
        },
        complete: function() {
          localStorage.setItem(constant.SYNCED_ACCOUNT, bggAccount);
          // Rédirection vers la lsite des jeux qui viennent d'être synchronisés.
          component.$router.push({
            name: "games",
            params: { list: constant.GAME_LIST_ID }
          });
        }
      });
    }
  }
};
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