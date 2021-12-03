<template>
  <v-card :loading="false" class="mx-auto my-12" max-width="600">
    <v-img height="400" :src="snapshot">
      <v-card-title class="white--text">{{ cameraDetail.name }}</v-card-title>
    </v-img>
    <v-system-bar></v-system-bar>

    <v-row>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-col>
        <v-chip
          :color="cameraDetail.online ? 'green' : 'red'"
          class="mt-3 white--text"
          label
          >{{ cameraDetail.online ? "Online" : "Offline" }}</v-chip
        >
      </v-col>
    </v-row>

    <v-container class="mt-3">
      <v-row>
        <v-col cols="6">
          <p class="header">Camera Id</p>
        </v-col>
        <v-col cols="6">
          <p class="header-val">{{ cameraDetail.cameraId }}</p>
        </v-col>
        <v-col cols="6">
          <p class="header">Account Id</p>
        </v-col>
        <v-col cols="6">
          <p class="header-val">{{ cameraDetail.accountId }}</p>
        </v-col>
        <v-col cols="6">
          <p class="header">Device Type Id</p>
        </v-col>
        <v-col cols="6">
          <p class="header-val">{{ cameraDetail.deviceTypeId }}</p>
        </v-col>
        <v-col cols="6">
          <p class="header">Recording On Cloud</p>
        </v-col>
        <v-col cols="6">
          <p class="header-val">
            {{ cameraDetail.recordingOnCloud ? "Yes" : "No" }}
          </p>
        </v-col>
        <v-col cols="6">
          <p class="header">Mac Address</p>
        </v-col>
        <v-col cols="6">
          <p class="header-val">
            {{ cameraDetail.ethMacAddress }}
          </p>
        </v-col>
        <v-col cols="6">
          <p class="header">Audio Enabled</p>
        </v-col>
        <v-col cols="6">
          <p class="header-val">
            {{ cameraDetail.audioEnabled ? "Yes" : "No" }}
          </p>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
export default {
  name: "CameraDetail",
  props: {
    cameraDetail: {
      type: Object,
      required: true,
    },
    snapshot: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  font-size: 1rem;
  padding-left: 1rem;
  font-weight: 700;
  margin-bottom: 2px;
}

.header-val {
  text-align: center;
}
</style>
