<template>
  <v-container>
    <v-card elevation="0" class="mt-10">
      <v-container>
        <v-flex>
          <h1 class="text--secondary">Cameras</h1>
        </v-flex>
      </v-container>
    </v-card>

    <v-row>
      <camera
        v-for="camera in getAccountCameras"
        :key="camera.cameraId"
        :camera="camera"
      />
    </v-row>
  </v-container>
</template>

<script>
import Camera from "../camera/Camera.vue";

export default {
  name: "CameraGrid",
  components: { Camera },
  created() {
    this.$store.dispatch("getAccountCameras");
  },
  computed: {
    getAccountCameras() {
      return this.$store.getters["getAccountCameras"];
    },
    getCameraSnapshots() {
      return this.$store.getters["getCameraSnapshots"];
    },
  },
};
</script>

<style lang="scss" scoped></style>
