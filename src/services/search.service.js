export default {
  filter(fullGameList, searchObj) {
    let filteredList = fullGameList;
    // Recherche sur le nombre de joueur
    if (searchObj.searchPlayer !== "") {
      filteredList = this.searchNbPlayer(filteredList, searchObj.searchPlayer);
    }
    if (searchObj.searchNoteMin !== "") {
      filteredList = this.searchNotationMini(
        filteredList,
        searchObj.searchNoteMin
      );
    }
    if (searchObj.searchNoteMax !== "") {
      filteredList = this.searchNotationMaxi(
        filteredList,
        searchObj.searchNoteMax
      );
    }
    if (searchObj.searchDureeMax !== "") {
      filteredList = this.searchDureeMaxi(
        filteredList,
        searchObj.searchDureeMax
      );
    }
    if (searchObj.searchDureeMin !== "") {
      filteredList = this.searchDureeMini(
        filteredList,
        searchObj.searchDureeMin
      );
    }
    if (searchObj.searchPlayedMin !== "") {
      filteredList = this.searchPlayedGameMini(
        filteredList,
        searchObj.searchPlayedMin
      );
    }
    if (searchObj.searchPlayedMax !== "") {
      filteredList = this.searchPlayedGameMaxi(
        filteredList,
        searchObj.searchPlayedMax
      );
    }
    if (searchObj.searchAuteur !== "") {
      filteredList = this.searchDesigner(filteredList, searchObj.searchAuteur);
    }
    if (searchObj.searchIllustrateur !== "") {
      filteredList = this.searchIllustrator(
        filteredList,
        searchObj.searchIllustrateur
      );
    }
    if (searchObj.searchTitre !== "") {
      filteredList = this.searchTitle(filteredList, searchObj.searchTitre);
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
  searchNotationMini: function(gameListToFilter, note, exact = false) {
    return gameListToFilter.filter(game => {
      return exact ? game.rating == note : game.rating >= note;
    });
  },
  searchNotationMaxi: function(gameListToFilter, note, exact = false) {
    return gameListToFilter.filter(game => {
      return exact ? game.rating == note : game.rating <= note;
    });
  },
  searchPlayedGameMini: function(gameListToFilter, nbPartie) {
    return gameListToFilter.filter(game => {
      return game.numPlays >= nbPartie;
    });
  },
  searchPlayedGameMaxi: function(gameListToFilter, nbPartie) {
    return gameListToFilter.filter(game => {
      return game.numPlays <= nbPartie;
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
  }
};
