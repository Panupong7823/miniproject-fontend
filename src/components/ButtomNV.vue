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
      <v-btn
        block
        dark
        class="custom-button"
        color="dark"
        @click="handleHome"
        v-if="userType !== '0'"
      >
        <v-icon>mdi-home</v-icon>
        home
      </v-btn>
      <v-btn
        block
        dark
        class="custom-button"
        color="dark"
        @click="handleAdd"
        v-if="userType !== '1'"
      >
        <v-icon>mdi-cursor-default</v-icon>
        increase
      </v-btn>
      <v-btn
        block
        dark
        class="custom-button"
        color="dark"
        @click="handleEditUser"
      >
        <v-icon> mdi-account-box-outline</v-icon>
        edituser
      </v-btn>
      <v-btn
        block
        dark
        class="custom-button"
        color="dark"
        @click="handleShop"
        v-if="userType !== '0'"
      >
        <v-icon>mdi-shopping</v-icon>
        payment
      </v-btn>
      <v-btn
        block
        dark
        class="custom-button"
        color="dark"
        @click="handleHistory"
        v-if="userType !== '0'"
      >
        <v-icon>mdi-clipboard-text</v-icon>
        history
      </v-btn>

      <v-btn
        block
        dark
        class="custom-button"
        color="dark"
        @click="handleLogout"
      >
        <v-icon>mdi-logout</v-icon>
        logout
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
    userType: null,
  }),
  created() {
    const userData = JSON.parse(localStorage.getItem("auth"));
    if (userData) {
      this.userType = userData.userType;
    }
  },
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
    handleHistory() {
      const user = JSON.parse(localStorage.getItem("auth"));
      const userId = user.userID;
      if (this.$route.path != `/listpaid/${userId}`) {
        this.$router.push({ path: `/listpaid/${userId}` }).catch(() => {});
      }
    },
     handleEditUser() {
      const user = JSON.parse(localStorage.getItem("auth"));
      const userId = user.userID;
      if (this.$route.path != `/manage/${userId}`) {
        this.$router.push({ path: `/manage/${userId}` }).catch(() => {});
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
  right: 50px;
  margin-bottom: 10px;
  margin-right: 10px;
}
.custom-button {
  height: 40px;
  width: 120px;
}
</style>