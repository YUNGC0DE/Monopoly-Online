<template>
    <v-row style="min-width: 2000px" class="my-12">
        <v-col cols="2" class="mx-auto pr-12">
            <div style=" height: 750px; ">
                <v-list style="background-color: rgb(242, 242, 242)" class="mx-5">
                    <v-list-item v-for="user in users" :key="user.id">
                        <v-card class="my-4" height="150px" width="180px">
                            <v-card-title>
                                {{user.user.name}}
                            </v-card-title>
                            <v-card-subtitle class="my-auto">
                                <b>Баланс: {{user.money}}$</b>
                            </v-card-subtitle>
                            <v-card-text v-if="user.isYourTurn" style="color: indianred">
                                <b> Ходит </b>
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
                                <b>{{ property.name }}</b>
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
            <div style=" height: 750px;" v-if="yourTurn">
                <v-row class="my-12">

                    <v-col cols="12">
                        <v-btn depressed color="primary" width="100%" height="60px" @click="move()">
                            <h3>Сделать ход </h3>
                        </v-btn>
                    </v-col>
                    <v-col cols="12">
                        <v-btn depressed color="error" width="100%" height="60px"
                               v-if="yourProperty">
                            <h3>Продать</h3>
                        </v-btn>
                        <v-btn depressed color="error" width="100%" height="60px" v-else-if="!zeroPosition">
                            <h3>Купить</h3>
                        </v-btn>
                    </v-col>
                    <v-col cols="12">
                        <v-btn depressed dark color="black" width="100%" height="60px">
                            <h3>Позиция: {{currentPosition}}</h3>

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
            yourProperty: false,
            isStarted: false,
            zeroPosition: true,
            properties: [],
            users: [],
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
            ]
        }),
        created() {
            this.getPlayers();
            this.getCurrentPlayer();
            this.connect();
            this.getProperties();
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
                this.isYourProperty();
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
                        this.yourProperty = false;
                        if (position === 0) {
                            this.zeroPosition=true;
                            return
                        }
                        this.zeroPosition = false;
                        for (let i = 0; i<this.properties.length; i++){
                            const property = this.properties[i];
                            if (position === property.position){
                                if (this.thisPlayer === property.owner){
                                    this.yourProperty = true
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
            move(){
              let rand = 1 - 0.5 + Math.random() * 6;
              const step = Math.round(rand);
              const user = this.getPlayerByUserId();
              user.position += step;
              if (user.position > 19) {
                  user.position -= 20
              }

              this.send(user);
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
                            console.log(tick)

                        });
                    },
                    error => {
                        console.log(error);console.log("suck");
                        this.connected = false;
                    }
                );
            },
            getProperties() {
                this.properties.push({
                    "position": 0,
                    "mapPosition": 0,
                    "name": "START",
                    "price": "Получить 200",
                    "color": "black"
                });
                for (let i = 1; i < 36; i++) {
                    this.properties.push({"position": -1, "mapPosition": i, "name": "", "price": 0, "color": "white"})
                }
                this.incomeData.forEach((element) => {
                    this.properties[element.mapPosition] = element
                })
            }
        },

    }
</script>

<style scoped>

</style>