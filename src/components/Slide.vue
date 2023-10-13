<template>
   <v-carousel
    cycle
    height="500"
    width="100%"
    hide-delimiters
    show-arrows-on-hover :show-arrows="false"
  >
    <v-carousel-item
      v-for="(item,i) in items"
      :key="i"
      :src="item.src"
    ></v-carousel-item>
  </v-carousel>
</template>
<script>
  export default {
    data () {
      return {
        items: [
         {
            src: 'https://dotesports.com/wp-content/uploads/2023/05/Dot-Esports-Image-2023-05-01T015930.309.jpg',
          },
          {
            src: 'https://www.pcinvasion.com/wp-content/uploads/2023/08/Kafka-honkai-star-rail-e1691528930553.png?fit=1200%2C675',
          },
          {
            src: 'https://www.pockettactics.com/wp-content/sites/pockettactics/2023/01/honkai-star-rail-kafka-5.jpg',
          },
          {
            src: 'https://www.gameskinny.com/wp-content/uploads/2023/05/honkai-star-rail-beat-kafka-guide.jpg?w=1200',
          },
        ],
      }
    },
  }
</script>