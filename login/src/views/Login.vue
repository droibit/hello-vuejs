<template>
  <div class="login-view">
    <h1>Log in</h1>
    <LoginForm :onLogin="onLogin"/>
  </div>
</template>

<script>
import LoginForm from "@/components/LoginForm.vue";

export default {
  name: "login",
  components: {
    LoginForm
  },
  methods: {
    async onLogin({ email, password, rememberMe }) {
      console.log(`email: ${email}, password: ${password}`);
      await this.$store.dispatch("login/login", {
        email,
        password,
        rememberMe
      });
      this.$router.push("/");
    }
  }
};
</script>

<style>
.login-view {
  width: 320px;
  margin: auto;
}
</style>
