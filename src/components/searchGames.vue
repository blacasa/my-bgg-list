<template>
  <div>
    <b-card>
      <b-container fluid>
        <b-row class="my-1">
          <b-col sm="4">
            <b-form-input
              id="search-titre"
              type="text"
              placeholder="Titre"
              size="sm"
              v-model.trim="searchObj.searchTitre"
            ></b-form-input>
          </b-col>
        </b-row>
        <b-row class="my-1">
          <b-col sm="4">
            <b-form-input
              id="search-auteur"
              type="text"
              placeholder="Auteur"
              size="sm"
              v-model.trim="searchObj.searchAuteur"
            ></b-form-input>
          </b-col>
          <b-col sm="3">
            <b-form-input
              id="search-nbPartiesMin"
              type="number"
              placeholder="Parties min"
              size="sm"
              v-model.number="searchObj.searchPlayedMin"
            ></b-form-input>
          </b-col>
          <b-col sm="3">
            <b-form-input
              id="search-nbPartiesMax"
              type="number"
              placeholder="Parties max"
              size="sm"
              v-model.number="searchObj.searchPlayedMax"
            ></b-form-input>
          </b-col>
        </b-row>
        <b-row class="my-1">
          <b-col sm="4">
            <b-form-input
              id="search-illustrateur"
              type="text"
              placeholder="Illustrateur"
              size="sm"
              v-model.trim="searchObj.searchIllustrateur"
            ></b-form-input>
          </b-col>
          <b-col sm="3">
            <b-form-input
              id="search-duree"
              type="number"
              placeholder="Durée min"
              size="sm"
              v-model.number="searchObj.searchDureeMin"
            ></b-form-input>
          </b-col>
          <b-col sm="3">
            <b-form-input
              id="search-duree"
              type="number"
              placeholder="Durée max"
              size="sm"
              v-model.number="searchObj.searchDureeMax"
            ></b-form-input>
          </b-col>
        </b-row>
        <b-row class="my-1">
          <b-col sm="4">
            <b-form-input
              id="search-nbJoueur"
              type="number"
              placeholder="Nb Joueurs"
              size="sm"
              v-model.number="searchObj.searchPlayer"
            ></b-form-input>
          </b-col>
          <b-col sm="3">
            <b-form-input
              id="search-note"
              type="number"
              placeholder="Note min"
              size="sm"
              v-model.number="searchObj.searchNoteMin"
            ></b-form-input>
          </b-col>
          <b-col sm="3">
            <b-form-input
              id="search-noteMax"
              type="number"
              placeholder="Note max"
              size="sm"
              v-model.number="searchObj.searchNoteMax"
            ></b-form-input>
          </b-col>
        </b-row>

        <b-row class="my-1"></b-row>
        <b-row class="my-1">
          <!-- les fonctions search et cancelSearch doivent être remplacées par des event à remonter au parent -->
          <b-button pill variant="outline-dark" class="search" v-on:click="emitFilters">
            <img src="../assets/filter.png" class="lazy icon" alt="recherche" />
          </b-button>
          <b-button pill variant="outline-dark" class="search" v-on:click="cancelSearch">
            <img src="../assets/annuler.png" class="lazy icon" alt="vider les filtres" />
          </b-button>
        </b-row>
      </b-container>
    </b-card>
  </div>
</template>

<script>
import { map } from "rxjs/operators";

export default {
  name: "triGames",
  data: function() {
    return {
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
      }
    };
  },
  subscriptions: function() {
    var component = this;
    return {
      inputKeyup: this.$fromDOMEvent("input", "keyup").pipe(
        map(() => component.emitFilters())
      ),
      inputChange: this.$fromDOMEvent("input", "change").pipe(
        map(() => component.emitFilters())
      )
    };
  },
  methods: {
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
      this.$emit("search-cancel", this.searchObj);
    },
    emitFilters: function() {
      this.$emit("search", this.searchObj);
    }
  }
};
</script>

<style scoped>
.centered-label {
  text-align: center;
}
.icon {
  height: 40px;
}
.search {
  margin: 5px;
}
</style>