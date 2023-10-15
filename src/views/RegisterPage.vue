<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card style="height: 100%; width: 100%">
          <v-card-title
            style="font-size: 40px; text-align: center; justify-content: center"
            >Resgister</v-card-title
          >
          <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field
                v-model="firstname"
                label="Firstname"
                required
                outlined
              ></v-text-field>
              <v-text-field
                v-model="lastname"
                label="Lastname"
                required
                outlined
              ></v-text-field>
              <v-text-field
                v-model="tel"
                label="Telephone"
                required
                outlined
              ></v-text-field>
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
              <v-text-field
                v-model="confirmPassword"
                :rules="confirmPasswordRules"
                label="Confirm Password"
                type="password"
                required
                outlined
              ></v-text-field>
              <v-text-field
                v-model="address"
                label="address"
                required
                outlined
              ></v-text-field>
              <v-text-field
                v-model="province"
                label="Province"
                required
                outlined
              ></v-text-field>
              <v-btn
                :disabled="!valid"
                color="dark"
                class="mr-4"
                block
                @click="validate"
                style="display: flex; justify-content: center"
              >
                confirm
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      valid: true,
      username: "",
      password: "",
      confirmPassword: "",
      firstname: "",
      lastname: "",
      tel: "",
      address: "",
      province: "",
      nameRules: [
        (v) => !!v || "Please enter your username.",
        (v) =>
          (v && v.length >= 4) ||
          "Please enter your username, must not exceed 4 characters.",
      ],
      passwordRules: [(v) => !!v || "Please enter your password"],
      confirmPasswordRules: [
        (v) => v === this.password || "Passwords do not match",
      ],
    };
  },

  methods: {
    async validate() {
      if (this.$refs.form.validate()) {
        try {
          const response = await this.axios.post(
            "http://localhost:9009/registration",
            {
              username: this.username,
              password: this.password,
              firstname: this.firstname,
              lastname: this.lastname,
              tel: this.tel,
              address: this.address,
              province: this.province,
              userType: "1",
            }
          );

          if (response.status === 201) {
            this.$router.push("/");
          } else {
            this.$toast.error("Registration failed. Please try again.");
          }
        } catch (error) {
          console.error(error);
          this.$toast.error("An error occurred. Please try again later.");
        }
      }
    },
  },
};
</script>





