<template>
    <div>
        <!-- checkbox, titre, auteur, editeur, joueur min, joueur max, note, miniature, nombre de parties jouées. -->
        <b-card
            :title="game.name"
            class="game-card">
            <b-container fluid>
                <b-row class="my-1">
                    <b-col sm="1" v-if="isEditable">
                        <b-form-checkbox
                            :id="checkboxId"
                            v-model="game.selected"
                            :name="checkboxId"
                            value="check"
                            unchecked-value="uncheck"
                            v-on:change="select">
                        </b-form-checkbox>
                    </b-col>
                    <b-col sm="3">
                        de {{ game.minPlayers }} à {{ game.maxPlayers }} joueur(s)
                    </b-col>
                    <b-col sm="2">
                        {{ game.numPlays }} partie(s)
                    </b-col>
                    <b-col sm="2" v-show="game.rating >= 0">
                        {{ game.rating }}/10
                    </b-col>
                </b-row>
            </b-container>
        </b-card>
    </div>
</template>

<script>
export default {
    name: 'game',
    props: {
        game: {},
        idx: Number,
        mode: String,
    },
    data: function() {
        return {
            selected: 0,
            checkboxId: '',
        };
    },
    mounted: function() {
        this.checkboxId = 'checkbox-' + this.idx;
        if (typeof this.game.selected === 'undefined') {
            this.game.selected = 'uncheck';
        }
    },
    computed: {
        isEditable: function() {
            return this.mode === 'EDIT';
        }
    },
    methods: {
        select: function(selected) {
            if (selected === 'check') {
                // la checkbox est sélectionnée
                this.$emit('game-selected-event', this.idx, this.game);
            }
            else {
                this.$emit('game-unselected-event', this.idx, this.game);
            }
        }
    }
}
</script>

<style scoped>
    .game-card {
        margin: 2px 5px;
    }
</style>