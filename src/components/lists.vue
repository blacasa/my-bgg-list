<template>
    <div>
        <list-game
            v-for="list in lists"
            :key="list.id"
            v-bind:liste="list"/>
    </div>
</template>

<script>
import constant from '../constants'
import listGame from './listGame.vue'

export default {
    name: 'lists',
    components: {
        listGame,
    },
    data: function() {
        return {
            lists: [],
        };
    },
    mounted: function() {
        this.fetchData();
    },
    methods: {
        fetchData: function() {
            // On récupère la liste des listes
            let savedList = this.getFromStorage(constant.LIST_LIST_ID);
            // Si elle n'existe pas, on l'init
            if (savedList === null) {
                savedList = [];
            }
            // Pour chaque liste, on reconstruit la liste des jeux à partir de la 
            // liste complète des jeux (celle qui est la plus "fraiche", celle issue
            // de la dernière synchro)
            let collection = this.getFromStorage(constant.GAME_LIST_ID);
            // Si elle n'existe pas, on l'init
            if (collection === null) {
                collection = [];
            }
            savedList.forEach(function(liste) {
                let gameList = collection.filter(function(game) {
                    return liste.list.includes(game.gameId);
                });
                liste.list = gameList;
            });

            this.lists = savedList;
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

</style>