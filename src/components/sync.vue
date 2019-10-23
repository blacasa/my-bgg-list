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
        <div id="btn-sync-div">
            <b-button id="btn-sync" :disabled="!state" variant="outline-primary" v-on:click="synchronization">Sync</b-button>
        </div>
    </div>
</template>

<script>
import syncService from '../services/sync.service'
import constant from '../constants'

export default {
    name: 'sync',
    data: function() {
        return {
            name: '',
        };
    },
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
    methods: {
        synchronization: function() {
            var component = this;
            syncService.sync(this.name)
            .then(function(gameList) {
                // On stocke la liste des jeux dans le localStorage
                localStorage.setItem(constant.GAME_LIST_ID, JSON.stringify(gameList));
                component.$router.push({ name: 'games', params: { list: constant.GAME_LIST_ID } })
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