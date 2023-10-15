<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <div>
          <v-data-table
            :headers="headers"
            :items="userList"
            sort-by="calories"
            class="elevation-1"
          >
            <template v-slot:top>
              <v-toolbar flat>
                <v-toolbar-title>Booking</v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-spacer></v-spacer>
              </v-toolbar>
            </template>
            <template v-slot:[`item.actions`]="{ item }">
              <v-icon small class="mr-2" @click="openDialog('edit', item)">
                mdi-pencil
              </v-icon>
              <v-icon small @click="deleteItem(item)" class="ml-2">
                mdi-delete
              </v-icon>
            </template>
            <template v-slot:no-data>
              <v-btn color="primary" @click="initialize"> Reset </v-btn>
            </template>
            <template v-slot:[`item.date_book`]="{ item }">
              {{ formatDate(item.date_book) }}
            </template>
            <template v-slot:[`item.date_receipt`]="{ item }">
              {{ formatDate(item.date_reciept) }}
            </template>
          </v-data-table>
          <v-dialog v-model="dialog" max-width="500px">
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>
              <v-card-text>
                <v-date-picker v-model="editedItem.date_reciept" scrollable>
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="editedItem.date_reciept"
                      label="Select Date and Time"
                      readonly
                      v-on="on"
                    ></v-text-field>
                  </template>
                </v-date-picker>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="save(formTitle)">
                  Save
                </v-btn>
                <v-btn color="blue darken-1" text @click="close">
                  Cancel
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    userList: [],
    dialog: false,
    headers: [
      { text: "productname", value: "productname" },
      { text: "firstname", value: "firstname" },
      { text: "lastname", value: "lastname" },
      { text: "Date_book", value: "date_book" },
      { text: "Date_reciept", value: "date_reciept" },
      { text: "quantity", value: "quantity" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    editedItem: {
      date_reciept: "",
    },
    formTitle: "",
  }),

  created() {
    this.initialize();
  },

  methods: {
    formatDate(date) {
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(date).toLocaleDateString(undefined, options);
    },
    async initialize() {
      this.userList = [];
      try {
        const data = await this.axios.get("http://localhost:9009/book");
        this.userList = data.data;

        this.userList.forEach((item) => {
          item.productname = item.product.productname;
          item.firstname = item.user.firstname;
          item.lastname = item.user.lastname;

          if (item.date_reciept) {
            item.date_reciept = this.formatDate(item.date_reciept);
          }
        });
      } catch (error) {}
    },
    openDialog(action, item) {
      this.formTitle = action;
      if (action === "edit") {
        this.dialog = true;
        this.editedItem = Object.assign({}, item);
      }
    },

    async save(action) {
      if (action === "edit") {
        const dateRecieptTimestamp = new Date(
          this.editedItem.date_reciept
        ).toISOString();
        try {
          const response = await this.axios.put(
            `http://localhost:9009/book/day/${this.editedItem.reviewID}`,
            {
              date_reciept: dateRecieptTimestamp,
            }
          );
          console.log("Data updated:", response);
          this.close();
          this.initialize();
        } catch (error) {
          console.error("Error updating data:", error);
        }
      }
    },
    async deleteItem(item) {
      try {
        const response = await this.axios.delete(
          `http://localhost:9009/book/${item.reviewID}`
        );
        console.log("Data deleted:", response);
        this.initialize();
      } catch (error) {
        console.error("Error deleting data:", error);
      }
    },

    close() {
      this.dialog = false;
      this.editedItem = {
        date_reciept: "",
      };
    },
  },
};
</script>
