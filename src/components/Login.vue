<template>
  <v-card class="login-container">
    <v-card-title style="font-size: 24px;">เข้าสู่ระบบ</v-card-title>
    <v-card-text>
      <v-form ref="LoginForm" v-model="valid" lazy-validation>
        <v-text-field
          v-model="username"
          :counter="20"
          :rules="usernameRules"
          label="ชื่อผู้ใช้งาน"
          required
          outlined
        ></v-text-field>

        <v-text-field
          v-model="password"
          :rules="passwordRules"
          label="รหัสผ่าน"
          :type="showPassword ? 'text' : 'password'"
          required
          outlined
          append-icon="mdi-eye"
          @click:append="showPassword = !showPassword"
        ></v-text-field>
        <v-btn :disabled="!valid" color="success" @click="Login" block>
          เข้าสู่ระบบ
        </v-btn>
        
      </v-form>
    </v-card-text>
    <v-card-text style="text-align: center; margin-top: ">หากคุณยังไม่เป็นสมาชิก <router-link to="/register">สมัครสมาชิก</router-link></v-card-text>
    
  </v-card>
  
</template>


<script>
export default {
  data: () => ({
    
    valid: true,
    username: '',
    usernameRules: [
      v => !!v || 'กรุณากรอกชื่อผู้ใช้งาน',
      v => (v && v.length <= 20) || 'กรุณากรอกข้อมูลชื่อผู้ใช้งานห้ามเกิน 20 ตัวอักษร',
    ],
    password: '',
    passwordRules: [
      v => !!v || 'กรุณากรอกรหัสผ่าน',
    ]
  }),

  methods: {
    Login () {
      if (this.$refs.LoginForm.validate(true)) {
        localStorage.setItem('username', this.username);
        this.$EventBus.$emit('getUsername');
        this.$router.push('/');
        alert('ผ่าน');
      } else {
        alert('ไม่ผ่าน');
      }
    },
  },

};
</script>

<style>
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 50px auto;
  width: 50%;
}
</style>
