<template>
   <v-carousel
    cycle
    height="600px"
    width="100%"
    hide-delimiters
    show-arrows-on-hover :show-arrows="false"
  >
    <v-carousel-item
      v-for="(item, i) in products"
      :key="i"
      :src="getImageUrl(item.photoData)"
    ></v-carousel-item>
  </v-carousel>
</template>
<script>
import axios from 'axios';

export default {
  data () {
    return {
      products: [],
    };
  },
  created() {
    this.Products();
  },
  methods: {
    async Products() {
      try {
        const response = await axios.get('http://localhost:9009/Product');
        this.products = response.data;
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }, getImageUrl(photoData) {
      return `data:image/jpeg;base64,${photoData}`;
    },
  },
};
</script>
