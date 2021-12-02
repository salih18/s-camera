<template>
  <v-card class="elevation-3">
    <v-toolbar light color="#FB8122">
      <v-toolbar-title
        elevation="0"
        class="toolbar-title white--text caption text-body-1 font-weight-medium px-5"
        >Login</v-toolbar-title
      >
    </v-toolbar>
    <v-card-text>
      <v-form>
        <v-snackbar
          v-if="getLoginError"
          :value="getLoginError.length"
          color="red"
          top
          elevation="50"
          >{{ getLoginError }}
        </v-snackbar>
        <v-text-field
          ref="username"
          v-model="username"
          prepend-icon="mdi-email"
          name="login"
          label="Email"
          type="text"
          @keyup.enter="$refs.password.focus"
        ></v-text-field>
        <v-text-field
          id="password"
          ref="password"
          v-model="password"
          prepend-icon="mdi-lock"
          name="password"
          label="Password"
          type="password"
          @keyup.enter="loginUser"
        ></v-text-field>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn elevation="0" color="#1D2228" class="white--text" @click="loginUser">Sign In</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "Login",
  data: () => ({
    username: "onlinedemo@cameramanager.com",
    password: "",
    errorMessages: { username: [], password: [], non_field_errors: [] },
  }),
  methods: {
    async loginUser() {
      this.$store.commit("setErrorLogin", null);
      const formData = { username: this.username, password: this.password };
      await this.$store.dispatch("login", formData);
    },
  },
  computed: {
    getLoginError() {
      return this.$store.state.auth.error;
    },
  },
};
</script>

<style lang="sass" scoped></style>
