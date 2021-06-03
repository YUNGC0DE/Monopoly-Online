<template>
    <v-row>
        <v-col>
            <div v-if="!userName">
                <v-container>
                    <v-card class="mx-auto my-1"
                            width="500px"
                            elevation="0"
                            style="background-color: rgb(242, 242, 242)"

                    >
                        <h1>Пожалуйста, водите в систему</h1>
                    </v-card>
                </v-container>
            </div>
            <div v-else>
                <v-container>

                    <br>
                    <v-row>
                        <v-col cols="3">
                            <v-card
                                    elevation="3">
                                <v-card-title
                                        style="width: 100%"
                                        class="justify-center"
                                >
                                    Создать комнату
                                </v-card-title>
                                <v-form
                                        :disabled="currentRoom">
                                    <v-text-field
                                            v-model="newRoomName"
                                            :counter="20"
                                            label="Название"
                                            required
                                            style="width: 80%"
                                            class="mx-auto"
                                    ></v-text-field>
                                    <v-select
                                            v-model="playersNumber"
                                            :items="[2, 3, 4]"
                                            label="Кол-во игроков"
                                            required
                                            style="width: 80%"
                                            class="mx-auto"
                                    ></v-select>
                                    <br>
                                    <v-btn v-if="!currentRoom"
                                           class="mr-4"
                                           @click="createRoom"
                                           width="100%"
                                           color="blue"
                                           dark
                                    >
                                        <b>Создать</b>

                                    </v-btn>
                                </v-form>
                            </v-card>
                        </v-col>

                        <v-col cols="6">
                            <v-card
                                    elevation="3">
                                <v-card-title
                                        style="width: 100%"
                                        class="justify-center"
                                >
                                    Ожидают игры
                                </v-card-title>
                                <v-list>
                                    <v-list-item v-for="room in rooms" :key="room.id"
                                                 class="pa-2"
                                    >
                                        <v-card width="100%"
                                                elevation="0"
                                                style="background-color: #d7e7f7">
                                            <v-row>
                                                <v-col>
                                                    <v-card-title>
                                                        {{room.name}}
                                                    </v-card-title>
                                                </v-col>
                                                <v-col>
                                                    <v-btn
                                                            style="float: right"
                                                            class="mr-4 py-5 my-4"
                                                            @click="joinRoom(room.id)"
                                                            color="blue"
                                                            :dark="!currentRoom"
                                                            :disabled="currentRoom"

                                                    >
                                                        <b>Присоедениться</b>
                                                    </v-btn>
                                                </v-col>
                                            </v-row>


                                        </v-card>
                                    </v-list-item>
                                </v-list>
                            </v-card>
                        </v-col>

                        <v-col cols="3" style="max-width: 300px">
                            <v-card
                                    elevation="3">
                                <v-card-title
                                        style="width: 100%"
                                        class="justify-center"
                                >
                                    Профиль
                                </v-card-title>
                                <v-list>
                                    <v-list-item>
                                        <v-list-item-title>
                                            <b>Имя:</b> {{userName}}
                                        </v-list-item-title>
                                    </v-list-item>
                                    <v-list-item>
                                        <v-list-item-title>
                                            <b>Всего игр:</b> {{totalGames}}
                                        </v-list-item-title>
                                    </v-list-item>
                                    <v-list-item>
                                        <v-list-item-title>
                                            <b>Побед:</b> {{totalWins}}
                                        </v-list-item-title>
                                    </v-list-item>
                                    <v-list-item>
                                        <v-list-item-title>
                                            <b>Поражений:</b> {{totalLoses}}
                                        </v-list-item-title>
                                    </v-list-item>
                                    <v-list-item>
                                        <v-btn
                                                class="mr-4"
                                                @click="$router.push('/game')"
                                                width="100%"
                                                color="blue"
                                                dark
                                                :disabled="!currentRoom"
                                        >
                                            <b>Текущая игра</b>

                                        </v-btn>
                                    </v-list-item>
                                </v-list>
                            </v-card>
                        </v-col>
                    </v-row>

                </v-container>
            </div>
        </v-col>
    </v-row>
</template>

<script>
    export default {
        name: 'Main',
        data: () => ({
            userName: null,
            rooms: null,
            currentRoom: null,
            totalGames: null,
            totalWins: null,
            totalLoses: null,
            newRoomName: '',
            playersNumber: 2,
        }),
        methods: {
            async isLogged() {
                const userInfo = await this.axios.get('/profile');
                this.userName = userInfo.data.name;
                this.currentRoom = userInfo.data.currentRoom;
                this.totalGames = userInfo.data.totalGames;
                this.totalLoses = userInfo.data.totalLoses;
                this.totalWins = userInfo.data.totalWins;
                if (userInfo.data.name) {
                    this.getRooms()
                }
            },
            async getRooms() {
                const rooms = await this.axios.get('/room');
                this.rooms = rooms.data;
            },
            async createRoom() {
                const resp = await this.axios.post('/room', {name: this.newRoomName, playersNumber: this.playersNumber});
                if (resp.status === 200) {
                    const id = resp.data.id;
                    this.currentRoom = id;
                    this.joinRoom(id);
                }
            },
            async joinRoom(id) {
                const resp = await this.axios.put('/profile', {currentRoom: id});
                if (resp.status === 200) {
                    await this.axios.post('/user_to_room', {id: id});
                    const roomInfo = await this.axios.get(`/room/${id}`);
                    const playersInfo = await this.axios.get('/user_to_room');
                    if (roomInfo.data.playersNumber === playersInfo.data.length){
                        await this.axios.put(`/room/${id}`)
                    }
                    await this.$router.push('/game')
                }
            }
        },
        created() {
            this.isLogged();
        }
    }
</script>
