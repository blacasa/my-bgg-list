export default {
    arrayGameMerge(gameList, dataList) {
        let fullDataGameList = [];
        // Boucle sur gameList
        
        gameList.forEach(function(game) {
            var gameId = game.gameId;

            let gameData = dataList.filter(function(data) {
                return gameId === data.gameId;
            });
            // On recherche le dataListe correspondant au gameId
            if (gameData.length > 0) {
                gameData = gameData[0];
                //console.log('gameData');
                //console.log(gameData);
                //console.log(gameData.authors);
                // On ajoute les data de dataListe au game de gameList
                game.isExpansion = gameData.isExpansion;
                game.bggRating = gameData.bggRating;
                game.averageRating = gameData.averageRating;
                game.rank = gameData.rank;
                game.authors = gameData.authors;
                game.artists = gameData.artists;
                game.publishers = gameData.publishers;
            }
            //console.log(game);

            fullDataGameList.push(game);
        });
        return fullDataGameList;
    }
}