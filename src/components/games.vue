<template>
    <div>
        <!-- Titre de la liste -->
        <div>
            <h1>{{ listName }}</h1>
        </div>
        <div>
            <b-form-group
                id="saveListName"
                description="Nom de la liste à sauvegarder."
                :invalid-feedback="invalidFeedback"
                :valid-feedback="validFeedback"
                :state="state">
                <b-form-input id="input-list-name" v-model="saveListName" trim></b-form-input>
            </b-form-group>
            <div id="btn-save-div">
                <b-button
                    id="btn-save"
                    pill
                    :disabled="!state"
                    size="sm"
                    variant="primary"
                    v-on:click="save">
                    Enregistrer Sélection
                </b-button>
            </div>
        </div>
        <!-- Zone de filtres -->
        <div>
        </div>
        <game
            v-for="(game, index) in gameList"
            :key="game.gameId"
            v-bind:game="game"
            v-bind:idx="index"
            v-bind:mode="mode"
            v-on:game-selected-event="selectGame"
            v-on:game-unselected-event="unselectGame"/>
    </div>
</template>

<script>
import constant from '../constants'
import game from './game.vue'

export default {
    name: 'games',
    components: {
        game,
    },
    mounted: function() {
        this.fetchData();
    },
    data: function() {
        return {
            gameList: [],
            selectedGames: [],
            saveListName: '',
            mode: 'EDIT',
        }
    },
    computed: {
        listName: function() {
            let gameListId = this.$router.params ? this.$router.params.list : constant.GAME_LIST_ID;
            if (gameListId === constant.GAME_LIST_ID) {
                return 'Liste des jeux';
            }
            else {
                return 'Nom de la liste';
            }
        },
        state: function() {
            return this.saveListName.length > 0 ? true : false
        },
        invalidFeedback: function() {
            if(this.saveListName.length === 0) {
                return '';
            }
            return '';
        },
        validFeedback: function() {
            return this.state === true ? '' : ''
        },
    },
    methods: {
        fetchData: function() {
            let gameListId = this.$router.params ? this.$router.params.list : constant.GAME_LIST_ID;
            this.gameList = this.getFromStorage(gameListId);
        },
        selectGame: function(index, selectedGame) {
            this.selectedGames.push(selectedGame);
        },
        unselectGame: function(index, selectedGame) {
            var selectedGameIndex = this.selectedGames.findIndex(function(game) {
                return game.gameId === selectedGame.gameId;
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
                } catch(e) {
                    localStorage.removeItem(itemId);
                }
            }
            return item;
        }
    },
}
</script>

<style scoped>
    h1 {
        text-align:center;
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
</style>