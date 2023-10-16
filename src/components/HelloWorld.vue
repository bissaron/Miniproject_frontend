<template>
  <v-container>
    <!-- <span v-on="gotoLink()">google</span> -->
    <v-row class="text-center">
      <v-col cols="12">
        <v-img
          :src="require('../assets/wallet.png')"
          class="my-3"
          contain
          height="200"
        />
      </v-col>

      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">
          ยินดีต้อนรับเข้าสู่ระบบบันทึกรายรับรายจ่าย <br>{{ username }}
        </h1>

        
      </v-col>

      
      
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'HelloWorld',
  data: () => ({
    username: ''
  }),
  created (){
    this.$EventBus.$on('getUsername', this.getUsername)
    this.getUsername()
  },
  methods: {
    getUsername () {
      if(localStorage.getItem('username') !==null) {
        this.username = localStorage.getItem('username')
      } else {
        this.username = 'Vuetify'
      }
    }
  },

}
</script>