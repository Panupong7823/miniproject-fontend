<template>
  <v-app>
    <v-card style="height: 100%; width: 100%">
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
          <v-btn color="deep-purple lighten-2" text @click="reserve">
            confirm
          </v-btn>
          <v-btn color="deep-purple lighten-2" text @click="cancel">
            cancel
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-card>
  </v-app>
</template>

<script>
import axios from "axios";

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
    };
  },
  created() {
    this.ProductDetails();
  },

  methods: {
    ProductDetails() {
      const productId = this.$route.params.productid;
      axios
        .get(`http://localhost:9009/Product/${productId}`)
        .then((response) => {
          this.card = response.data;
        })
        .catch((error) => {
          console.error("Error fetching product details:", error);
        });
    },
    getImageUrl(photoData) {
      return `data:image/jpeg;base64,${photoData}`;
    },
    reserve() {
      this.updatePieceOnServer(this.quantity);
    },
    cancel() {
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
    async updatePieceOnServer(change) {
      const productId = this.$route.params.productid;
      const user = JSON.parse(localStorage.getItem("auth"));
      const userId = user.userID; // ดึงเฉพาะ userID
      try {
        await axios.put(`http://localhost:9009/Product/Piece/${productId}`, {
          change: change,
          userId: userId, // ส่งเฉพาะ userID
        });
      } catch (error) {
        console.error("Error updating product piece:", error);
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
