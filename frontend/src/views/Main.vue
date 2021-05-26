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
          <v-card class="mx-auto my-1"
          width="600px"
          elevation="0"
          style="background-color: rgb(242, 242, 242)"
          >
            <h1>Добро пожаловать, {{userName}}</h1>
          <br>
          </v-card>
          <hr>
          <br>

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
              <form>
    <v-text-field
      v-model="newRoomName"
      :counter="20"
      label="Название"
      required
      style="width: 80%"
      class="mx-auto"
    ></v-text-field>
    <br>
    <v-btn
      class="mr-4"
      @click="createRoom"
      width="100%"
      color="blue"
      dark
    >
      <b>Создать</b>

    </v-btn>
  </form>
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
                        @click="submit"
                        color="blue"
                        dark

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
    newRoomName: '',
  }),
  methods: {
    async isLogged () {
      const userInfo = await this.axios.get('/profile');
      this.userName = userInfo.data.name;
      if (userInfo.data.name) {
          this.getRooms()
      }
    },
    async getRooms () {
      const rooms = await this.axios.get('/room');
      this.rooms = rooms.data;
    },
    async createRoom () {
      const resp = await this.axios.post('/room', {name: this.newRoomName});
      console.log(resp.status);
      console.log(resp.data);
      this.newRoomName = '';
      this.getRooms()
    }
  },
  created () {
    this.isLogged();
  }
}
</script>
