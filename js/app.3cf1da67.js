(function(e){function t(t){for(var s,i,c=t[0],o=t[1],l=t[2],h=0,m=[];h<c.length;h++)i=c[h],Object.prototype.hasOwnProperty.call(r,i)&&r[i]&&m.push(r[i][0]),r[i]=0;for(s in o)Object.prototype.hasOwnProperty.call(o,s)&&(e[s]=o[s]);u&&u(t);while(m.length)m.shift()();return n.push.apply(n,l||[]),a()}function a(){for(var e,t=0;t<n.length;t++){for(var a=n[t],s=!0,c=1;c<a.length;c++){var o=a[c];0!==r[o]&&(s=!1)}s&&(n.splice(t--,1),e=i(i.s=a[0]))}return e}var s={},r={app:0},n=[];function i(t){if(s[t])return s[t].exports;var a=s[t]={i:t,l:!1,exports:{}};return e[t].call(a.exports,a,a.exports,i),a.l=!0,a.exports}i.m=e,i.c=s,i.d=function(e,t,a){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(i.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var s in e)i.d(a,s,function(t){return e[t]}.bind(null,s));return a},i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="/my-bgg-list/";var c=window["webpackJsonp"]=window["webpackJsonp"]||[],o=c.push.bind(c);c.push=t,c=c.slice();for(var l=0;l<c.length;l++)t(c[l]);var u=o;n.push([0,"chunk-vendors"]),a()})({0:function(e,t,a){e.exports=a("56d7")},"03cb":function(e,t,a){e.exports=a.p+"img/filter.be94d2f3.png"},"047d":function(e,t,a){},1:function(e,t){},2:function(e,t){},2975:function(e,t,a){"use strict";var s=a("3f94"),r=a.n(s);r.a},3:function(e,t){},3673:function(e,t,a){},"3f94":function(e,t,a){},"4c26":function(e,t,a){e.exports=a.p+"img/order.097d77f4.png"},"544d":function(e,t,a){},"56d7":function(e,t,a){"use strict";a.r(t);a("cadf"),a("551c"),a("f751"),a("097d");var s=a("2b0e"),r=a("8c4f"),n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{attrs:{id:"app"}},[a("menuApp"),a("router-view")],1)},i=[],c=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("b-button-group",{staticClass:"button-group"},[a("router-link",{attrs:{to:"/games",tag:"b-button"}},[e._v("Mes jeux")]),a("router-link",{attrs:{to:"/lists",tag:"b-button"}},[e._v("Mes listes")]),a("router-link",{attrs:{to:"/sync",tag:"b-button"}},[e._v("Synchro")])],1)],1)},o=[],l={name:"menuApp"},u=l,h=(a("e644"),a("2877")),m=Object(h["a"])(u,c,o,!1,null,"751a017a",null),d=m.exports,g={name:"app",components:{menuApp:d}},f=g,b=(a("2975"),Object(h["a"])(f,n,i,!1,null,"65b354da",null)),p=b.exports,v=a("5f5b"),y=a("9483");Object(y["a"])("registerServiceWorker.js",{ready:function(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},registered:function(){console.log("Service worker has been registered.")},cached:function(){console.log("Content has been cached for offline use.")},updatefound:function(){console.log("New content is downloading.")},updated:function(){console.log("New content is available; please refresh.")},offline:function(){console.log("No internet connection found. App is running in offline mode.")},error:function(e){console.error("Error during service worker registration:",e)}});a("f9e3"),a("2dd8");var x=a("ce19"),_=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",[s("div",[s("h1",[e._v(e._s(e.listName)+" ("+e._s(e.filteredFullList.length)+")")]),s("b-container",{attrs:{fluid:""}},[s("b-row",{staticClass:"my-1"},[s("b-col",{attrs:{cols:"4"}},[s("b-form-select",{attrs:{options:e.options},model:{value:e.triColumn,callback:function(t){e.triColumn=t},expression:"triColumn"}})],1),s("b-col",{attrs:{cols:"2"}},[s("b-button",{attrs:{variant:"link"},on:{click:e.orderClass}},[s("img",{staticClass:"lazy icon rotating",class:e.ascOrder,attrs:{src:a("4c26"),alt:"tri"}})])],1),s("b-col",{attrs:{cols:"2"}},[s("b-button",{directives:[{name:"b-toggle",rawName:"v-b-toggle.gamesFilter",modifiers:{gamesFilter:!0}}],attrs:{variant:"link"}},[s("img",{staticClass:"lazy icon",attrs:{src:a("03cb"),alt:"filtres"}})])],1),s("b-col",{attrs:{cols:"2"}},[s("b-button",{directives:[{name:"b-toggle",rawName:"v-b-toggle.saveList",modifiers:{saveList:!0}}],attrs:{variant:"link"}},[s("img",{staticClass:"lazy icon",attrs:{src:a("a4fa"),alt:"enregistrer"}})])],1),s("b-col",{attrs:{cols:"2"}},[e.selectedGames.length<e.filteredFullList.length?s("b-button",{attrs:{variant:"link"},on:{click:e.selectAll}},[s("img",{staticClass:"lazy icon select",attrs:{src:a("aa42"),alt:"selectionner"}})]):e._e(),e.selectedGames.length===e.filteredFullList.length?s("b-button",{attrs:{variant:"link"},on:{click:e.selectAll}},[s("div",{staticClass:"select",attrs:{alt:"selectionner"}})]):e._e()],1),s("b-col")],1)],1)],1),s("div",[s("b-collapse",{staticClass:"mt-2",attrs:{id:"saveList"}},[s("b-form-group",{attrs:{id:"saveListName",description:"Nom de la liste à sauvegarder.","invalid-feedback":e.invalidFeedback,"valid-feedback":e.validFeedback,state:e.state}},[s("b-form-input",{attrs:{id:"input-list-name",trim:""},model:{value:e.saveListName,callback:function(t){e.saveListName=t},expression:"saveListName"}})],1),""!=e.savingMessage?s("b-alert",{attrs:{variant:"success",show:""}},[e._v(e._s(e.savingMessage))]):e._e(),s("div",{attrs:{id:"btn-save-div"}},[s("b-button",{attrs:{id:"btn-save",pill:"",disabled:!e.state,size:"sm",variant:"primary"},on:{click:e.save}},[e.saving?s("b-spinner",{attrs:{small:""}}):e._e(),e._v("  Enregistrer Sélection\n        ")],1)],1)],1)],1),s("b-collapse",{staticClass:"mt-2",attrs:{id:"gamesFilter"}},[s("search-games",{on:{search:e.updateSearch,"search-cancel":e.cancelSearch}})],1),e._l(e.displayedFilteredGameList,(function(t,a){return s("game",{key:t.gameId,attrs:{game:t,idx:a,mode:e.mode},on:{"game-selected-event":e.selectGame,"game-unselected-event":e.unselectGame}})})),s("infinite-loading",{ref:"infiniteLoading",on:{infinite:e.infiniteHandler}},[s("div",{attrs:{slot:"spinner"},slot:"spinner"},[e._v("Chargement...")]),s("div",{attrs:{slot:"no-more"},slot:"no-more"},[e._v("Pas d'autres résultats")]),s("div",{attrs:{slot:"no-results"},slot:"no-results"},[e._v("Pas d'autres résultats")])])],2)},M=[],O=(a("ac6a"),a("55dd"),a("20d6"),a("386d"),a("ebb6")),I={GAME_LIST_ID:"GAME_LIST",LIST_LIST_ID:"LISTS",SYNCED_ACCOUNT:"ACCOUNT"},T=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",[s("b-card",{staticClass:"game-card",class:e.isSelected,attrs:{title:e.game.name},on:{click:e.selectGame}},[s("b-container",{attrs:{fluid:""}},[s("b-row",{staticClass:"my-1"},[s("b-col",{attrs:{sm:"3"}},[s("img",{staticClass:"lazy",attrs:{src:e.game.thumbnail,alt:""}})]),s("b-col",{attrs:{sm:"4"}},[s("img",{staticClass:"lazy icon",attrs:{src:a("9bb7"),alt:"auteur(s)"}}),e._v(" "+e._s(e.authors)+"\n                ")]),s("b-col",{directives:[{name:"show",rawName:"v-show",value:e.game.artists.length>0,expression:"game.artists.length > 0"}],attrs:{sm:"4"}},[s("img",{staticClass:"lazy icon",attrs:{src:a("d97f"),alt:"illustrateur(s)"}}),e._v(" "+e._s(e.artists)+"\n                ")])],1),s("b-row",{staticClass:"my-1"},[s("b-col",{attrs:{sm:"3"}},[s("img",{staticClass:"lazy icon",attrs:{src:a("6361"),alt:"joueur(s)"}}),e._v(" "+e._s(e.nbPlayers)+"\n                ")]),s("b-col",{attrs:{sm:"4"}},[s("img",{staticClass:"lazy icon",attrs:{src:a("bcb9"),alt:"partie(s)"}}),e._v(" "+e._s(e.game.numPlays)+" partie(s)\n                ")]),s("b-col",{attrs:{sm:"2"}},[s("img",{staticClass:"lazy icon",attrs:{src:a("6700"),alt:"durée"}}),e._v(" "+e._s(e.game.playingTime)+"'\n                ")]),s("b-col",{directives:[{name:"show",rawName:"v-show",value:e.game.rating>=0,expression:"game.rating >= 0"}],attrs:{sm:"2"}},[e._v("\n                    "+e._s(e.game.rating)+"/10\n                ")])],1)],1)],1)],1)},L=[],k=(a("c5f6"),{name:"game",props:{game:{},idx:Number,mode:String},data:function(){return{selected:0,checkboxId:""}},mounted:function(){this.checkboxId="checkbox-"+this.idx},computed:{isEditable:function(){return"EDIT"===this.mode},authors:function(){return this.game.authors.join(", ")},artists:function(){return this.game.artists.join(", ")},nbPlayers:function(){var e="";return this.game.minPlayers!==this.game.maxPlayers?e+=this.game.minPlayers+" à "+this.game.maxPlayers+" joueur(s)":e+=this.game.minPlayers+" joueur(s)",e},isSelected:function(){return{isSelected:"EDIT"===this.mode&&"check"===this.game.selected}}},methods:{select:function(e){"check"===e?this.$emit("game-selected-event",this.idx,this.game):this.$emit("game-unselected-event",this.idx,this.game)},selectGame:function(){"check"===this.game.selected?(this.game.selected="uncheck",this.$emit("game-unselected-event",this.game)):(this.game.selected="check",this.$emit("game-selected-event",this.game))}}}),S=k,j=(a("e286"),Object(h["a"])(S,T,L,!1,null,"0415337e",null)),N=j.exports,C=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",[s("b-card",[s("b-container",{attrs:{fluid:""}},[s("b-row",{staticClass:"my-1"},[s("b-col",{attrs:{sm:"4"}},[s("b-form-input",{attrs:{id:"search-titre",type:"text",placeholder:"Titre",size:"sm"},model:{value:e.searchObj.searchTitre,callback:function(t){e.$set(e.searchObj,"searchTitre","string"===typeof t?t.trim():t)},expression:"searchObj.searchTitre"}})],1)],1),s("b-row",{staticClass:"my-1"},[s("b-col",{attrs:{sm:"4"}},[s("b-form-input",{attrs:{id:"search-auteur",type:"text",placeholder:"Auteur",size:"sm"},model:{value:e.searchObj.searchAuteur,callback:function(t){e.$set(e.searchObj,"searchAuteur","string"===typeof t?t.trim():t)},expression:"searchObj.searchAuteur"}})],1),s("b-col",{attrs:{sm:"3"}},[s("b-form-input",{attrs:{id:"search-nbPartiesMin",type:"number",placeholder:"Parties min",size:"sm"},model:{value:e.searchObj.searchPlayedMin,callback:function(t){e.$set(e.searchObj,"searchPlayedMin",e._n(t))},expression:"searchObj.searchPlayedMin"}})],1),s("b-col",{attrs:{sm:"3"}},[s("b-form-input",{attrs:{id:"search-nbPartiesMax",type:"number",placeholder:"Parties max",size:"sm"},model:{value:e.searchObj.searchPlayedMax,callback:function(t){e.$set(e.searchObj,"searchPlayedMax",e._n(t))},expression:"searchObj.searchPlayedMax"}})],1)],1),s("b-row",{staticClass:"my-1"},[s("b-col",{attrs:{sm:"4"}},[s("b-form-input",{attrs:{id:"search-illustrateur",type:"text",placeholder:"Illustrateur",size:"sm"},model:{value:e.searchObj.searchIllustrateur,callback:function(t){e.$set(e.searchObj,"searchIllustrateur","string"===typeof t?t.trim():t)},expression:"searchObj.searchIllustrateur"}})],1),s("b-col",{attrs:{sm:"3"}},[s("b-form-input",{attrs:{id:"search-duree-min",type:"number",placeholder:"Durée min",size:"sm"},model:{value:e.searchObj.searchDureeMin,callback:function(t){e.$set(e.searchObj,"searchDureeMin",e._n(t))},expression:"searchObj.searchDureeMin"}})],1),s("b-col",{attrs:{sm:"3"}},[s("b-form-input",{attrs:{id:"search-duree-max",type:"number",placeholder:"Durée max",size:"sm"},model:{value:e.searchObj.searchDureeMax,callback:function(t){e.$set(e.searchObj,"searchDureeMax",e._n(t))},expression:"searchObj.searchDureeMax"}})],1)],1),s("b-row",{staticClass:"my-1"},[s("b-col",{attrs:{sm:"4"}},[s("b-form-input",{attrs:{id:"search-nbJoueur",type:"number",placeholder:"Nb Joueurs",size:"sm"},model:{value:e.searchObj.searchPlayer,callback:function(t){e.$set(e.searchObj,"searchPlayer",e._n(t))},expression:"searchObj.searchPlayer"}})],1),s("b-col",{attrs:{sm:"3"}},[s("b-form-input",{attrs:{id:"search-note-min",type:"number",placeholder:"Note min",size:"sm"},model:{value:e.searchObj.searchNoteMin,callback:function(t){e.$set(e.searchObj,"searchNoteMin",e._n(t))},expression:"searchObj.searchNoteMin"}})],1),s("b-col",{attrs:{sm:"3"}},[s("b-form-input",{attrs:{id:"search-note-max",type:"number",placeholder:"Note max",size:"sm"},model:{value:e.searchObj.searchNoteMax,callback:function(t){e.$set(e.searchObj,"searchNoteMax",e._n(t))},expression:"searchObj.searchNoteMax"}})],1)],1),s("b-row",{staticClass:"my-1"}),s("b-row",{staticClass:"my-1"},[s("b-button",{staticClass:"search",attrs:{pill:"",variant:"outline-dark"},on:{click:e.emitFilters}},[s("img",{staticClass:"lazy icon",attrs:{src:a("03cb"),alt:"recherche"}})]),s("b-button",{staticClass:"search",attrs:{pill:"",variant:"outline-dark"},on:{click:e.cancelSearch}},[s("img",{staticClass:"lazy icon",attrs:{src:a("57e6"),alt:"vider les filtres"}})])],1)],1)],1)],1)},P=[],G={name:"triGames",data:function(){return{searchObj:{searchDureeMax:"",searchDureeMin:"",searchNoteMin:"",searchNoteMax:"",searchPlayer:"",searchPlayedMin:"",searchPlayedMax:"",searchAuteur:"",searchIllustrateur:"",searchTitre:""}}},subscriptions:function(){var e=this;return{inputKeyup:this.$fromDOMEvent("input","keyup").pipe(Object(O["a"])((function(){return e.emitFilters()}))),inputChange:this.$fromDOMEvent("input","change").pipe(Object(O["a"])((function(){return e.emitFilters()})))}},methods:{cancelSearch:function(){this.searchObj={searchDureeMax:"",searchDureeMin:"",searchNoteMin:"",searchNoteMax:"",searchPlayer:"",searchPlayedMin:"",searchPlayedMax:"",searchAuteur:"",searchIllustrateur:"",searchTitre:""},this.$emit("search-cancel",this.searchObj)},emitFilters:function(){this.$emit("search",this.searchObj)}}},D=G,$=(a("d412"),Object(h["a"])(D,C,P,!1,null,"937cd356",null)),w=$.exports,E=a("e166"),A=a.n(E),F=(a("7f7f"),a("6762"),a("2fdb"),{filter:function(e,t){var a=e;return""!==t.searchPlayer&&(a=this.searchNbPlayer(a,t.searchPlayer)),""!==t.searchNoteMin&&(a=this.searchNotationMini(a,t.searchNoteMin)),""!==t.searchNoteMax&&(a=this.searchNotationMaxi(a,t.searchNoteMax)),""!==t.searchDureeMax&&(a=this.searchDureeMaxi(a,t.searchDureeMax)),""!==t.searchDureeMin&&(a=this.searchDureeMini(a,t.searchDureeMin)),""!==t.searchPlayedMin&&(a=this.searchPlayedGameMini(a,t.searchPlayedMin)),""!==t.searchPlayedMax&&(a=this.searchPlayedGameMaxi(a,t.searchPlayedMax)),""!==t.searchAuteur&&(a=this.searchDesigner(a,t.searchAuteur)),""!==t.searchIllustrateur&&(a=this.searchIllustrator(a,t.searchIllustrateur)),""!==t.searchTitre&&(a=this.searchTitle(a,t.searchTitre)),a},searchNbPlayer:function(e,t){return e.filter((function(e){return e.minPlayers<=t&&e.maxPlayers>=t}))},searchDureeMaxi:function(e,t){return e.filter((function(e){return e.playingTime<=t}))},searchDureeMini:function(e,t){return e.filter((function(e){return e.playingTime>=t}))},searchNotationMini:function(e,t){var a=arguments.length>2&&void 0!==arguments[2]&&arguments[2];return e.filter((function(e){return a?e.rating==t:e.rating>=t}))},searchNotationMaxi:function(e,t){var a=arguments.length>2&&void 0!==arguments[2]&&arguments[2];return e.filter((function(e){return a?e.rating==t:e.rating<=t}))},searchPlayedGameMini:function(e,t){return e.filter((function(e){return e.numPlays>=t}))},searchPlayedGameMaxi:function(e,t){return e.filter((function(e){return e.numPlays<=t}))},searchDesigner:function(e,t){return e.filter((function(e){return e.authors.join(", ").toLowerCase().includes(t)}))},searchIllustrator:function(e,t){return e.filter((function(e){return e.artists.join(", ").toLowerCase().includes(t)}))},searchTitle:function(e,t){return e.filter((function(e){return e.name.toLowerCase().includes(t)}))}}),z=20,J={name:"games",components:{game:N,InfiniteLoading:A.a,searchGames:w},subscriptions:function(){var e=this;return{triColumnObs:this.$watchAsObservable("triColumn").pipe(Object(O["a"])((function(){e.orderGames(),e.search()})))}},mounted:function(){this.fetchData()},data:function(){return{gameList:[],displayedGameList:[],displayedFilteredGameList:[],filteredFullList:[],selectedGames:[],saveListName:"",mode:"EDIT",saving:!1,savingMessage:"",searchObj:{searchDureeMax:"",searchDureeMin:"",searchNoteMin:"",searchNoteMax:"",searchPlayer:"",searchPlayedMin:"",searchPlayedMax:"",searchAuteur:"",searchIllustrateur:"",searchTitre:""},order:"ASC",options:[{value:"DUREE",text:"Durée",objName:"playingTime",searchType:"int",nullable:!0},{value:"JOUEUR_MIN",text:"Joueur min",objName:"minPlayers",searchType:"int",nullable:!1},{value:"JOUEUR_MAX",text:"Joueur max",objName:"maxPlayers",searchType:"int",nullable:!1},{value:"NOTE",text:"Note",objName:"rating",searchType:"int",nullable:!0},{value:"PARTIE",text:"Partie",objName:"numPlays",searchType:"int",nullable:!1},{value:"TITRE",text:"Titre",objName:"name",searchType:"text",nullable:!1}],triColumn:"TITRE"}},computed:{listName:function(){var e=this.$router.params?this.$router.params.list:I.GAME_LIST_ID;return e===I.GAME_LIST_ID?"Liste des jeux":"Nom de la liste"},state:function(){return this.saveListName.length>0},invalidFeedback:function(){return this.saveListName.length,""},validFeedback:function(){return this.state,""},ascOrder:function(){return{rotatingOrderAsc:"ASC"===this.order}}},methods:{fetchData:function(){var e=this.$router.params?this.$router.params.list:I.GAME_LIST_ID;this.gameList=this.getFromStorage(e),null===this.gameList&&(this.gameList=[]),this.filteredFullList=this.gameList,this.displayedGameList=this.gameList.length>0?this.gameList.slice(0,z):[],this.search()},selectGame:function(e){this.selectedGames.push(e.gameId)},unselectGame:function(e){var t=this.selectedGames.findIndex((function(t){return t===e.gameId}));t>=0&&this.selectedGames.splice(t,1)},save:function(){var e=this;this.saving=!0;var t=this.getFromStorage(I.LIST_LIST_ID);null===t&&(t=[]);var a={id:Date.now(),name:this.saveListName,list:this.selectedGames};t.push(a),localStorage.setItem(I.LIST_LIST_ID,JSON.stringify(t)),this.savingMessage="Liste enregistrée.",setTimeout((function(){e.$root.$emit("bv::toggle::collapse","saveList"),e.saving=!1,e.savingMessage=""}),1e3)},getFromStorage:function(e){var t=null;if(localStorage.getItem(e))try{t=JSON.parse(localStorage.getItem(e))}catch(a){localStorage.removeItem(e)}return t},infiniteHandler:function(e){this.displayedFilteredGameList.length!==this.filteredFullList.length?(this.search(),this.displayedFilteredGameList=this.filteredFullList.slice(0,this.displayedFilteredGameList.length+z),e.loaded()):e.complete()},cancelSearch:function(){this.searchObj={searchDureeMax:"",searchDureeMin:"",searchNoteMin:"",searchNoteMax:"",searchPlayer:"",searchPlayedMin:"",searchPlayedMax:"",searchAuteur:"",searchIllustrateur:"",searchTitre:""},this.filteredFullList=this.gameList,this.displayedFilteredGameList=this.gameList.slice(0,z),this.$refs.infiniteLoading&&this.$refs.infiniteLoading.stateChanger.reset()},search:function(){var e=F.filter(this.gameList,this.searchObj);return this.filteredFullList=e,this.displayedFilteredGameList=this.filteredFullList.slice(0,this.displayedFilteredGameList.length),this.$refs.infiniteLoading&&this.$refs.infiniteLoading.stateChanger.reset(),e},updateSearch:function(e,t){this.searchObj=e,this.search(t)},orderGames:function(){var e=-1,t=1,a=this.order,s=this.triColumn,r=this.options.filter((function(e){return e.value===s})),n="name",i="string;";r.length>0&&(n=r[0].objName,i=r[0].searchType),this.gameList.sort((function(s,r){var c=s[n],o=r[n];switch("rating"===n&&(c="N/A"===c?-1:c,o="N/A"===o?-1:o),i){case"string":c=c.toLowerCase(),o=o.toLowerCase();break;case"int":c=parseInt(c,10),o=parseInt(o,10);break;default:break}return"ASC"===a?c<=o?e:t:c>=o?e:t}))},orderClass:function(){"ASC"===this.order?this.order="DESC":this.order="ASC",this.orderGames(),this.search()},selectAll:function(){var e=[],t=this.selectedGames.length<this.filteredFullList.length;this.filteredFullList.forEach((function(a){t?(e.push(a.gameId),a.selected="check"):a.selected="uncheck"})),this.selectedGames=e}}},R=J,B=(a("7ccc"),Object(h["a"])(R,_,M,!1,null,"be51e9e8",null)),U=B.exports,X=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",e._l(e.lists,(function(e){return a("list-game",{key:e.id,attrs:{liste:e}})})),1)},Y=[],H=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("b-card",[e._v("\n        "+e._s(e.liste.name)+" ("+e._s(e.liste.list.length)+")\n        "),a("b-button",{directives:[{name:"b-toggle",rawName:"v-b-toggle",value:e.collapseId,expression:"collapseId"}],attrs:{variant:"primary"}},[e._v("Détails")]),a("b-collapse",{staticClass:"mt-2",attrs:{id:e.collapseId}},[a("b-card",e._l(e.liste.list,(function(t,s){return a("game",{key:t.gameId,attrs:{game:t,idx:s,mode:e.mode}})})),1)],1)],1)],1)},q=[],K={name:"liste",components:{game:N},props:{liste:{}},data:function(){return{lists:[],mode:"LECTURE"}},computed:{collapseId:function(){return"collapse-"+this.liste.id}}},W=K,Q=Object(h["a"])(W,H,q,!1,null,"7f084838",null),V=Q.exports,Z={name:"lists",components:{listGame:V},data:function(){return{lists:[]}},mounted:function(){this.fetchData()},methods:{fetchData:function(){var e=this.getFromStorage(I.LIST_LIST_ID);null===e&&(e=[]);var t=this.getFromStorage(I.GAME_LIST_ID);null===t&&(t=[]),e.forEach((function(e){var a=t.filter((function(t){return e.list.includes(t.gameId)}));e.list=a})),this.lists=e},getFromStorage:function(e){var t=null;if(localStorage.getItem(e))try{t=JSON.parse(localStorage.getItem(e))}catch(a){localStorage.removeItem(e)}return t}}},ee=Z,te=Object(h["a"])(ee,X,Y,!1,null,"283c64c0",null),ae=te.exports,se=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("b-form-group",{attrs:{id:"bggName",description:"Nom du compte BGG à synchroniser.",label:"Compte BGG","label-for":"input-bgg-name","invalid-feedback":e.invalidFeedback,"valid-feedback":e.validFeedback,state:e.state}},[a("b-form-input",{attrs:{id:"input-bgg-name",trim:""},model:{value:e.name,callback:function(t){e.name=t},expression:"name"}})],1),a("div",{attrs:{id:"btn-sync-div"}},[a("b-button",{attrs:{id:"btn-sync",disabled:!e.state,variant:"outline-primary"},on:{click:e.synchronizationXMLObservable}},[e.loading?a("b-spinner",{attrs:{small:""}}):e._e(),e._v("  Synchroniser !\n    ")],1)],1)],1)},re=[],ne={arrayGameMerge:function(e,t){var a=[];return e.forEach((function(e){var s=e.gameId;e.selected="uncheck";var r=t.filter((function(e){return s===e.gameId}));r.length>0&&(r=r[0],e.isExpansion=r.isExpansion,e.bggRating=r.bggRating,e.averageRating=r.averageRating,e.rank=r.rank,e.authors=r.authors,e.artists=r.artists,e.publishers=r.publishers),a.push(e)})),a}},ie=(a("96cf"),a("3b8d")),ce=a("bc3a"),oe=a.n(ce),le=a("e9b9"),ue=a("3e18"),he=(a("b54a"),a("083c")),me=a.n(he),de=me.a.parseString,ge={convertCollectionToJson:function(e){var t=[];return de(e,(function(e,a){a.items.item.forEach((function(e){var a={};a.gameId=e.$.objectid,a.name=e.name[0]._,a.image=e.image[0],a.thumbnail=e.thumbnail[0],a.minPlayers=e.stats[0].$.minplayers,a.minPlayTime=e.stats[0].$.minplaytime,a.maxPlayers=e.stats[0].$.maxplayers,a.maxPlayTime=e.stats[0].$.maxplaytime,a.playingTime=e.stats[0].$.playingtime,a.isExpansion=-1,a.yearPublished=e.yearpublished?e.yearpublished[0]:0,a.bggRating=-1,a.averageRating=-1,a.rank=-1,a.numPlays=e.numplays[0],a.rating=e.stats[0].rating[0].$.value,a.owned=e.status[0].$.own,a.preOrdered=-1,a.forTrade=-1,a.previousOwned=-1,a.subtype=e.$.subtype,a.want=-1,a.wantToPlay=-1,a.wantToBuy=-1,a.wishList=-1,a.userComment=-1,t.push(a)}))})),t},convertThingsToJson:function(e){var t=[];return de(e,(function(e,a){a.items.item.forEach((function(e){var a={};a.gameId=e.$.id,a.isExpansion=-1,a.bggRating=-1,a.averageRating=e.statistics[0].ratings[0].average[0].$.value;var s=e.statistics[0].ratings[0].ranks[0].rank.filter((function(e){return 1==e.$.id}));a.rank=s[0].$.value;var r="boardgamedesigner",n="boardgameartist",i="boardgamepublisher",c=[],o=[],l=[];e.link.forEach((function(e){var t=e.$.type;switch(t){case r:c.push(e.$.value);break;case n:o.push(e.$.value);break;case i:l.push(e.$.value);break;default:break}})),a.authors=c,a.artists=o,a.publishers=l,t.push(a)}))})),t}},fe={sync:function(e){return oe.a.get("https://bgg-json.azurewebsites.net/collection/"+e).then((function(e){return e.data}))},syncBGG:function(e){var t=this;return oe.a.get("https://api.geekdo.com/xmlapi2/collection?username="+e+"&stats=1").then(function(){var e=Object(ie["a"])(regeneratorRuntime.mark((function e(a){var s,r,n,i,c;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return s=ge.convertCollectionToJson(a.data),r=[],n="",s.forEach((function(e){n+=e.gameId+","})),e.next=6,t.getBggThing(n);case 6:return i=e.sent,c=ge.convertThingsToJson(i),r=ne.arrayGameMerge(s,c),e.abrupt("return",r);case 10:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())},getBggThing:function(e){return oe.a.get("https://api.geekdo.com/xmlapi2/thing?id="+e+"&stats=1").then((function(e){return e.data}))},syncBGGObservable:function(e){return le["a"].create((function(t){oe.a.get("https://api.geekdo.com/xmlapi2/collection?username="+e+"&stats=1").then((function(e){t.next(e.data),t.complete()})).catch((function(e){t.error(e)}))}))},getBggThingObservable:function(e){return le["a"].create((function(t){oe.a.get("https://api.geekdo.com/xmlapi2/thing?id="+e+"&stats=1").then((function(e){t.next(e.data),t.complete()})).catch((function(e){t.error(e)}))}))},bggSync:function(e){var t=this;return this.syncBGGObservable(e).pipe(Object(ue["a"])((function(e){var a=ge.convertCollectionToJson(e),s="";return a.forEach((function(e){s+=e.gameId+","})),t.getBggThingObservable(s).pipe(Object(O["a"])((function(e){var t=ge.convertThingsToJson(e),s=[];return s=ne.arrayGameMerge(a,t),s})))})))}},be={name:"sync",computed:{state:function(){return this.name.length>0},invalidFeedback:function(){return 0===this.name.length?"Merci de saisir un nom de compte.":""},validFeedback:function(){return!0===this.state?"Merci":""}},data:function(){return{name:localStorage.getItem(I.SYNCED_ACCOUNT)?localStorage.getItem(I.SYNCED_ACCOUNT):"",loading:!1}},methods:{synchronization:function(){var e=this;fe.sync(this.name).then((function(t){localStorage.setItem(I.GAME_LIST_ID,JSON.stringify(t)),e.$router.push({name:"games",params:{list:I.GAME_LIST_ID}})}))},synchronizationXML:function(){var e=this;fe.syncBGG(this.name).then((function(t){localStorage.setItem(I.GAME_LIST_ID,JSON.stringify(t)),e.$router.push({name:"games",params:{list:I.GAME_LIST_ID}})}))},synchronizationXMLObservableOld:function(){var e=this;fe.syncBGGObservable(this.name).subscribe({next:function(t){var a=ge.convertCollectionToJson(t),s=[],r="";a.forEach((function(e){r+=e.gameId+","})),fe.getBggThingObservable(r).subscribe({next:function(t){var r=ge.convertThingsToJson(t);s=ne.arrayGameMerge(a,r),localStorage.setItem(I.GAME_LIST_ID,JSON.stringify(s)),e.$router.push({name:"games",params:{list:I.GAME_LIST_ID}})},complete:function(){}})},complete:function(){}})},synchronizationXMLObservable:function(){this.loading=!0;var e=this,t=this.name;fe.bggSync(t).subscribe({next:function(e){localStorage.setItem(I.GAME_LIST_ID,JSON.stringify(e))},complete:function(){localStorage.setItem(I.SYNCED_ACCOUNT,t),e.loading=!1,e.$router.push({name:"games",params:{list:I.GAME_LIST_ID}})}})}}},pe=be,ve=(a("d2ac"),Object(h["a"])(pe,se,re,!1,null,"60efda2a",null)),ye=ve.exports;s["default"].use(x["a"]),s["default"].use(v["a"]),s["default"].use(r["a"]),s["default"].config.productionTip=!1;var xe=[{path:"/",component:U},{path:"/games/:list?",name:"games",component:U},{path:"/lists",component:ae},{path:"/sync",component:ye}],_e=new r["a"]({routes:xe});new s["default"]({render:function(e){return e(p)},router:_e}).$mount("#app")},"57e6":function(e,t,a){e.exports=a.p+"img/annuler.b06f31df.png"},6361:function(e,t,a){e.exports=a.p+"img/player.21d07ade.png"},6700:function(e,t,a){e.exports=a.p+"img/duration.e0c7c5ce.png"},"7ccc":function(e,t,a){"use strict";var s=a("047d"),r=a.n(s);r.a},"9bb7":function(e,t,a){e.exports=a.p+"img/author.ad3c9f7e.png"},a4fa:function(e,t,a){e.exports=a.p+"img/save.7d1a839d.png"},a804:function(e,t,a){},aa42:function(e,t,a){e.exports=a.p+"img/select.3f0c1bdb.png"},bcb9:function(e,t,a){e.exports=a.p+"img/gameplayed.c6083c0f.png"},d2ac:function(e,t,a){"use strict";var s=a("3673"),r=a.n(s);r.a},d412:function(e,t,a){"use strict";var s=a("d639"),r=a.n(s);r.a},d639:function(e,t,a){},d97f:function(e,t,a){e.exports=a.p+"img/illustrator.180faa14.png"},e286:function(e,t,a){"use strict";var s=a("544d"),r=a.n(s);r.a},e644:function(e,t,a){"use strict";var s=a("a804"),r=a.n(s);r.a}});
//# sourceMappingURL=app.3cf1da67.js.map