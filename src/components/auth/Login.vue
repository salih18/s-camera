<template>
  <v-card class="elevation-3">
    <v-toolbar light color="primary">
      <v-toolbar-title
        elevation="0"
        class="toolbar-title white--text caption text-body-1 font-weight-medium px-5"
        >Login</v-toolbar-title
      >
    </v-toolbar>
    <v-card-text>
      <v-form>
        <v-alert
          v-for="(error, index) in errorMessages.non_field_errors"
          :key="index"
          :value="true"
          type="error"
          >{{ error }}
        </v-alert>
        <v-text-field
          ref="username"
          v-model="username"
          prepend-icon="mdi-email"
          name="login"
          label="Email"
          type="text"
          :error-messages="errorMessages.username"
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
          :error-messages="errorMessages.password"
          @keyup.enter="login"
        ></v-text-field>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn elevation="0" color="primary" @click="loginUser">Sign In</v-btn>
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
      const formData = { username: this.username, password: this.password };
      await this.$store.dispatch("login", formData);
    },
  },
};
</script>

<style lang="sass" scoped></style>
