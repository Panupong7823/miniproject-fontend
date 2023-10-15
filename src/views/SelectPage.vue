<template>
    <v-card style="height: 100%; width: 100%" color="#121212">
      <v-card :loading="loading" class="mx-auto my-12" max-width="600">
        <v-row>
          <v-card class="mx-auto" max-width="600">
            <v-img
              :src="card.photoData ? getImageUrl(card.photoData) : ''"
              height="400px"
            ></v-img>
          </v-card>
        </v-row>
        <v-card-title>
          <h2>{{ card.productname }}</h2>
        </v-card-title>
        <v-card-subtitle>{{ card.detail }}</v-card-subtitle>
        <v-card-title>{{ card.price }} baht</v-card-title>
        <v-card-subtitle>remaining {{ card.piece }} pieces</v-card-subtitle>
        <v-card-text>
          Quantity
          <v-btn elevation="2" class="resize-button" @click="decreaseQuantity">
            <v-icon>mdi-minus</v-icon>
          </v-btn>
          {{ quantity }}
          <v-btn elevation="2" class="resize-button" @click="increaseQuantity">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-card-text>
        <v-card-actions>
          <v-btn color="deep-purple lighten-2" text @click="confirmBooking">
            Confirm
          </v-btn>
          <v-btn color="deep-purple lighten-2" text @click="cancelBooking">
            Cancel
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-card>
</template>

<script>
import Swal from "sweetalert2";

export default {
  data() {
    return {
      loading: false,
      card: {
        productname: "",
        price: 0,
        piece: 0,
        detail: "",
      },
      quantity: 0,
      status: "1",
    };
  },
  async created() {
    await this.getProductDetails();
  },

  methods: {
    async getProductDetails() {
      const productId = this.$route.params.productid;
      try {
        const response = await this.axios.get(`http://localhost:9009/Product/${productId}`);
        this.card = response.data;
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    },
    getImageUrl(photoData) {
      return `data:image/jpeg;base64,${photoData}`;
    },
    confirmBooking() {
      if (this.quantity > 0) {
        const user = JSON.parse(localStorage.getItem("auth"));
        const userId = user.userID;
        const bookingData = {
          user: { userID: userId },
          product: { productid: this.card.productid },
          quantity: this.quantity,
          status: this.status
        };
        this.createBooking(bookingData);
      } else {
        console.warn("Quantity must be greater than 0 to make a booking.");
      }
    },
    async createBooking(bookingData) {
      try {
        const response = await this.axios.post("http://localhost:9009/book", bookingData);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Booking Success",
          showConfirmButton: false,
          timer: 1500,
        });
        this.$router.push("/home");
      } catch (error) {
        console.error("Error creating booking:", error);
      }
    },
    cancelBooking() {
      this.$router.push("/home");
    },
    increaseQuantity() {
      if (this.quantity < this.card.piece) {
        this.quantity++;
      }
    },
    decreaseQuantity() {
      if (this.quantity > 0) {
        this.quantity--;
      }
    },
  },
};
</script>

<style scoped>
.resize-button {
  width: 10px;
  height: 10px;
  font-size: 10px;
  border-radius: 10%;
  margin: 0 8px;
}
</style>