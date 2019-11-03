import xml2js from "xml2js";
var parseString = xml2js.parseString;

export default {
  convertCollectionToJson(xml) {
    let jsonList = [];
    parseString(xml, function(err, list) {
      list.items.item.forEach(gameXml => {
        let game = {};
        game.gameId = gameXml.$.objectid;
        game.name = gameXml.name[0]._;
        game.image = gameXml.image[0];
        game.thumbnail = gameXml.thumbnail[0];
        game.minPlayers = gameXml.stats[0].$.minplayers;
        game.minPlayTime = gameXml.stats[0].$.minplaytime;
        game.maxPlayers = gameXml.stats[0].$.maxplayers;
        game.maxPlayTime = gameXml.stats[0].$.maxplaytime;
        game.playingTime = gameXml.stats[0].$.playingtime;
        game.isExpansion = -1;
        game.yearPublished = gameXml.yearpublished
          ? gameXml.yearpublished[0]
          : 0;
        game.bggRating = -1;
        game.averageRating = -1;
        game.rank = -1;
        game.numPlays = gameXml.numplays[0];
        game.rating = gameXml.stats[0].rating[0].$.value;
        game.owned = gameXml.status[0].$.own;
        game.preOrdered = -1;
        game.forTrade = -1;
        game.previousOwned = -1;
        game.subtype = gameXml.$.subtype;
        game.want = -1;
        game.wantToPlay = -1;
        game.wantToBuy = -1;
        game.wishList = -1;
        game.userComment = -1;

        jsonList.push(game);
      });
    });
    return jsonList;
  },
  convertThingsToJson(thingsXml) {
    let jsonList = [];
    parseString(thingsXml, function(err, list) {
      list.items.item.forEach(gameXml => {
        // Convert thingXml to thingJson
        var thingJson = {};
        thingJson.gameId = gameXml.$.id;
        thingJson.isExpansion = -1;
        thingJson.bggRating = -1;
        thingJson.averageRating =
          gameXml.statistics[0].ratings[0].average[0].$.value;
        // Récupération du rang BGG
        let bggRank = gameXml.statistics[0].ratings[0].ranks[0].rank.filter(
          function(rank) {
            return rank.$.id == 1;
          }
        );
        thingJson.rank = bggRank[0].$.value;
        // Récupération du/des auteur(s)
        let authorCode = "boardgamedesigner";
        let artistCode = "boardgameartist";
        let publisherCode = "boardgamepublisher";
        let authors = [];
        let artists = [];
        let publishers = [];
        gameXml.link.forEach(function(link) {
          var type = link.$.type;
          switch (type) {
            case authorCode:
              authors.push(link.$.value);
              break;
            case artistCode:
              artists.push(link.$.value);
              break;
            case publisherCode:
              publishers.push(link.$.value);
              break;
            default:
              break;
          }
        });
        thingJson.authors = authors;
        thingJson.artists = artists;
        thingJson.publishers = publishers;

        jsonList.push(thingJson);
      });
    });
    return jsonList;
  }
};
/*
{
    "gameId": 174988,
    "name": "4 en lettres",
    "image": "https://cf.geekdo-images.com/original/img/iUXg_HzqWycZknzJg03rWEdxZA0=/0x0/pic2454080.png",
    "thumbnail": "https://cf.geekdo-images.com/thumb/img/e0kVLmDfJfpfcpxwiP9TiZ_6HFU=/fit-in/200x150/pic2454080.png",
    "minPlayers": 1,
    "maxPlayers": 16,
    "playingTime": 15,
    "isExpansion": false,
    "yearPublished": 2014,
    "bggRating": 0.0,
    "averageRating": 6.15988,
    "rank": 16405,
    "numPlays": 0,
    "rating": -1.0,
    "owned": true,
    "preOrdered": false,
    "forTrade": false,
    "previousOwned": false,
    "want": false,
    "wantToPlay": false,
    "wantToBuy": false,
    "wishList": false,
    "userComment": ""
}
*/
