<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <Login />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Login from "@/components/auth/Login.vue";
export default {
  name: "LoginPage",
  components: { Login },
};
</script>

<style lang="scss" scoped></style>
