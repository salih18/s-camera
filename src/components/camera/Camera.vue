<template>
  <v-card class="ma-2" max-width="300">
    <v-img
      class="white--text align-end"
      height="300px"
      width="300px"
      :src="camera.snapshot"
    >
      <v-card-title>{{ camera.name }}</v-card-title>
    </v-img>

    <v-row>
      <v-col md="6">
        <v-card-subtitle
          ><span class="font-weight-black">ID:</span> {{ camera.cameraId }}
        </v-card-subtitle>
      </v-col>
      <v-spacer></v-spacer>
      <v-col>
        <v-chip
          :color="camera.online ? 'green' : 'red'"
          class="mt-3 white--text"
          label
          >{{ camera.online ? "Online" : "Offline" }}</v-chip
        >
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: "Camera",
  props: {
    camera: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss"></style>
