(function(t){function e(e){for(var o,a,s=e[0],c=e[1],l=e[2],p=0,d=[];p<s.length;p++)a=s[p],Object.prototype.hasOwnProperty.call(i,a)&&i[a]&&d.push(i[a][0]),i[a]=0;for(o in c)Object.prototype.hasOwnProperty.call(c,o)&&(t[o]=c[o]);u&&u(e);while(d.length)d.shift()();return n.push.apply(n,l||[]),r()}function r(){for(var t,e=0;e<n.length;e++){for(var r=n[e],o=!0,s=1;s<r.length;s++){var c=r[s];0!==i[c]&&(o=!1)}o&&(n.splice(e--,1),t=a(a.s=r[0]))}return t}var o={},i={app:0},n=[];function a(e){if(o[e])return o[e].exports;var r=o[e]={i:e,l:!1,exports:{}};return t[e].call(r.exports,r,r.exports,a),r.l=!0,r.exports}a.m=t,a.c=o,a.d=function(t,e,r){a.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},a.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},a.t=function(t,e){if(1&e&&(t=a(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(a.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)a.d(r,o,function(e){return t[e]}.bind(null,o));return r},a.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return a.d(e,"a",e),e},a.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},a.p="/";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],c=s.push.bind(s);s.push=e,s=s.slice();for(var l=0;l<s.length;l++)e(s[l]);var u=c;n.push([0,"chunk-vendors"]),r()})({0:function(t,e,r){t.exports=r("56d7")},"56d7":function(t,e,r){"use strict";r.r(e);r("e260"),r("e6cf"),r("cca6"),r("a79d");var o=r("2b0e"),i=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("v-app",[r("v-app-bar",{attrs:{app:"",color:"primary",dark:""}},[r("div",{staticClass:"d-flex align-center"},[r("h1",[t._v(" Monopoly Online ")])]),r("v-spacer"),t.userName?t._e():r("v-btn",{attrs:{href:"http://localhost:8080/login",text:""}},[r("span",{staticClass:"mr-2"},[t._v("Вход")]),r("v-icon",[t._v("mdi-open-in-new")])],1)],1),r("v-main",{staticStyle:{"background-color":"rgb(242, 242, 242)"}},[r("router-view")],1)],1)},n=[],a=r("1da1"),s=(r("96cf"),r("b0c0"),{name:"App",data:function(){return{userName:null}},methods:{isLogged:function(){var t=this;return Object(a["a"])(regeneratorRuntime.mark((function e(){var r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.axios.get("/profile");case 2:r=e.sent,t.userName=r.data.name;case 4:case"end":return e.stop()}}),e)})))()}},created:function(){this.isLogged()}}),c=s,l=r("2877"),u=r("6544"),p=r.n(u),d=r("7496"),m=r("40dc"),v=r("8336"),h=r("132d"),f=r("f6c4"),g=r("2fa4"),b=Object(l["a"])(c,i,n,!1,null,null,null),y=b.exports;p()(b,{VApp:d["a"],VAppBar:m["a"],VBtn:v["a"],VIcon:h["a"],VMain:f["a"],VSpacer:g["a"]});var w=r("8c4f"),x=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("v-row",[r("v-col",[t.userName?r("div",[r("v-container",[r("br"),r("v-row",[r("v-col",{attrs:{cols:"3"}},[r("v-card",{attrs:{elevation:"3"}},[r("v-card-title",{staticClass:"justify-center",staticStyle:{width:"100%"}},[t._v(" Создать комнату ")]),r("v-form",{attrs:{disabled:t.currentRoom}},[r("v-text-field",{staticClass:"mx-auto",staticStyle:{width:"80%"},attrs:{counter:20,label:"Название",required:""},model:{value:t.newRoomName,callback:function(e){t.newRoomName=e},expression:"newRoomName"}}),r("v-select",{staticClass:"mx-auto",staticStyle:{width:"80%"},attrs:{items:[2,3,4],label:"Кол-во игроков",required:""},model:{value:t.playersNumber,callback:function(e){t.playersNumber=e},expression:"playersNumber"}}),r("br"),t.currentRoom?t._e():r("v-btn",{staticClass:"mr-4",attrs:{width:"100%",color:"blue",dark:""},on:{click:t.createRoom}},[r("b",[t._v("Создать")])])],1)],1)],1),r("v-col",{attrs:{cols:"6"}},[r("v-card",{attrs:{elevation:"3"}},[r("v-card-title",{staticClass:"justify-center",staticStyle:{width:"100%"}},[t._v(" Ожидают игры ")]),r("v-list",t._l(t.rooms,(function(e){return r("v-list-item",{key:e.id,staticClass:"pa-2"},[r("v-card",{staticStyle:{"background-color":"#d7e7f7"},attrs:{width:"100%",elevation:"0"}},[r("v-row",[r("v-col",[r("v-card-title",[t._v(" "+t._s(e.name)+" ")])],1),r("v-col",[r("v-btn",{staticClass:"mr-4 py-5 my-4",staticStyle:{float:"right"},attrs:{color:"blue",dark:!t.currentRoom,disabled:t.currentRoom},on:{click:function(r){return t.joinRoom(e.id)}}},[r("b",[t._v("Присоедениться")])])],1)],1)],1)],1)})),1)],1)],1),r("v-col",{staticStyle:{"max-width":"300px"},attrs:{cols:"3"}},[r("v-card",{attrs:{elevation:"3"}},[r("v-card-title",{staticClass:"justify-center",staticStyle:{width:"100%"}},[t._v(" Профиль ")]),r("v-list",[r("v-list-item",[r("v-list-item-title",[r("b",[t._v("Имя:")]),t._v(" "+t._s(t.userName)+" ")])],1),r("v-list-item",[r("v-list-item-title",[r("b",[t._v("Всего игр:")]),t._v(" "+t._s(t.totalGames)+" ")])],1),r("v-list-item",[r("v-list-item-title",[r("b",[t._v("Побед:")]),t._v(" "+t._s(t.totalWins)+" ")])],1),r("v-list-item",[r("v-list-item-title",[r("b",[t._v("Поражений:")]),t._v(" "+t._s(t.totalLoses)+" ")])],1),r("v-list-item",[r("v-btn",{staticClass:"mr-4",attrs:{width:"100%",color:"blue",dark:"",disabled:!t.currentRoom},on:{click:function(e){return t.$router.push("/game")}}},[r("b",[t._v("Текущая игра")])])],1)],1)],1)],1)],1)],1)],1):r("div",[r("v-container",[r("v-card",{staticClass:"mx-auto my-1",staticStyle:{"background-color":"rgb(242, 242, 242)"},attrs:{width:"500px",elevation:"0"}},[r("h1",[t._v("Пожалуйста, водите в систему")])])],1)],1)])],1)},_=[],P={name:"Main",data:function(){return{userName:null,rooms:null,currentRoom:null,totalGames:null,totalWins:null,totalLoses:null,newRoomName:"",playersNumber:2}},methods:{isLogged:function(){var t=this;return Object(a["a"])(regeneratorRuntime.mark((function e(){var r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.axios.get("/profile");case 2:r=e.sent,t.userName=r.data.name,t.currentRoom=r.data.currentRoom,t.totalGames=r.data.totalGames,t.totalLoses=r.data.totalLoses,t.totalWins=r.data.totalWins,r.data.name&&t.getRooms();case 9:case"end":return e.stop()}}),e)})))()},getRooms:function(){var t=this;return Object(a["a"])(regeneratorRuntime.mark((function e(){var r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.axios.get("/room");case 2:r=e.sent,t.rooms=r.data;case 4:case"end":return e.stop()}}),e)})))()},createRoom:function(){var t=this;return Object(a["a"])(regeneratorRuntime.mark((function e(){var r,o;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.axios.post("/room",{name:t.newRoomName,playersNumber:t.playersNumber});case 2:r=e.sent,200===r.status&&(o=r.data.id,t.currentRoom=o,t.joinRoom(o));case 4:case"end":return e.stop()}}),e)})))()},joinRoom:function(t){var e=this;return Object(a["a"])(regeneratorRuntime.mark((function r(){var o,i,n;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.next=2,e.axios.put("/profile",{currentRoom:t});case 2:if(o=r.sent,200!==o.status){r.next=17;break}return r.next=6,e.axios.post("/user_to_room",{id:t});case 6:return r.next=8,e.axios.get("/room/".concat(t));case 8:return i=r.sent,r.next=11,e.axios.get("/user_to_room");case 11:if(n=r.sent,i.data.playersNumber!==n.data.length){r.next=15;break}return r.next=15,e.axios.put("/room/".concat(t));case 15:return r.next=17,e.$router.push("/game");case 17:case"end":return r.stop()}}),r)})))()}},created:function(){this.isLogged()}},k=P,R=r("b0af"),C=r("99d9"),S=r("62ad"),V=r("a523"),j=r("4bd4"),O=r("8860"),N=r("da13"),T=r("5d23"),L=r("0fd9"),M=r("b974"),$=r("8654"),I=Object(l["a"])(k,x,_,!1,null,null,null),G=I.exports;p()(I,{VBtn:v["a"],VCard:R["a"],VCardTitle:C["c"],VCol:S["a"],VContainer:V["a"],VForm:j["a"],VList:O["a"],VListItem:N["a"],VListItemTitle:T["b"],VRow:L["a"],VSelect:M["a"],VTextField:$["a"]});var B=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("v-row",{staticClass:"my-12",staticStyle:{"min-width":"2000px"}},[r("v-col",{staticClass:"mx-auto pr-12",attrs:{cols:"2"}},[r("div",{staticStyle:{height:"750px"}},[r("v-list",{staticClass:"mx-5",staticStyle:{"background-color":"rgb(242, 242, 242)"}},t._l(t.users,(function(e){return r("v-list-item",{key:e.id},[r("v-card",{staticClass:"my-4",attrs:{height:"150px",width:"180px"}},[r("v-card-title",[t._v(" "+t._s(e.user.name)+" ")]),r("v-card-subtitle",{staticClass:"my-auto"},[r("b",[t._v("Баланс: "+t._s(e.money)+"$")])]),e.isYourTurn?r("v-card-text",{staticStyle:{color:"indianred"}},[r("b",[t._v(" Ходит ")])]):t._e()],1)],1)})),1)],1)]),r("v-col",{staticStyle:{"max-width":"1050px","margin-right":"100px"},attrs:{cols:"7"}},[r("v-row",{staticClass:"my-0 mx-0",staticStyle:{width:"1000px",height:"750px"}},t._l(t.properties,(function(e){return r("v-col",{key:e.mapPosition,staticClass:"pa-0",staticStyle:{height:"125px"},attrs:{cols:"2"}},[-1!==e.position?r("v-col",{staticClass:"pa-0",staticStyle:{border:"2px solid black",width:"100%",height:"100%"}},[r("v-card",{attrs:{dark:"",color:e.color,width:"100%",height:"100%",rounded:"0",elevation:"0"}},[r("v-card-title",[r("b",[t._v(t._s(e.name))])]),r("v-card-subtitle",[r("b",[t._v(t._s(e.owner))])]),e.owner?r("v-card-text",[r("b",[t._v("Штраф: "+t._s(e.price/2)+"$")])]):r("v-card-text",[0===e.position?r("b",[t._v(t._s(e.price)+"$")]):r("b",[t._v("Цена: "+t._s(e.price)+"$")])])],1)],1):r("v-col",{staticClass:"pa-0",staticStyle:{width:"100%",height:"100%"}},[r("v-card",{attrs:{dark:"",color:e.color,width:"100%",height:"100%",rounded:"0",elevation:"0"}})],1)],1)})),1)],1),t.isStarted?r("v-col",{staticClass:"pa-0",staticStyle:{"margin-right":"150px"},attrs:{cols:"2"}},[t.yourTurn?r("div",{staticStyle:{height:"750px"}},[r("v-row",{staticClass:"my-12"},[r("v-col",{attrs:{cols:"12"}},[r("v-btn",{attrs:{depressed:"",color:"primary",width:"100%",height:"60px"},on:{click:function(e){return t.move()}}},[r("h3",[t._v("Сделать ход ")])])],1),r("v-col",{attrs:{cols:"12"}},[t.yourProperty?r("v-btn",{attrs:{depressed:"",color:"error",width:"100%",height:"60px"}},[r("h3",[t._v("Продать")])]):t.zeroPosition?t._e():r("v-btn",{attrs:{depressed:"",color:"error",width:"100%",height:"60px"}},[r("h3",[t._v("Купить")])])],1),r("v-col",{attrs:{cols:"12"}},[r("v-btn",{attrs:{depressed:"",dark:"",color:"black",width:"100%",height:"60px"}},[r("h3",[t._v("Позиция: "+t._s(t.currentPosition))])])],1)],1)],1):t._e()]):r("v-col",{staticClass:"pa-0",staticStyle:{"margin-right":"150px"},attrs:{cols:"2"}},[r("div",{staticStyle:{height:"750px"}},[r("v-row",{staticClass:"my-12"},[r("v-col",{attrs:{cols:"12"}},[r("h2",{staticStyle:{"margin-left":"40px"}},[t._v("Ожидание игроков")]),r("br"),r("v-btn",{attrs:{depressed:"",color:"primary",width:"100%",height:"60px"},on:{click:function(e){return t.checkIsStarted()}}},[r("h3",[t._v("Обновить")])])],1)],1)],1)])],1)},Y=[],z=(r("159b"),r("cc7d")),A=r.n(z),D=r("c6e1"),E=r.n(D),W={name:"Game",data:function(){return{currentPosition:0,thisPlayer:null,yourTurn:!1,yourProperty:!1,isStarted:!1,zeroPosition:!0,properties:[],users:[],incomeData:[{position:1,owner:"",color:"green",id:1,mapPosition:1,name:"1",price:1},{position:2,owner:"",color:"green",id:2,mapPosition:2,name:"2",price:2},{position:3,owner:"",color:"blue",id:3,mapPosition:3,name:"3",price:3},{position:4,owner:"",color:"blue",id:4,mapPosition:4,name:"4",price:4},{position:5,owner:"",color:"blue",id:5,mapPosition:5,name:"5",price:5},{position:6,owner:"",color:"orange",id:6,mapPosition:11,name:"6",price:6},{position:7,owner:"",color:"orange",id:7,mapPosition:17,name:"7",price:7},{position:8,owner:"",color:"red",id:8,mapPosition:23,name:"8",price:8},{position:9,owner:"",color:"red",id:9,mapPosition:29,name:"9",price:9},{position:10,owner:"",color:"red",id:10,mapPosition:35,name:"10",price:10},{position:11,owner:"",color:"purple",id:11,mapPosition:34,name:"11",price:11},{position:12,owner:"Валера Мазафакер",color:"purple",id:12,mapPosition:33,name:"Сбербанк",price:1200},{position:13,owner:"",color:"grey",id:13,mapPosition:32,name:"13",price:13},{position:14,owner:"",color:"grey",id:14,mapPosition:31,name:"14",price:14},{position:15,owner:"",color:"grey",id:15,mapPosition:30,name:"15",price:15},{position:16,owner:"",color:"pink",id:16,mapPosition:24,name:"16",price:16},{position:17,owner:"",color:"pink",id:17,mapPosition:18,name:"17",price:17},{position:18,owner:"",color:"brown",id:18,mapPosition:12,name:"18",price:18},{position:19,owner:"",color:"brown",id:19,mapPosition:6,name:"19",price:19}]}},created:function(){this.getPlayers(),this.getCurrentPlayer(),this.connect(),this.getProperties()},methods:{getCurrentPlayer:function(){var t=this;return Object(a["a"])(regeneratorRuntime.mark((function e(){var r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.axios.get("/profile");case 2:r=e.sent,200===r.status&&(t.thisPlayer=r.data.id);case 4:case"end":return e.stop()}}),e)})))()},checkIsStarted:function(){var t=this;return Object(a["a"])(regeneratorRuntime.mark((function e(){var r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return console.log(t.users[0].user.currentRoom),e.next=3,t.axios.get("/room/".concat(t.users[0].user.currentRoom));case 3:r=e.sent,200===r.status&&(console.log(r.data),t.isStarted=r.data.isStarted),t.getPlayers();case 6:case"end":return e.stop()}}),e)})))()},getPlayers:function(){var t=this;return Object(a["a"])(regeneratorRuntime.mark((function e(){var r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.axios.get("/user_to_room");case 2:r=e.sent,200===r.status&&(t.users=r.data,console.log(r.data)),t.isYourTurn(),t.isYourProperty();case 6:case"end":return e.stop()}}),e)})))()},isYourTurn:function(){console.log("Died Here"),console.log(this.users);for(var t=0;t<this.users.length;t++){var e=this.users[t];console.log(e),e.user.id===this.thisPlayer&&(this.yourTurn=e.isYourTurn)}console.log("Didn't survive :(")},isYourProperty:function(){for(var t=0;t<this.users.length;t++){var e=this.users[t];if(e.user.id===this.thisPlayer){var r=e.position;if(this.currentPosition=r,this.yourProperty=!1,0===r)return void(this.zeroPosition=!0);this.zeroPosition=!1;for(var o=0;o<this.properties.length;o++){var i=this.properties[o];r===i.position&&this.thisPlayer===i.owner&&(this.yourProperty=!0)}}}},getPlayerByUserId:function(){for(var t=0;t<this.users.length;t++){var e=this.users[t];if(e.user.id===this.thisPlayer)return e}},move:function(){var t=.5+6*Math.random(),e=Math.round(t),r=this.getPlayerByUserId();r.position+=e,r.position>19&&(r.position-=20),this.send(r)},send:function(t){if(console.log("Send message:"+t),this.stompClient&&this.stompClient.connected){var e=t;this.stompClient.send("/app/changePlayer",JSON.stringify(e),{})}},connect:function(){var t=this;this.socket=new A.a("/gs-guide-websocket"),this.stompClient=E.a.over(this.socket),this.stompClient.connect({},(function(e){t.connected=!0,console.log(e),t.stompClient.subscribe("/topic/activity",(function(e){t.getPlayers(),console.log(e)}))}),(function(e){console.log(e),console.log("suck"),t.connected=!1}))},getProperties:function(){var t=this;this.properties.push({position:0,mapPosition:0,name:"START",price:"Получить 200",color:"black"});for(var e=1;e<36;e++)this.properties.push({position:-1,mapPosition:e,name:"",price:0,color:"white"});this.incomeData.forEach((function(e){t.properties[e.mapPosition]=e}))}}},J=W,q=Object(l["a"])(J,B,Y,!1,null,"0da5a21c",null),F=q.exports;p()(q,{VBtn:v["a"],VCard:R["a"],VCardSubtitle:C["a"],VCardText:C["b"],VCardTitle:C["c"],VCol:S["a"],VList:O["a"],VListItem:N["a"],VRow:L["a"]}),o["a"].use(w["a"]);var U=[{path:"/",name:"Main",component:G},{path:"/Game",name:"Game",component:F}],H=new w["a"]({mode:"history",base:"/",routes:U}),K=H,Q=r("f309");o["a"].use(Q["a"]);var X=new Q["a"]({}),Z=r("bc3a"),tt=r.n(Z),et=r("2106"),rt=r.n(et);o["a"].use(rt.a,tt.a),o["a"].config.productionTip=!0,new o["a"]({router:K,vuetify:X,axios:tt.a,render:function(t){return t(y)}}).$mount("#app")}});
//# sourceMappingURL=app.f02b8e61.js.map