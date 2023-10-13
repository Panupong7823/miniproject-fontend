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
                <v-toolbar-title>User</v-toolbar-title>
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
          </v-data-table>
          <v-dialog v-model="dialog" max-width="500px">
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row style="margin-top: 10px">
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        v-model="firstname"
                        label="Firstname"
                        outlined
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        v-model="lastname"
                        label="Lastname"
                        outlined
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        v-model="username"
                        label="Username"
                        outlined
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        v-model="tel"
                        label="Telephone"
                        outlined
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
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
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5"
                >Are you sure you want to delete this item?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete"
                  >Cancel</v-btn
                >
                <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                  >OK</v-btn
                >
                <v-spacer></v-spacer>
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
    firstname: "",
    lastname: "",
    username: "",
    tel: "",
    password:"",
    dialog: false,
    dialogDelete: false,
    headers: [
      { text: "Firstname", value: "firstname" },
      { text: "Lastname", value: "lastname" },
      { text: "Telephone", value: "tel" },
      { text: "Actions", value: "actions", sortable: false },
    ],

    desserts: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0,
    },
    defaultItem: {
      name: "",
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0,
    },
    formTitle: "",
    IdUser: "",
    IdForDelete:''
  }),

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
    this.initialize();
  },

  methods: {
    async initialize() {
      this.userList = [];
      try {
        const data = await this.axios.get("http://localhost:9009/user");
        console.log("user", data);
        this.userList = data.data;
      } catch (error) {}
    },

    editItem(item) {
      console.log("item select", item);
      this.editedIndex = this.employeeItem.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.idforDelete = item.userID;
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.desserts.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.firstname = "";
      this.lastname = "";
      this.username = "";
      this.tel = "";
      
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    openDialog(Actions, item) {
      this.formTitle = "";
      if (Actions === "edit") {
        this.formTitle = "edit";
        this.dialog = true;
        this.firstname = item.firstname;
        this.lastname = item.lastname;
        this.username = item.username;
        this.tel = item.tel;
        this.IdUser = item.userID;
        this.password = item.password;
      }
    },

    async save(action) {
      var data = {
        firstname: this.firstname,
        lastname: this.lastname,
        username: this.username,
        tel: this.tel,
        password:this.password
      };
      if (action === "edit") {
        try {
          var dataResponse = await this.axios.put(
            "http://localhost:9009/user/" + this.IdUser,
            data
          );
          console.log("dataResponse ====>", dataResponse);
          this.close();
          this.initialize();
        } catch (error) {
          console.log(error.message);
        }
      }
    },
  },
};
</script>
