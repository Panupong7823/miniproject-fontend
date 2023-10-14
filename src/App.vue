<template>
  <v-app>
    <Bar />
    <v-main>
      <router-view />
      <ButtomNV v-if="isShow" />
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import Bar from "../src/components/Bar.vue";
import Footer from "../src/components/Footer.vue";
import Slide from "../src/components/Slide.vue";
import ButtomNV from "./components/ButtomNV.vue";

export default {
  name: "App",
  components: {
    Bar,
    Footer,
    Slide,
    ButtomNV,
  },
  computed: {
    isShow() {
      return !!localStorage.getItem("auth");
    },
  },
};
</script>
