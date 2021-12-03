<template>
  <BaseLayout>
    <template v-slot:children>
      <camera-grid />
    </template>
  </BaseLayout>
</template>

<script>
import BaseLayout from "../components/layout/Base.vue";
import CameraGrid from "../components/camera/CameraGrid.vue";
export default {
  name: "Dashboard",
  components: { CameraGrid, BaseLayout },
};
</script>

<style lang="scss"></style>
