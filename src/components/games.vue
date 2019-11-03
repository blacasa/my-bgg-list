<template>
  <div>
    <!-- Titre de la liste -->
    <div>
      <h1>
        {{ listName }} ({{ filteredFullList.length }})
        <b-button v-b-toggle.gamesFilter variant="outline-primary">
          <img src="../assets/filter.png" class="lazy icon rotating" alt="filtres" />
        </b-button>
        <b-button v-b-toggle.saveList variant="outline-primary">
          <img src="../assets/save.png" class="lazy icon" alt="enregistrer" />
        </b-button>

        <b-button variant="outline-primary" v-on:click="orderClass">
          <img
            src="../assets/order.png"
            class="lazy icon rotating"
            v-bind:class="ascOrder"
            alt="tri"
          />
        </b-button>
      </h1>
    </div>
    <div>
      <b-collapse id="saveList" class="mt-2">
        <b-form-group
          id="saveListName"
          description="Nom de la liste à sauvegarder."
          :invalid-feedback="invalidFeedback"
          :valid-feedback="validFeedback"
          :state="state"
        >
          <b-form-input id="input-list-name" v-model="saveListName" trim></b-form-input>
        </b-form-group>
        <div id="btn-save-div">
          <b-button
            id="btn-save"
            pill
            :disabled="!state"
            size="sm"
            variant="primary"
            v-on:click="save"
          >Enregistrer Sélection</b-button>
        </div>
      </b-collapse>
    </div>
    <!-- Zone de filtres -->
    <b-collapse id="gamesFilter" class="mt-2">
      <b-card>
        <b-container fluid>
          <b-row class="my-1">
            <b-col sm="4">
              <b-form-input
                id="search-titre"
                type="text"
                placeholder="Titre"
                size="sm"
                v-model.trim="searchTitre"
              ></b-form-input>
            </b-col>
            <b-col sm="4">
              <b-form-input
                id="search-auteur"
                type="text"
                placeholder="Auteur"
                size="sm"
                v-model.trim="searchAuteur"
              ></b-form-input>
            </b-col>
            <b-col sm="4">
              <b-form-input
                id="search-illustrateur"
                type="text"
                placeholder="Illustrateur"
                size="sm"
                v-model.trim="searchIllustrateur"
              ></b-form-input>
            </b-col>
          </b-row>
          <b-row class="my-1">
            <b-col sm="2">
              <b-form-input
                id="search-nbJoueur"
                type="number"
                placeholder="Joueurs"
                size="sm"
                v-model.number="searchPlayer"
              ></b-form-input>
            </b-col>
            <b-col sm="2">
              <b-form-input
                id="search-nbParties"
                type="number"
                placeholder="Parties"
                size="sm"
                v-model.number="searchPlayed"
              ></b-form-input>
            </b-col>
            <b-col sm="3">
              <b-form-input
                id="search-duree"
                type="number"
                placeholder="Durée min"
                size="sm"
                v-model.number="searchDureeMin"
              ></b-form-input>
            </b-col>
            <b-col sm="3">
              <b-form-input
                id="search-duree"
                type="number"
                placeholder="Durée max"
                size="sm"
                v-model.number="searchDureeMax"
              ></b-form-input>
            </b-col>
            <b-col sm="2">
              <b-form-input
                id="search-note"
                type="number"
                placeholder="Note"
                size="sm"
                v-model.number="searchNote"
              ></b-form-input>
            </b-col>
          </b-row>
          <b-row class="my-1">
            <b-button pill variant="outline-dark" class="search" v-on:click="search">
              <img src="../assets/filter.png" class="lazy icon" alt="recherche" />
            </b-button>
            <b-button pill variant="outline-dark" class="search" v-on:click="cancelSearch">
              <img src="../assets/annuler.png" class="lazy icon" alt="vider les filtres" />
            </b-button>
          </b-row>
        </b-container>
      </b-card>
    </b-collapse>
    <game
      v-for="(game, index) in displayedFilteredGameList"
      :key="game.gameId"
      v-bind:game="game"
      v-bind:idx="index"
      v-bind:mode="mode"
      v-on:game-selected-event="selectGame"
      v-on:game-unselected-event="unselectGame"
    />
    <infinite-loading @infinite="infiniteHandler" ref="infiniteLoading">
      <div slot="spinner">Chargement...</div>
      <div slot="no-more">Pas d'autres résultats</div>
      <div slot="no-results">Pas d'autres résultats</div>
    </infinite-loading>
  </div>
