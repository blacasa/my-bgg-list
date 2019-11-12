<template>
  <div>
    <!-- Titre de la liste -->
    <div>
      <h1>{{ listName }} ({{ filteredFullList.length }})</h1>
      <b-container fluid>
        <b-row class="my-1">
          <b-col cols="4">
            <b-form-select v-model="triColumn" :options="options"></b-form-select>
          </b-col>
          <b-col cols="2">
            <b-button variant="link" v-on:click="orderClass">
              <img
                src="../assets/order.png"
                class="lazy icon rotating"
                v-bind:class="ascOrder"
                alt="tri"
              />
            </b-button>
          </b-col>
          <b-col cols="2">
            <b-button v-b-toggle.gamesFilter variant="link">
              <img src="../assets/filter.png" class="lazy icon" alt="filtres" />
            </b-button>
          </b-col>
          <b-col cols="2">
            <b-button v-b-toggle.saveList variant="link">
              <img src="../assets/save.png" class="lazy icon" alt="enregistrer" />
            </b-button>
          </b-col>
          <b-col cols="2">
            <b-button
              v-if="selectedGames.length < filteredFullList.length"
              v-on:click="selectAll"
              variant="link"
            >
              <img src="../assets/select.png" class="lazy icon select" alt="selectionner" />
            </b-button>
            <b-button
              v-if="selectedGames.length === filteredFullList.length"
              v-on:click="selectAll"
              variant="link"
            >
              <div class="select" alt="selectionner" />
            </b-button>
          </b-col>
          <b-col></b-col>
        </b-row>
      </b-container>
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
        <b-alert variant="success" v-if="savingMessage != ''" show>{{ savingMessage }}</b-alert>
        <div id="btn-save-div">
          <b-button
            id="btn-save"
            pill
            :disabled="!state"
            size="sm"
            variant="primary"
            v-on:click="save"
          >
            <b-spinner v-if="saving" small></b-spinner>&nbsp; Enregistrer Sélection
          </b-button>
        </div>
      </b-collapse>
    </div>
    <!-- Zone de filtres -->
    <b-collapse id="gamesFilter" class="mt-2">
      <search-games v-on:search="updateSearch" v-on:search-cancel="cancelSearch"></search-games>
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
import searchGames from "./searchGames.vue";
import InfiniteLoading from "vue-infinite-loading";
import searchService from "../services/search.service";

const displayLength = 20;

export default {
  name: "games",
  components: {
    game,
    InfiniteLoading,
    searchGames
  },
  subscriptions: function() {
    return {
      triColumnObs: this.$watchAsObservable("triColumn").pipe(
        map(() => {
          this.orderGames();
          this.search();
        })
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
      saving: false,
      savingMessage: "",
      searchObj: {
        searchDureeMax: "",
        searchDureeMin: "",
        searchNoteMin: "",
        searchNoteMax: "",
        searchPlayer: "",
        searchPlayedMin: "",
        searchPlayedMax: "",
        searchAuteur: "",
        searchIllustrateur: "",
        searchTitre: ""
      },
      order: "ASC",
      options: [
        {
          value: "DUREE",
          text: "Durée",
          objName: "playingTime",
          searchType: "int",
          nullable: true
        },
        {
          value: "JOUEUR_MIN",
          text: "Joueur min",
          objName: "minPlayers",
          searchType: "int",
          nullable: false
        },
        {
          value: "JOUEUR_MAX",
          text: "Joueur max",
          objName: "maxPlayers",
          searchType: "int",
          nullable: false
        },
        {
          value: "NOTE",
          text: "Note",
          objName: "rating",
          searchType: "int",
          nullable: true
        },
        {
          value: "PARTIE",
          text: "Partie",
          objName: "numPlays",
          searchType: "int",
          nullable: false
        },
        {
          value: "TITRE",
          text: "Titre",
          objName: "name",
          searchType: "text",
          nullable: false
        }
      ],
      triColumn: "TITRE"
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
      this.saving = true;
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
      this.savingMessage = "Liste enregistrée.";
      setTimeout(() => {
        this.$root.$emit("bv::toggle::collapse", "saveList");
        this.saving = false;
        this.savingMessage = "";
      }, 1000);
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
        this.search();
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
      this.searchObj = {
        searchDureeMax: "",
        searchDureeMin: "",
        searchNoteMin: "",
        searchNoteMax: "",
        searchPlayer: "",
        searchPlayedMin: "",
        searchPlayedMax: "",
        searchAuteur: "",
        searchIllustrateur: "",
        searchTitre: ""
      };
      this.filteredFullList = this.gameList;
      this.displayedFilteredGameList = this.gameList.slice(0, displayLength);
      if (this.$refs.infiniteLoading) {
        this.$refs.infiniteLoading.stateChanger.reset();
      }
    },
    search: function() {
      let filteredList = searchService.filter(this.gameList, this.searchObj);

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
    updateSearch: function(newSearchObj, reset) {
      this.searchObj = newSearchObj;
      this.search(reset);
    },
    orderGames: function() {
      let game1First = -1;
      let game2First = 1;
      // On tri la liste
      let orderToUse = this.order;
      let colCode = this.triColumn;
      let colOption = this.options.filter(option => {
        return option.value === colCode;
      });
      let colunm = "name";
      let searchType = "string;";
      if (colOption.length > 0) {
        colunm = colOption[0].objName;
        searchType = colOption[0].searchType;
      }
      this.gameList.sort(function(game1, game2) {
        let value1 = game1[colunm];
        let value2 = game2[colunm];
        // cas du champ "rating": la valeur est "N/A" si on n'a pas de note
        if (colunm === "rating") {
          value1 = value1 === "N/A" ? -1 : value1;
          value2 = value2 === "N/A" ? -1 : value2;
        }
        switch (searchType) {
          case "string":
            value1 = value1.toLowerCase();
            value2 = value2.toLowerCase();
            break;
          case "int":
            value1 = parseInt(value1, 10);
            value2 = parseInt(value2, 10);
            break;
          default:
            break;
        }
        if (orderToUse === "ASC") {
          return value1 <= value2 ? game1First : game2First;
        } else {
          return value1 >= value2 ? game1First : game2First;
        }
      });
    },
    orderClass: function() {
      if (this.order === "ASC") {
        this.order = "DESC";
      } else {
        this.order = "ASC";
      }
      this.orderGames();

      // On relance search
      this.search();
    },
    selectAll: function() {
      let selection = [];
      let selectAll = this.selectedGames.length < this.filteredFullList.length;
      // Si on a un élément (au moins) de sélectionné, on vide la
      // liste, et on ajoute tous les id.
      this.filteredFullList.forEach(game => {
        if (selectAll) {
          selection.push(game.gameId);
          game.selected = "check";
        } else {
          game.selected = "uncheck";
        }
      });

      // Si on a autant d'élément sélectionné que dans la liste des
      // jeux, on vide la liste des sélectionnés
      this.selectedGames = selection;
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
  height: 40px;
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
.select {
  background-image: url(../assets/background.png);
  background-size: 40px;
  height: 40px;
  width: 40px;
}
</style>