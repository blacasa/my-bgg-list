<template>
    <div>
        <!-- checkbox, titre, auteur, editeur, joueur min, joueur max, note, miniature, nombre de parties jouées. -->
        <b-card
            :title="game.name"
            class="game-card"
            v-on:click="selectGame"
            v-bind:class="isSelected">
            <b-container fluid>
                <b-row class="my-1">
                    <b-col sm="3">
                        <img
                            v-bind:src="game.thumbnail"
                            class="lazy"
                            alt="">
                    </b-col>
                    <b-col sm="4">
                        <img
                            src="../assets/author.png"
                            class="lazy icon"
                            alt="auteur(s)"/> {{ authors }}
                    </b-col>
                    <b-col sm="4" v-show="game.artists.length > 0">
                        <img
                            src="../assets/illustrator.png"
                            class="lazy icon"
                            alt="illustrateur(s)"/> {{ artists }}
                    </b-col>
                </b-row>
                <b-row class="my-1">
                    <b-col sm="3">
                        <img
                            src="../assets/player.png"
                            class="lazy icon"
                            alt="joueur(s)"/> {{ nbPlayers }}
                    </b-col>
                    <b-col sm="4">
                        <img
                            src="../assets/gameplayed.png"
                            class="lazy icon"
                            alt="partie(s)"/> {{ game.numPlays }} partie(s)
                    </b-col>
                    <b-col sm="2">
                        <img
                            src="../assets/duration.png"
                            class="lazy icon"
                            alt="durée"/> {{ game.playingTime }}'
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
    },
    computed: {
        isEditable: function() {
            return this.mode === 'EDIT';
        },
        authors: function() {
            return this.game.authors.join(', ');
        },
        artists: function() {
            return this.game.artists.join(', ');
        },
        nbPlayers: function() {
            let nbPlayerTxt = '';
            if (this.game.minPlayers !== this.game.maxPlayers) {
                nbPlayerTxt += this.game.minPlayers + ' à ' + this.game.maxPlayers + ' joueur(s)';
            }
            else {
                nbPlayerTxt += this.game.minPlayers + ' joueur(s)';
            }

            return nbPlayerTxt;
        },
        isSelected: function() {
            return {
                isSelected: this.mode === 'EDIT' && this.game.selected === 'check',
            };
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
        },
        selectGame: function() {
            if (this.game.selected === 'check') {
                this.game.selected = 'uncheck';
                this.$emit('game-unselected-event', this.game);
            }
            else {
                this.game.selected = 'check';
                this.$emit('game-selected-event', this.game);
            }
        }
    }
}
</script>

<style scoped>
    img {
        max-height: 75px;
        max-width: 75px;
    }
    .game-card {
        margin: 2px 5px;
    }
    .icon {
        height: 25px;
    }
    .isSelected {
        background-color: mediumpurple;
    }
</style>