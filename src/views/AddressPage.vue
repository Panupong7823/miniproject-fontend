<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card style="height: 100%; width: 100%">
          <v-card-title
            style="font-size: 40px; text-align: center; justify-content: center"
            >Payment</v-card-title
          >
          <v-card-text>
            <v-form ref="form">
              <v-select
                :items="payment"
                label="Choose payment"
                outlined
                v-model="selectedPayment"
              ></v-select>
              <v-select
                v-if="selectedPayment === 'Payment upon delivery'"
                :items="bank"
                label="Bank"
                outlined
                v-model="selectedBank"
              ></v-select>
              <v-text-field
                label="Amount"
                required
                outlined
                v-model="totalCardValue"
                readonly
              ></v-text-field>
              <v-btn
                color="dark"
                class="mr-4"
                block
                @click="updateBookingStatus"
                style="display: flex; justify-content: center"
                >Confirm</v-btn
              >
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      selectedIds: "",
      totalCardValue: "",
      payment: ["Payment upon delivery", "Transfer money"],
      bank: [
        "Bank of Thailand  ( BOT )",
        "BANGKOK BANK PUBLIC COMPANY LIMITED  ( BBL )",
        "Kasikornbank Public Company Limited  ( KBank )",
        "Krungthai Bank Public Company Limited  ( KTB )",
      ],
      selectedPayment: null,
      selectedBank: null,
    };
  },
  created() {
    this.selectedIds = this.$route.params.selectedIds;
    this.totalCardValue = this.$route.params.totalCardValue;
    console.log(this.selectedIds);
    this.DataBookings();
  },
  methods: {
    async DataBookings() {
      try {
        const response = await this.axios.get(
          `http://localhost:9009/book/${this.selectedIds}`
        );
        this.bookings = response.data;
        console.log("Response", response.data);

        this.bookings.forEach((booking) => {
          const quantity = booking.quantity;
          const productid = booking.product.productid;
          console.log(`Quantity: ${quantity}, Product ID: ${productid}`);
        });
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    },

    async updateBookingStatus() {
      const selectedReviewID = this.selectedIds
        .split(",")
        .map((id) => id.trim());
      if (Array.isArray(selectedReviewID)) {
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
            this.$router
              .push({ path: `/listpaid/${userId}` })
              .catch(() => {});
            console.log(response.data);

            this.bookings.forEach((booking) => {
              const quantity = booking.quantity;
              const productId = booking.product.productid;
              if (quantity !== null) {
                this.updateProductPiece(productId, quantity);
              }
            });

            this.loading = false;
          })
          .catch((error) => {
            console.error("Error updating statuses:", error);
            this.$set(this, "loading", false);
          });
      } else {
        console.error("selectedReviewID is not an array.");
      }
    },
    async updateProductPiece(productId, quantity) {
      try {
        await this.axios.put(
          `http://localhost:9009/Product/Piece/${productId}`,
          {
            change: quantity,
          }
        );
      } catch (error) {
        console.error("Error updating product piece:", error);
      }
    },
  },
};
</script>
