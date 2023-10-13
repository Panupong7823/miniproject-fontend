<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card style="height: 100%; width: 100%">
          <v-card-title
            style="font-size: 40px; text-align: center; justify-content: center"
          >
            Add Product
          </v-card-title>
          <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field
                v-model="productname"
                label="Product Name"
                required
                outlined
              ></v-text-field>
              <v-text-field
                v-model="price"
                label="Price"
                required
                outlined
              ></v-text-field>
              <v-text-field
                v-model="detail"
                label="Detail"
                required
                outlined
              ></v-text-field>
              <v-text-field
                v-model="piece"
                label="Piece"
                required
                outlined
              ></v-text-field>
              <v-file-input
                :rules="rules"
                accept="image/png, image/jpeg, image/bmp"
                placeholder="Pick an Photo"
                prepend-icon="mdi-camera"
                label="Photo"
                @change="selectPhoto"
                outlined
              ></v-file-input>
              <v-btn
                :disabled="!valid"
                color="dark"
                class="mr-4"
                block
                @click="addProduct"
                style="display: flex; justify-content: center"
              >
                Add Product
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Swal from "sweetalert2";

export default {
  data() {
    return {
      valid: true,
      productname: "",
      price: "",
      detail: "",
      piece: 0,
      photo: null,
      rules: [
        (value) =>
          !value ||
          value.size < 2000000 ||
          "Photo size should be less than 2 MB!",
      ],
    };
  },

  methods: {
    async addProduct() {
      try {
        const data = new FormData();
        data.append(
          "body",
          JSON.stringify({
            productname: this.productname,
            price: this.price,
            detail: this.detail,
            piece: this.piece,
          })
        );
        data.append("photo", this.photo);
        const response = await this.axios.post(
          "http://localhost:9009/Productphoto",
          data,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log("FormData content:", data);

        if (response.status === 201) {
          this.$router.push("/home");
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Add Product Success",
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          this.showErrorToast("Unable to add the product. Please try again.");
        }
      } catch (error) {
        console.error(error);
        this.showErrorToast("An error occurred. Please try again later.");
      }
    },
    selectPhoto(file) {
      this.photo = file;
    },
  },
};
</script>
