<template>
    <v-row style="min-width: 2000px" class="my-12">
        <v-col cols="2" class="mx-auto pr-12">
            <div>
                <v-list style="background-color: rgb(242, 242, 242)" class="mx-5">
                    <v-list-item v-for="user in users" :key="user.id">
                        <v-card class="my-4" height="200px" width="180px">
                            <v-card-title>
                                {{user.user.name}}
                            </v-card-title>
                            <v-card-subtitle class="my-auto">
                                <b>Баланс: {{user.money}}$</b>
                            </v-card-subtitle>
                            <v-card-text style="color: blueviolet">
                                <b> Позиция: {{user.position}} </b>
                                <p v-if="user.isYourTurn" style="color: indianred">
                                <b> Ходит </b>
                            </p>
                            </v-card-text>
                        </v-card>

                    </v-list-item>
                </v-list>
            </div>
        </v-col>
        <v-col cols="7" style="max-width: 1050px; margin-right: 100px">
            <v-row class="my-0 mx-0" style="width: 1000px; height: 750px;">
                <v-col v-for="property in properties" :key="property.mapPosition" cols="2"
                       class="pa-0"
                       style="height: 125px"
                >
                    <v-col v-if="property.position !== -1"
                           class="pa-0"
                           style="border: 2px solid black; width: 100%; height: 100%">
                        <v-card
                                dark
                                :color="property.color"
                                width="100%"
                                height="100%"
                                rounded="0"
                                elevation="0"

                        >
                            <v-card-title>
                                <b>{{property.position}} - {{ property.name }}</b>
                            </v-card-title>
                            <v-card-subtitle>
                                <b>{{property.owner}}</b>
                            </v-card-subtitle>
                            <v-card-text v-if="!property.owner">
                                <b v-if="property.position === 0">{{property.price}}$</b>
                                <b v-else>Цена: {{property.price}}$</b>
                            </v-card-text>
                            <v-card-text v-else>
                                <b>Штраф: {{property.price / 2}}$</b>
                            </v-card-text>
                        </v-card>
                    </v-col>


                    <!--

                    NO LOGIC START


                    -->
                    <v-col v-else
                           class="pa-0"
                           style="width: 100%; height: 100%">
                        <v-card
                                dark
                                :color="property.color"
                                width="100%"
                                height="100%"
                                rounded="0"
                                elevation="0"

                        >
                        </v-card>
                    </v-col>
                    <!--

                    NO LOGIC END


                    -->

                </v-col>
            </v-row>
        </v-col>
        <v-col cols="2" style="margin-right: 150px;" class="pa-0" v-if="isStarted">
            <div style=" height: 750px;">
                <v-row class="my-12">

                    <v-col cols="12" v-if="yourTurn">
                        <v-btn depressed color="primary" width="100%" height="60px" @click="move()">
                            <h3>Сделать ход </h3>
                        </v-btn>
                    </v-col>
                    <v-col cols="12" v-if="canBuy">
                        <v-btn depressed color="error" width="100%" height="60px" @click="buy()">
                            <h3>Купить</h3>
                        </v-btn>
                    </v-col>
                    <v-col cols="12" v-if="canBuy">
                        <v-btn depressed dark color="black" width="100%" height="60px" @click="endMove()">
                            <h3>Закончить ход</h3>
                        </v-btn>
                    </v-col>
                </v-row>
            </div>
        </v-col>
        <v-col cols="2" style="margin-right: 150px;" class="pa-0" v-else>
            <div style=" height: 750px;">
                <v-row class="my-12">

                    <v-col cols="12">
                        <h2 style="margin-left: 40px">Ожидание игроков</h2>
                        <br>
                        <v-btn depressed color="primary" width="100%" height="60px" @click="checkIsStarted()">
                            <h3>Обновить</h3>
                        </v-btn>
                    </v-col>
                </v-row>
            </div>
        </v-col>
    </v-row>

</template>

