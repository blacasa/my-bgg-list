<template>
    <div>
        lists

        
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