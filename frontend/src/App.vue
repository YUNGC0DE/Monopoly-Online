<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <h1> Monopoly Online </h1>
      </div>

      <v-spacer></v-spacer>

      <v-btn
              v-if="!userName"
        href="http://localhost:8080/login"
        text
      >
        <span class="mr-2">Вход</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main
    style="background-color: rgb(242, 242, 242)">
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data: () => ({
    userName: null
  }),
  methods: {
    async isLogged () {
      const userInfo = await this.axios.get('/profile')
      this.userName = userInfo.data.name
    }
  },
  created () {
    this.isLogged()
  }
};
</script>
