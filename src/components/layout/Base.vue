<template>
  <v-app id="inspire" light>
    <v-navigation-drawer
      v-model="drawer"
      enable-resize-watcher
      app
      dark
      color="#1D2228"
    >
      <div
        class="d-flex justify-center align-center white"
        style="padding: 14px 0"
      >
        <h2 style="cursor: pointer">
          <router-link :to="{ name: 'dashboard' }" class="logo">
            S-Camera
          </router-link>
        </h2>
      </div>
      <v-list dense class="pt-0">
        <v-list-item-content>
          <v-btn
            elevation="0"
            block
            color="lighten-2"
            dark
            class="mt-5 transparent"
            @click="logout"
          >
            Logout
            <v-list-item-icon class="mx-2">
              <v-icon>mdi-logout-variant</v-icon>
            </v-list-item-icon>
          </v-btn>
        </v-list-item-content>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="#FB8122" elevation="0">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Hi, {{ getFullName }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn text disabled>
          {{ getEmail }}
        </v-btn>
        <v-btn @click="logout" text>Logout</v-btn>
      </v-toolbar-items>
    </v-app-bar>
    <slot name="children"></slot>
  </v-app>
</template>

<script>
export default {
  name: "BaseLayout",
  data: () => ({
    drawer: true,
  }),

  methods: {
    logout() {
      this.$store.commit("logout");
    },
  },
  computed: {
    getFullName() {
      return (
        this.$store.state.auth.user?.firstName +
        " " +
        this.$store.state.auth.user?.lastName
      );
    },
    getEmail() {
      return this.$store.state.auth.user?.email;
    },
  },
};
</script>

<style>
.logo {
  text-decoration: none;
  color: #000 !important;
  font-size: 1.5rem;
}
</style>
