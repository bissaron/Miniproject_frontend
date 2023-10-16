<template>
  <v-app>
    <div class="background-container">
      <Tabs />
    </div>
    <v-app-bar
      app
      color="orange darken-2"
    >
      <v-text>
        ระบบบันทึกรายรับรายจ่าย 
      </v-text>
      <v-spacer></v-spacer>
      <v-btn
        text
        @click="goToLogin"
        class="custom-button"
      >
        เข้าสู่ระบบ
      </v-btn>
    </v-app-bar>
  </v-app>
</template>

<script>
import Tabs from './views/TabsView.vue';

export default {
  name: 'App',
  components: {
    Tabs,
  },
  data: () => ({}),
  created() {
    this.$EventBus.$on('getUsername', this.getUsername);
    this.getUsername();
  },
  methods: {
    goToLogin() {
      this.$router.push('/login');
    },
  },
};
</script>

<style>
.custom-button {
  border: 2px solid white;
  color: white !important;
}

.background-container {
  background-image: url("@/assets/back.jpg"); /* ใช้สีส้ม (Orange) */
  background-size: cover;
  height: 100vh;
  padding-top: 100px;
  
  
  
}


</style>