</template>

<script>
import { map } from "rxjs/operators";

import constant from "../constants";
import game from "./game.vue";
import InfiniteLoading from "vue-infinite-loading";

const displayLength = 20;

export default {
  name: "games",
  components: {
    game,
    InfiniteLoading
  },
  subscriptions: function() {
    return {
      inputKeyup: this.$fromDOMEvent("input", "keyup").pipe(
        map(() => this.search())
      ),
      inputChange: this.$fromDOMEvent("input", "change").pipe(
        map(() => this.search())
      )
    };
  },
  mounted: function() {
    this.fetchData();
  },
  data: function() {
    return {
      gameList: [],
      displayedGameList: [],
      displayedFilteredGameList: [],
      filteredFullList: [],
      selectedGames: [],
      saveListName: "",
      mode: "EDIT",
      searchDureeMax: "",
      searchDureeMin: "",
      searchNote: "",
      searchPlayer: "",
      searchPlayed: "",
      searchAuteur: "",
      searchIllustrateur: "",
      searchTitre: "",
      order: "ASC"
    };
  },
  computed: {
    listName: function() {
      let gameListId = this.$router.params
        ? this.$router.params.list
        : constant.GAME_LIST_ID;
      if (gameListId === constant.GAME_LIST_ID) {
        return "Liste des jeux";
      } else {
        return "Nom de la liste";
      }
    },
    state: function() {
      return this.saveListName.length > 0 ? true : false;
    },
    invalidFeedback: function() {
      if (this.saveListName.length === 0) {
        return "";
      }
      return "";
    },
    validFeedback: function() {
      return this.state === true ? "" : "";
    },
    ascOrder: function() {
      return {
        rotatingOrderAsc: this.order === "ASC"
      };
    }
  },
  methods: {
    fetchData: function() {
      let gameListId = this.$router.params
        ? this.$router.params.list
        : constant.GAME_LIST_ID;
      this.gameList = this.getFromStorage(gameListId);
      if (this.gameList === null) {
        this.gameList = [];
      }
      this.filteredFullList = this.gameList;
      this.displayedGameList =
        this.gameList.length > 0 ? this.gameList.slice(0, displayLength) : [];
      this.search();
    },
    selectGame: function(selectedGame) {
      this.selectedGames.push(selectedGame.gameId);
    },
    unselectGame: function(selectedGame) {
      var selectedGameIndex = this.selectedGames.findIndex(function(gameId) {
        return gameId === selectedGame.gameId;
      });
      if (selectedGameIndex >= 0) {
        this.selectedGames.splice(selectedGameIndex, 1);
      }
    },
    save: function() {
      // On récupère la liste des listes
      let listOfLists = this.getFromStorage(constant.LIST_LIST_ID);
      // Si elle n'existe pas, on l'init
      if (listOfLists === null) {
        listOfLists = [];
      }
      /*
       * Format:
       * [
       *  {
       *      id: Date.now(),
       *      name: '',
       *      list: []
       *  }
       * ]
       */
      // On ajoute la liste
      let newList = {
        id: Date.now(),
        name: this.saveListName,
        list: this.selectedGames
      };
      listOfLists.push(newList);
      // On la stocke dans le localStorage
      localStorage.setItem(constant.LIST_LIST_ID, JSON.stringify(listOfLists));
    },
    getFromStorage: function(itemId) {
      let item = null;
      if (localStorage.getItem(itemId)) {
        try {
          item = JSON.parse(localStorage.getItem(itemId));
        } catch (e) {
          localStorage.removeItem(itemId);
        }
      }
      return item;
    },
    infiniteHandler: function($state) {
      if (
        this.displayedFilteredGameList.length !== this.filteredFullList.length
      ) {
        this.search(this.gameList);
        this.displayedFilteredGameList = this.filteredFullList.slice(
          0,
          this.displayedFilteredGameList.length + displayLength
        );
        $state.loaded();
      } else {
        $state.complete();
      }
    },
    cancelSearch: function() {
      this.searchDureeMax = "";
      this.searchDureeMin = "";
      this.searchNote = "";
      this.searchPlayer = "";
      this.searchPlayed = "";
      this.searchAuteur = "";
      this.searchIllustrateur = "";
      this.searchTitre = "";
      this.filteredFullList = this.gameList;
      this.displayedFilteredGameList = this.gameList.slice(0, displayLength);
      if (this.$refs.infiniteLoading) {
        this.$refs.infiniteLoading.stateChanger.reset();
      }
    },
    search: function() {
      let filteredList = this.gameList;
      // Recherche sur le nombre de joueur
      if (this.searchPlayer !== "") {
        filteredList = this.searchNbPlayer(filteredList, this.searchPlayer);
      }
      if (this.searchNote !== "") {
        filteredList = this.searchNotation(filteredList, this.searchNote);
      }
      if (this.searchDureeMax !== "") {
        filteredList = this.searchDureeMaxi(filteredList, this.searchDureeMax);
      }
      if (this.searchDureeMin !== "") {
        filteredList = this.searchDureeMini(filteredList, this.searchDureeMin);
      }
      if (this.searchPlayed !== "") {
        filteredList = this.searchPlayedGame(filteredList, this.searchPlayed);
      }
      if (this.searchAuteur !== "") {
        filteredList = this.searchDesigner(filteredList, this.searchAuteur);
      }
      if (this.searchIllustrateur !== "") {
        filteredList = this.searchIllustrator(
          filteredList,
          this.searchIllustrateur
        );
      }
      if (this.searchTitre !== "") {
        filteredList = this.searchTitle(filteredList, this.searchTitre);
      }

      this.filteredFullList = filteredList;
      this.displayedFilteredGameList = this.filteredFullList.slice(
        0,
        this.displayedFilteredGameList.length
      );
      if (this.$refs.infiniteLoading) {
        this.$refs.infiniteLoading.stateChanger.reset();
      }

      return filteredList;
    },
    searchNbPlayer: function(gameListToFilter, nbPlayer) {
      return gameListToFilter.filter(game => {
        return game.minPlayers <= nbPlayer && game.maxPlayers >= nbPlayer;
      });
    },
    searchDureeMaxi: function(gameListToFilter, duree) {
      return gameListToFilter.filter(game => {
        return game.playingTime <= duree;
      });
    },
    searchDureeMini: function(gameListToFilter, duree) {
      return gameListToFilter.filter(game => {
        return game.playingTime >= duree;
      });
    },
    searchNotation: function(gameListToFilter, note, exact = false) {
      return gameListToFilter.filter(game => {
        return exact ? game.rating == note : game.rating >= note;
      });
    },
    searchPlayedGame: function(gameListToFilter, nbPartie) {
      return gameListToFilter.filter(game => {
        return game.numPlays >= nbPartie;
      });
    },
    searchDesigner: function(gameListToFilter, auteur) {
      return gameListToFilter.filter(game => {
        return game.authors
          .join(", ")
          .toLowerCase()
          .includes(auteur);
      });
    },
    searchIllustrator: function(gameListToFilter, illustrateur) {
      return gameListToFilter.filter(game => {
        return game.artists
          .join(", ")
          .toLowerCase()
          .includes(illustrateur);
      });
    },
    searchTitle: function(gameListToFilter, titre) {
      return gameListToFilter.filter(game => {
        return game.name.toLowerCase().includes(titre);
      });
    },
    orderClass: function() {
      if (this.order === "ASC") {
        this.order = "DESC";
      } else {
        this.order = "ASC";
      }
      // On tri la liste
      let orderToUse = this.order;
      this.gameList.sort(function(game1, game2) {
        if (orderToUse === "ASC") {
          if (game1.name.toLowerCase() <= game2.name.toLowerCase()) {
            return -1;
          } else {
            return 1;
          }
        } else {
          if (game1.name.toLowerCase() >= game2.name.toLowerCase()) {
            return -1;
          } else {
            return 1;
          }
        }
      });

      // On relance search
      this.search();
    }
  }
};
</script>

<style scoped>
h1 {
  text-align: center;
}
#saveListName {
  display: block;
  margin: auto;
  width: 75%;
}
#btn-save-div {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 15px;
}
#btn-save {
  width: 33%;
}
.icon {
  height: 25px;
}
.search {
  margin: 5px;
}
.rotating {
  transition: transform 1s ease-in-out;
}
.rotatingOrderAsc {
  transform: rotateZ(180deg);
}
.rotatingOrderDesc {
  transform: rotateZ(180deg);
}
</style>