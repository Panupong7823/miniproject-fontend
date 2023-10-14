<template>
  <v-container
    class="d-flex justify-content-between mt-5 flex-nowrap flex-column"
  >
    <v-row>
      <v-card-title
        style="font-size: 52px; text-align: center; justify-content: center"
        >History</v-card-title
      >
      <v-col cols="12" v-for="card in cards" :key="card.reviewID">
        <v-container>
          <v-card
            :class="{ 'selected-card': isSelected(card.reviewID) }"
            style="max-width: 1200px"
            @click="toggleCardSelection(card.reviewID)"
          >
            <v-row>
              <v-col cols="12" md="6" pa-5>
                <v-img
                  :src="getImageUrl(card.product.photoData)"
                  height="300px"
                  width="500px"
                  class="mx-auto text-center"
                ></v-img>
              </v-col>
              <v-col>
                <v-card-title style="font-size: 32px">{{
                  card.product.productname
                }}</v-card-title>
                <v-card-subtitle>{{ card.product.detail }}</v-card-subtitle>
                <v-card-title>{{ formatTime(card.date_book) }} </v-card-title>
                <v-card-title style="padding-bottom: 0">
                  Amount {{ card.quantity.toLocaleString() }} piece
                </v-card-title>
                <v-card-title
                  >Price {{ card.total.toLocaleString() }} baht</v-card-title
                >
                <div
                  class="selected-card-number"
                  v-if="isSelected(card.reviewID)"
                ></div>
              </v-col>
            </v-row>
          </v-card>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import {
  format,
  getDate,
  getMonth,
  getYear,
  getHours,
  getMinutes,
  getSeconds,
} from "date-fns";

export default {
  data() {
    return {
      dialog: false,
      cards: [],
      selectedCardId: [],
      loader: null,
      loading: false,
    };
  },
  computed: {
    selectedCards() {
      return this.cards.filter((card) =>
        this.selectedCardId.includes(card.reviewID)
      );
    },
  },
  watch: {
    loader() {
      const l = this.loader;
      this[l] = !this[l];

      setTimeout(() => (this[l] = false), 3000);

      this.loader = null;
    },
  },
  created() {
    this.Bookings();
  },

  methods: {
    async Bookings() {
      const user = JSON.parse(localStorage.getItem("auth"));
      const userId = user.userID;
      try {
        const response = await this.axios.get(
          `http://localhost:9009/book/paid/${userId}`
        );
        this.cards = response.data;
      } catch (error) {
        console.error("เกิดข้อผิดพลาดในการดึงข้อมูล:", error);
      }
    },
    async updateBookingStatus() {
      const selectedReviewID = this.selectedCardId;
      const user = JSON.parse(localStorage.getItem("auth"));
      const userId = user.userID;
      const request = selectedReviewID.map((reviewID) => ({
        reviewID,
        status: "0",
      }));
      this.loading = true;
      await this.axios
        .put(`http://localhost:9009/book/${userId}`, request)
        .then((response) => {
          this.$router.push({ path: `/listproduct/${userId}` }).catch(() => {});

          console.log(response.data);
          this.loading = false;
        })
        .catch((error) => {
          console.error("Error updating statuses:", error);
          this.loading = false;
        });
    },
    getImageUrl(photoData) {
      return `data:image/jpeg;base64,${photoData}`;
    },
    formatTime(timestamp) {
      const date = new Date(timestamp);
      const formattedDate = `${getDate(date)}/${getMonth(date) + 1}/${getYear(
        date
      )}`;
      const formattedTime = `${getHours(date)}:${getMinutes(date)}:${getSeconds(
        date
      )}`;
      return `Date: ${formattedDate} Time: ${formattedTime}`;
    },
    isSelected(reviewID) {
      return this.selectedCardId.includes(reviewID);
    },
    toggleCardSelection(reviewID) {
      const index = this.selectedCardId.indexOf(reviewID);
      if (index !== -1) {
        this.selectedCardId.splice(index, 1);
      } else {
        this.selectedCardId.push(reviewID);
      }
    },
    totalSelectedCard() {
      return this.cards
        .filter(
          (card) =>
            this.selectedCardId.includes(card.reviewID) && card.total !== null
        )
        .reduce((total, card) => total + card.total, 0);
    },
  },
};
</script>

<style>
.selected-card-number {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: rgb(252, 253, 253);
  padding: 5px 10px;
  border-radius: 20px;
  font-weight: bold;
  color: rgb(0, 0, 0);
}

.total-selected-cards {
  position: absolute;
  bottom: 10px;
  right: 10px;
  font-weight: bold;
}
</style>
