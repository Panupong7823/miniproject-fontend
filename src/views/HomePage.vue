<template>
  <v-container>
    <Slide />
    <br /><br />
    <v-row>
      <v-col v-for="(card, index) in cards" :key="index" cols="12" md="4">
        <v-card
          class="mx-auto"
          max-width="344"
          @click="navigateToSelectPage(card)"
        >
          <v-img :src="getImageUrl(card.photoData)" height="200px"></v-img>
          <v-card-title>{{ card.productname }}</v-card-title>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Slide from "../components/Slide.vue";
import axios from "axios";

export default {
  components: {
    Slide,
  },
  data() {
    return {
      cards: [],
    };
  },
  mounted() {
    this.ProductData();
  },
  methods: {
    ProductData() {
      axios
        .get("http://localhost:9009/Product")
        .then((response) => {
          this.cards = response.data;
        })
        .catch((error) => {
          console.error("Error fetching product data:", error);
        });
    },
    navigateToSelectPage(card) {
      this.$router.push({
        path: `/select/${card.productid}`,
      });
    },
    getImageUrl(photoData) {
      return `data:image/jpeg;base64,${photoData}`;
    },
  },
};
</script>
