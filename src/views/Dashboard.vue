<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
      <!--  -->
    </v-navigation-drawer>

    <v-app-bar app>
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
  </v-app>
</template>

<script>
export default {
  data: () => ({ drawer: null }),
  methods: {
    logout() {
      this.$router.push({ path: "login" });
      this.$store.commit("logout");
    },
  },
  computed: {
    getFullName() {
      return (
        this.$store.state.user.data?.firstName +
        " " +
        this.$store.state.user.data?.lastName
      );
    },
    getEmail() {
      return this.$store.state.user.data?.email;
    },
  },
};
</script>