<script>
    import SockJS from "sockjs-client";
    import Stomp from "webstomp-client";

    export default {
        name: "Game",

        data: () => ({
            currentPosition: 0,
            thisPlayer: null,
            yourTurn: false,
            isStarted: false,
            canBuy: false,
            properties: [],
            users: [],
            incomeData: []

            /*
            incomeData: [
                {"position":1, "owner": "", "color": "green", "id": 1, "mapPosition": 1, "name": "1", "price": 1},
                {"position":2, "owner": "", "color": "green", "id": 2, "mapPosition": 2, "name": "2", "price": 2},
                {"position":3, "owner": "", "color": "blue", "id": 3, "mapPosition": 3, "name": "3", "price": 3},
                {"position":4, "owner": "", "color": "blue", "id": 4, "mapPosition": 4, "name": "4", "price": 4},
                {"position":5, "owner": "", "color": "blue", "id": 5, "mapPosition": 5, "name": "5", "price": 5},
                {"position":6, "owner": "", "color": "orange", "id": 6, "mapPosition": 11, "name": "6", "price": 6},
                {"position":7, "owner": "", "color": "orange", "id": 7, "mapPosition": 17, "name": "7", "price": 7},
                {"position":8, "owner": "", "color": "red", "id": 8, "mapPosition": 23, "name": "8", "price": 8},
                {"position":9, "owner": "", "color": "red", "id": 9, "mapPosition": 29, "name": "9", "price": 9},
                {"position":10, "owner": "", "color": "red", "id": 10, "mapPosition": 35, "name": "10", "price": 10},
                {"position":11, "owner": "", "color": "purple", "id": 11, "mapPosition": 34, "name": "11", "price": 11},
                {
                    "position": 12,
                    "owner": "Валера Мазафакер",
                    "color": "purple",
                    "id": 12,
                    "mapPosition": 33,
                    "name": "Сбербанк",
                    "price": 1200
                },
                {"position":13, "owner": "", "color": "grey", "id": 13, "mapPosition": 32, "name": "13", "price": 13},
                {"position":14, "owner": "", "color": "grey", "id": 14, "mapPosition": 31, "name": "14", "price": 14},
                {"position":15, "owner": "", "color": "grey", "id": 15, "mapPosition": 30, "name": "15", "price": 15},
                {"position":16, "owner": "", "color": "pink", "id": 16, "mapPosition": 24, "name": "16", "price": 16},
                {"position":17, "owner": "", "color": "pink", "id": 17, "mapPosition": 18, "name": "17", "price": 17},
                {"position":18, "owner": "", "color": "brown", "id": 18, "mapPosition": 12, "name": "18", "price": 18},
                {"position":19, "owner": "", "color": "brown", "id": 19, "mapPosition": 6, "name": "19", "price": 19},
            ] */

        }),
        created() {
            this.getPlayers();
            this.getCurrentPlayer();
            this.connect();
            this.prepProps();
            this.fetchProperties();
        },
        methods: {
            async getCurrentPlayer() {
                const resp = await this.axios.get('/profile');
                if (resp.status === 200) {
                    this.thisPlayer = resp.data.id
                }
            },
            async checkIsStarted() {
                console.log(this.users[0].user.currentRoom);
                const resp = await this.axios.get(`/room/${this.users[0].user.currentRoom}`);
                if (resp.status === 200) {
                    console.log(resp.data);
                    this.isStarted = resp.data.isStarted
                }
                this.getPlayers();
            },
            async getPlayers() {
                const resp = await this.axios.get('/user_to_room');
                if (resp.status === 200) {
                    this.users = resp.data
                    console.log(resp.data)
                }
                this.isYourTurn();
            },
            isYourTurn() {
                console.log("Died Here");
                console.log(this.users);
                for (let i = 0; i<this.users.length; i++){
                    const user = this.users[i]
                    console.log(user);
                    if (user.user.id === this.thisPlayer) {
                        this.yourTurn = user.isYourTurn
                    }
                }
                console.log("Didn't survive :(")
            },
            isYourProperty() {
                for (let i = 0; i<this.users.length; i++){
                    const user = this.users[i];
                    if (user.user.id === this.thisPlayer) {
                        const position = user.position;
                        this.currentPosition = position;
                        this.canBuy = true;
                        if (position === 0) {
                            this.canBuy = false;
                            return
                        }
                        for (let k = 0;k<this.properties.length; k++){
                            const property = this.properties[k];
                            if (position === property.position){
                                if (this.getPlayerByUserId().user.name === property.owner){
                                    this.canBuy = false;
                                    this.send(user);
                                    return;
                                }
                                else if (property.owner){
                                    const fee = property.price / 2;
                                    const user = this.getPlayerByUserId();
                                    user.money -= fee;
                                    if (user.money < 0){
                                        this.isStarted = false;
                                    }
                                    this.send(user);
                                    this.canBuy = false;
                                    return;
                                }
                            }
                        }
                    }
                }
            },
            getPlayerByUserId(){
                for (let i=0; i<this.users.length;i++){
                    const user = this.users[i];
                    if (user.user.id === this.thisPlayer){
                        return user
                    }
                }
            },
            getPropertyOwner(id){
                for (let i = 0; i<this.users.length; i++){
                    const user = this.users[i];
                    for (let i = 0; i < user.properties.length; i++){
                        const property = user.properties[i];
                        if (property.id === id){
                            return user
                        }
                    }
                }
            },
            move(){
              let rand = 1 - 0.5 + Math.random() * 6;
              const step = Math.round(rand);
              const user = this.getPlayerByUserId();
              user.position += step;
              if (user.position > 19) {
                  user.money += 1000;
                  user.position -= 20
              }
              this.yourTurn = false;
              this.isYourProperty();
            },
            endMove(){
                 const user = this.getPlayerByUserId();
                 this.send(user);
                 this.canBuy = false;
            },
            buy() {
                console.log('Bought');
                for(let i = 0; i<this.properties.length; i++){
                    const property = this.properties[i];
                    console.log(this.currentPosition);
                    console.log(property.position);
                    if (property.position === this.currentPosition){
                        console.log("KEK");
                        const user = this.getPlayerByUserId();
                        user.money -= property.price;
                        const prop = {
                            "name": property.name,
                            "id": property.id,
                            "price": property.price,
                            "position": property.position,
                            "color": property.color,
                            "mapPosition": property.mapPosition
                        };
                        user.properties.push(prop);
                        this.send(user)
                    }
                }
            },
            send(userEntity) {
                console.log("Send message:" + userEntity);
                if (this.stompClient && this.stompClient.connected) {
                    const msg = userEntity;
                    this.stompClient.send("/app/changePlayer", JSON.stringify(msg), {});
                }
            },
            connect() {
                this.socket = new SockJS("/gs-guide-websocket");
                this.stompClient = Stomp.over(this.socket);
                this.stompClient.connect(
                    {},
                    frame => {
                        this.connected = true;
                        console.log(frame);
                        this.stompClient.subscribe("/topic/activity", tick => {
                            this.getPlayers();
                            this.fetchProperties();
                            console.log(tick)

                        });
                    },
                    error => {
                        console.log(error);console.log("suck");
                        this.connected = false;
                    }
                );
            },
            prepProps(){
              this.properties.push({
                    "position": 0,
                    "mapPosition": 0,
                    "name": "START",
                    "price": "Получить 1000",
                    "color": "black"
                });
                for (let i = 1; i < 36; i++) {
                    this.properties.push({"position": -1, "mapPosition": i, "name": "", "price": 0, "color": "white"})
                }
            },
            async fetchProperties() {
                const resp = await this.axios.get('/property');
                this.getProperties(resp.data)
            },
            getProperties(data) {
                this.incomeData = data;
                for (let i = 0; i<this.users.length; i++){
                    const user = this.users[i];
                    for (let k = 0; k < user.properties.length; k++){
                        const userProp = user.properties[k];
                        for (let j = 0; j < this.incomeData.length; j++){
                            const prop = this.incomeData[j];
                            if (userProp.id === prop.id){
                                this.incomeData[j].owner = user.user.name;
                            }
                        }

                    }
                }
                for (let i = 0; i<this.incomeData.length; i++){
                    const prop = this.incomeData[i];
                    console.log(prop);
                    this.properties[prop.mapPosition] = prop
                }
            }
        },

    }
</script>

<style scoped>

</style>