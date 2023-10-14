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
                <v-card-title>{{ card.product.price }} baht</v-card-title>
                <v-card-title>{{ card.quantity }} piece</v-card-title>
                <v-card-title>{{ formatTime(card.date_book) }} </v-card-title>
                <div
                  class="selected-card-number"
                  v-if="isSelected(card.reviewID)"
                >
                  {{ selectedCardsCount() }}
                </div>
              </v-col>
            </v-row>
          </v-card>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
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
      cards: [],
      selectedCardIds: [],
    };
  },
  mounted() {
    this.Bookings();
  },
  methods: {
    Bookings() {
      const user = JSON.parse(localStorage.getItem("auth"));
      const userId = user.userID;
      axios
        .get(`http://localhost:9009/book/${userId}`)
        .then((response) => {
          this.cards = response.data;
        })
        .catch((error) => {
          console.error("เกิดข้อผิดพลาดในการดึงข้อมูล:", error);
        });
    },
    getImageUrl(photoData) {
      return `data:image/jpeg;base64,${photoData}`;
    },
    formatTime(timestamp) {
      const date = new Date(timestamp);
      const formattedDate = `${getYear(date)}/${getMonth(date) + 1}/${getDate(
        date
      )}`;
      const formattedTime = `${getHours(date)}:${getMinutes(date)}:${getSeconds(
        date
      )}`;
      return `Date: ${formattedDate} Time: ${formattedTime}`;
    },
    isSelected(reviewID) {
      return this.selectedCardIds.includes(reviewID);
    },
    toggleCardSelection(reviewID) {
      const index = this.selectedCardIds.indexOf(reviewID);
      if (index !== -1) {
        this.selectedCardIds.splice(index, 1);
      } else {
        this.selectedCardIds.push(reviewID);
      }
    },
    selectedCardsCount() {
      const count = this.selectedCardIds.length; 
      console.log("จำนวนการ์ดที่เลือก:", count); 
      return count;
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
</style>
