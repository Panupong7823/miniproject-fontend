<template>
  <v-container>
    <v-row>
      <v-btn class="mr-auto" @click="goBack"> cancle </v-btn>
      <v-btn class="ml-auto" @click="goDelete"> delete </v-btn>
      <v-col cols="12">
        <v-card style="height: 100%; width: 100%">
          <v-card-title
            style="font-size: 40px; text-align: center; justify-content: center"
          >
            Edit Product
          </v-card-title>

          <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field
                v-model="product.productname"
                label="Product Name"
                required
                outlined
              ></v-text-field>
              <v-text-field
                v-model="product.price"
                label="Price"
                required
                outlined
              ></v-text-field>
              <v-text-field
                v-model="product.detail"
                label="Detail"
                required
                outlined
              ></v-text-field>
              <v-text-field
                v-model="product.piece"
                label="Piece"
                required
                outlined
              ></v-text-field>
              <v-btn
                :disabled="!valid"
                color="dark"
                class="mr-4"
                block
                @click="updateProduct"
                style="display: flex; justify-content: center"
              >
                Update Product
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
      product: {
        productname: "",
        price: "",
        detail: "",
        piece: 0,
        photo: null,
      },
    };
  },
  created() {
    const productid = this.$route.params.productid;
    this.getProductById(productid);
  },
  methods: {
    async getProductById(productid) {
      try {
        const response = await this.axios.get(
          `http://localhost:9009/Product/${productid}`
        );

        if (response.status === 200) {
          this.product = response.data;
        } else {
          this.showErrorToast("Product not found. Please try again.");
        }
      } catch (error) {
        console.error(error);
        this.showErrorToast("An error occurred. Please try again later.");
      }
    },
    async updateProduct() {
      try {
        const productid = this.$route.params.productid;

        const data = {
          productname: this.product.productname,
          price: this.product.price,
          detail: this.product.detail,
          piece: this.product.piece,
        };

        const response = await this.axios.put(
          `http://localhost:9009/Product/${productid}`,
          data
        );

        if (response.status === 200) {
          this.$router.push("/home/admin");
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Product updated successfully",
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          this.showErrorToast(
            "Unable to update the product. Please try again."
          );
        }
      } catch (error) {
        console.error(error);
        this.showErrorToast("An error occurred. Please try again later.");
      }
    },
    async goDelete() {
      try {
        const productid = this.$route.params.productid;
        const response = await this.axios.delete(
          `http://localhost:9009/Product/${productid}`
        );

        if (response.status === 200) {
          this.$router.push("/home/admin");
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Product deleted successfully",
            showConfirmButton: false,
            timer: 1500,
          });
        } else if (response.status === 400) {
          this.showErrorToast("Product Not Found");
        } else {
          this.showErrorToast(
            "Unable to delete the product. Please try again."
          );
        }
      } catch (error) {
        console.error(error);
        this.showErrorToast("An error occurred. Please try again later.");
      }
    },
    goBack() {
      this.$router.push("/home/admin");
    },
    selectPhoto(file) {
      this.product.photo = file;
    },
    showErrorToast(message) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: message,
      });
    },
  },
};
</script>
