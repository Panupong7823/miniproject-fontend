<template>
  <v-card id="create">
    <v-speed-dial
      v-model="fab"
      :top="top"
      :bottom="bottom"
      :right="right"
      class="bottom-nv"
    >
      <template v-slot:activator>
        <v-btn v-model="fab" color="dark" dark fab>
          <v-icon v-if="fab"> mdi-close </v-icon>
          <v-icon v-else> mdi-account-circle </v-icon>
        </v-btn>
      </template>
      <v-btn fab dark small color="dark" @click="handleHome">
        <v-icon>mdi-home</v-icon>
      </v-btn>
      <v-btn fab dark small color="dark" @click="handleAdd">
        <v-icon>mdi-cursor-default</v-icon>
      </v-btn>
      <v-btn fab dark small color="dark" @click="handleShop">
        <v-icon>mdi-shopping</v-icon>
      </v-btn>
      <v-btn fab dark small color="dark" @click="handleLogout">
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-speed-dial>
  </v-card>
</template>
<script>
export default {
  data: () => ({
    direction: "top",
    fab: false,
    fling: false,
    hover: false,
    tabs: null,
    top: false,
    right: true,
    bottom: true,
    left: false,
    transition: "slide-y-reverse-transition",
  }),
  methods: {
    handleHome() {
      if (this.$route.path != "/home") {
        this.$router.push({ path: "/home" }).catch(() => {});
      }
    },
    handleShop() {
      const user = JSON.parse(localStorage.getItem("auth"));
      const userId = user.userID;
      if (this.$route.path != `/listproduct/${userId}`) {
        this.$router.push({ path: `/listproduct/${userId}` }).catch(() => {});
      }
    },
    handleAdd() {
      if (this.$route.path != "/addproduct") {
        this.$router.push({ path: "/addproduct" }).catch(() => {});
      }
    },
    handleLogout() {
      if (this.$route.path !== "/้") {
        localStorage.removeItem("auth");
        this.$router.replace("/");
        window.location.reload();
      }
    },
  },
  watch: {
    top(val) {
      this.bottom = !val;
    },
    right(val) {
      this.left = !val;
    },
    bottom(val) {
      this.top = !val;
    },
    left(val) {
      this.right = !val;
    },
  },
};
</script>
<style>
#create .v-speed-dial {
  position: absolute;
}

#create .v-btn--floating {
  position: relative;
}
#create .bottom-nv {
  position: fixed;
  bottom: 10px;
  right: 10px;
  margin-bottom: 10px;
  margin-right: 10px;
}
</style>