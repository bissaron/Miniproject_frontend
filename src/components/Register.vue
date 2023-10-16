<template>
  <v-card class="register-container">
    <v-card-title style="font-size: 24px |important;">สมัครสมาชิก</v-card-title>
    <v-card-text>
      <v-form ref="RegisterForm" v-model="valid" lazy-validation>
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

        <v-text-field
          v-model="confirmpassword"
          :rules="confirmpasswordRules"
          label="ยืนยันรหัสผ่าน"
          :type="showConfirmPassword ? 'text' : 'password'"
          required
          outlined
          append-icon="mdi-eye"
          @click:append="showConfirmPassword = !showConfirmPassword"
        ></v-text-field>

        <v-btn :disabled="!valid" color="success" @click="Register" block>
          สมัครสมาชิก
        </v-btn>
      </v-form>
    </v-card-text>
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
    ],
    confirmpassword: '',
    confirmpasswordRules: [
      v => !!v || 'กรุณากรอกรหัสผ่านยืนยัน',
    ],
    showPassword: false,
    showConfirmPassword: false,
  }),

  methods: {
    
    Register() {
      if (this.$refs.RegisterForm.validate(true)) {
        
        if (this.password === this.confirmpassword) {
          this.$router.push('/login');
          alert('ลงทะเบียนสำเร็จ');
        } else {
          alert('รหัสผ่านยืนยันไม่ตรงกับรหัสผ่าน');
        }
      } else {
        alert('ลงทะเบียนไม่สำเร็จ');
      }
    },
  },
};
</script>

<style>
.register-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 60px auto;
  width: 50%;
}
</style>