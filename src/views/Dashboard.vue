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
        <h2>S-Camera</h2>
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
    <v-container>
      <v-card elevation="0" class="mt-10">
        <v-container>
          <v-flex>
            <h1 class="text--secondary">Cameras</h1>
          </v-flex>
        </v-container>
      </v-card>
    </v-container>
    <v-container class="grey lighten-5">
      <v-row>
        <camera
          v-for="camera in getAccountCameras"
          :key="camera.cameraId"
          :camera="camera"
        />
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import Camera from "../components/camera/Camera.vue";

export default {
  data: () => ({
    drawer: true,
    items: [
      {
        action: "local_activity",
        title: "Attractions",
        path: "/",
        items: [],
      },
      {
        action: "restaurant",
        title: "Breakfast",
        path: "/breakfast",
        items: [],
      },
    ],
  }),
  components: { Camera },
  created() {
    this.$store.dispatch("getAccountCameras");
  },
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
    getAccountCameras() {
      return this.$store.getters["getAccountCameras"];
    },
  },
};
</script>
