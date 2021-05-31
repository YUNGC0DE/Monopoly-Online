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
                            <v-card-text v-if="user.yourTurn" style="color: indianred">
                                <b> Ходит </b>
                            </v-card-text>
                        </v-card>

                    </v-list-item>
                </v-list>
            </div>
            д
        </v-col>
        <v-col cols="7" style="max-width: 1050px; margin-right: 100px">
            <v-row class="my-0 mx-0" style="width: 1000px; height: 750px;">
                <v-col v-for="property in properties" :key="property.position" cols="2"
                       class="pa-0"
                       style="height: 125px"
                >
                    <v-col v-if="property.id !== -1"
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
                                <b v-if="property.id === 0">{{property.price}}$</b>
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
        <v-col cols="2" style="margin-right: 150px;" class="pa-0">
            <div style=" height: 750px;">
                <v-row class="my-12">

                    <v-col cols="12">
                        <v-btn depressed color="primary" width="100%" height="60px" @click="send(0)">
                            <h3>Сделать ход </h3>
                        </v-btn>
                    </v-col>
                    <v-col cols="12">
                        <v-btn depressed color="error" width="100%" height="60px">
                            <h3>Купить / Продать </h3>
                        </v-btn>
                    </v-col>
                    <v-col cols="12">
                        <v-btn depressed dark color="black" width="100%" height="60px">
                            <h3>Сдаться</h3>
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
            properties: [],
            users: [],
            incomeData: [
                {"color": "green", "id": 1, "position": 1, "name": "1", "price": 1},
                {"owner": "", "color": "green", "id": 2, "position": 2, "name": "2", "price": 2},
                {"owner": "", "color": "blue", "id": 3, "position": 3, "name": "3", "price": 3},
                {"owner": "", "color": "blue", "id": 4, "position": 4, "name": "4", "price": 4},
                {"owner": "", "color": "blue", "id": 5, "position": 5, "name": "5", "price": 5},
                {"owner": "", "color": "orange", "id": 6, "position": 11, "name": "6", "price": 6},
                {"owner": "", "color": "orange", "id": 7, "position": 17, "name": "7", "price": 7},
                {"owner": "", "color": "red", "id": 8, "position": 23, "name": "8", "price": 8},
                {"owner": "", "color": "red", "id": 9, "position": 29, "name": "9", "price": 9},
                {"owner": "", "color": "red", "id": 10, "position": 35, "name": "10", "price": 10},
                {"owner": "", "color": "purple", "id": 11, "position": 34, "name": "11", "price": 11},
                {
                    "owner": "Валера Мазафакер",
                    "color": "purple",
                    "id": 12,
                    "position": 33,
                    "name": "Сбербанк",
                    "price": 1200
                },
                {"owner": "", "color": "grey", "id": 13, "position": 32, "name": "13", "price": 13},
                {"owner": "", "color": "grey", "id": 14, "position": 31, "name": "14", "price": 14},
                {"owner": "", "color": "grey", "id": 15, "position": 30, "name": "15", "price": 15},
                {"owner": "", "color": "pink", "id": 16, "position": 24, "name": "16", "price": 16},
                {"owner": "", "color": "pink", "id": 17, "position": 18, "name": "17", "price": 17},
                {"owner": "", "color": "brown", "id": 18, "position": 12, "name": "18", "price": 18},
                {"owner": "", "color": "brown", "id": 19, "position": 6, "name": "19", "price": 19},
            ]
        }),
        created() {
            this.getPlayers();
            this.connect();
            this.getProperties();
        },
        methods: {
            async getPlayers() {
                const resp = await this.axios.get('/user_to_room');
                if (resp.status === 200) {
                    this.users = resp.data
                }
            },
            send(idx) {
                this.users[0].money += 1;
                console.log("Send message:" + this.users[idx]);
                if (this.stompClient && this.stompClient.connected) {
                    const msg = this.users[idx];
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
            disconnect() {
                if (this.stompClient) {
                    this.stompClient.disconnect();
                }
                this.connected = false;
            },
            tickleConnection() {
                this.connected ? this.disconnect() : this.connect();
            },
            getProperties() {
                this.properties.push({
                    "id": 0,
                    "position": 0,
                    "name": "START",
                    "price": "Получить 200",
                    "color": "black"
                });
                for (let i = 1; i < 36; i++) {
                    this.properties.push({"id": -1, "position": i, "name": "", "price": 0, "color": "white"})
                }
                this.incomeData.forEach((element) => {
                    this.properties[element.position] = element
                })
            }
        },

    }
</script>

<style scoped>

</style>