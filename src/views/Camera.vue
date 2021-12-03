<template>
  <BaseLayout>
    <template v-slot:children>
      <camera-detail
        :camera-detail="getOneCamera"
        :snapshot="getCameraSnapshot"
      />
    </template>
  </BaseLayout>
</template>

<script>
import BaseLayout from "./../components/layout/Base.vue";
import CameraDetail from "./../components/camera/CameraDetail.vue";
export default {
  name: "CameraPage",
  components: {
    CameraDetail,
    BaseLayout,
  },

  computed: {
    getOneCamera() {
      return this.$store.state.cameras.all[this.$route.params.id];
    },
    getCameraSnapshot() {
      return this.$store.state.cameras.snapshots[this.$route.params.id];
    },
  },
};
</script>

<style lang="scss" scoped></style>
