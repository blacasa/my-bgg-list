<template>
    <div>
        <b-card>
            {{ liste.name }} ({{ liste.list.length }})
            <b-button v-b-toggle="collapseId" variant="primary">Détails</b-button>
            <b-collapse :id="collapseId" class="mt-2">
                <b-card>
                    <game
                        v-for="(game, index) in liste.list"
                        :key="game.gameId"
                        v-bind:game="game"
                        v-bind:idx="index"
                        v-bind:mode="mode"/>
                </b-card>
            </b-collapse>
        </b-card>
    </div>
</template>

<script>
//import constant from '../constants'
import game from './game.vue'

export default {
    name: 'liste',
    components: {
        game,
    },
    props: {
        liste: {}
    },
    data: function() {
        return {
            lists: [],
            mode: 'LECTURE',
        };
    },
    computed: {
        collapseId: function() {
            return 'collapse-'+this.liste.id;
        },
    },
}
</script>

<style scoped>

</style>