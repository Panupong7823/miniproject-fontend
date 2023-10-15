<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card style="height: 100%; width: 100%" color="#121212">
          <v-card-title
            style="font-size: 40px; text-align: center; justify-content: center"
            >Login</v-card-title
          >
          <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field
                v-model="username"
                :rules="nameRules"
                label="username"
                placeholder="username"
                required
                outlined
              ></v-text-field>

              <v-text-field
                v-model="password"
                :rules="passwordRules"
                label="password"
                placeholder="password"
                type="password"
                required
                outlined
              ></v-text-field>
              <v-btn text @click="gotoRegis"> Don't have an account? </v-btn>

              <div class="text-center">
                <v-btn
                  :disabled="!valid"
                  color="dark"
                  class="mr-4"
                  @click="login"
                >
                  Login
                </v-btn>
              </div>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

export default {
  data: () => ({
    valid: true,
    username: "",
    nameRules: [
      (v) => !!v || "Please enter your username.",
      (v) =>
        (v && v.length >= 4) ||
        "Please enter your username, must not exceed 4 characters.",
    ],
    password: "",
    passwordRules: [(v) => !!v || "Please enter your password"],
  }),
  methods: {
    async login() {
      if (this.$refs.form.validate(true)) {
        const userData = {
          username: this.username,
          password: this.password,
        };

        try {
          const response = await this.axios.post(
            "http://localhost:9009/login",
            userData
          );
          console.log(userData);
          if (response.status === 200) {
            localStorage.setItem("auth", JSON.stringify(response.data));
            this.$EventBus.$emit("getAuth");
            const userData = JSON.parse(localStorage.getItem("auth"));
            const userType = userData.userType;
            if (userType === "1") {
              this.$router.push("/home");
            } else if (userType === "0") {
              this.$router.push("/home/admin");
            }
            window.location.reload();
          } else if (response.status === 401) {
            console.error("Incorrect login information.");
          } else {
            console.error("Internal server error.");
          }
        } catch (error) {
          alert("Incorrect password. Please try again.");
          console.error(error);
        }
      }
    },
    gotoRegis() {
      this.$router.push("/register");
      window.location.reload();
    },
  },
};
</script>
