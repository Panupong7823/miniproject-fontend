<template>
  <v-container>
    <v-text-field
      v-model="searchTerm"
      label="Search"
      outlined
      @input="filterCards"
    ></v-text-field>
    <v-row>
      <v-col
        v-for="(card, index) in visibleCards"
        :key="index"
        cols="12"
        md="4"
      >
        <v-card
          class="mx-auto"
          max-width="344"
          @click="navigateToSelectPage(card)"
          :class="{ unavailable: card.piece === 0 }"
        >
          <v-img :src="getImageUrl(card.photoData)" height="200px"></v-img>
          <v-card-title>{{ card.productname }}</v-card-title>
          <v-card-subtitle v-if="card.piece === 0"
            >Out of Stock</v-card-subtitle
          >
        </v-card>
      </v-col>
    </v-row>
    <div class="text-center">
      <v-container>
        <v-row justify="center">
          <v-col cols="4">
            <v-container class="max-width">
              <v-pagination
                v-model="page"
                class="my-4"
                :length="totalPages"
              ></v-pagination>
            </v-container>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </v-container>
</template>

<script>


export default {
  
  data() {
    return {
      cards: [],
      page: 1,
      itemsPerPage: 9,
      searchTerm: "",
      visibleCards: [], 
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.cards.length / this.itemsPerPage);
    },
  },
  methods: {
    async ProductData() {
      try {
        const response = await this.axios.get("http://localhost:9009/Product");
        this.cards = response.data;
        this.filterCards(); 
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    },
    navigateToSelectPage(card) {
      this.$router.push({
        path: `/edit/${card.productid}`,
      });
    },
    getImageUrl(photoData) {
      return `data:image/jpeg;base64,${photoData}`;
    },
    filterCards() {
      this.visibleCards = this.cards.filter((card) => {
        return card.productname
          .toLowerCase()
          .includes(this.searchTerm.toLowerCase());
      });
    },
  },
  created() {
    this.ProductData();
  },
};
</script>

<style>
.unavailable {
  opacity: 0.5;
  cursor: not-allowed;
  filter: grayscale(100%);
}
</style>
