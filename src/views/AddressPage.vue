<template>
  <v-app>
    <v-container>
      <br />
      <v-card-title style="font-size: 40px;">Don't forget to pay!!</v-card-title>
      <v-col class="col-12" style="margin-top: 40px;">
        <v-expansion-panels class="no-border">
          <v-expansion-panel >
            <v-expansion-panel-header style="font-size: 32px;"> Adrees </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-form ref="form" v-model="valid" lazy-validation>
                <v-text-field
                  v-model="name"
                  label="Building number, alley, road, and other details"
                  required
                  outlined
                ></v-text-field>
                <v-text-field
                  v-model="name"
                  label=" Zip code"
                  required
                  outlined
                ></v-text-field>
                <v-text-field
                  v-model="name"
                  label="Subdistrict, District,Province"
                  required
                  outlined
                ></v-text-field>
                <v-btn
                  :disabled="!valid"
                  color="success"
                  class="mr-4"
                  @click="validate"
                >
                next
                </v-btn>
              </v-form>
              
            </v-expansion-panel-content>
          </v-expansion-panel>
           <v-expansion-panel>
            <v-expansion-panel-header style="font-size: 32px;"> Payment </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-form ref="form" v-model="valid" lazy-validation>
                <v-text-field
                  v-model="name"
                  label="Building number, alley, road, and other details"
                  required
                  outlined
                ></v-text-field>
                <v-text-field
                  v-model="name"
                  label=" Zip code"
                  required
                  outlined
                ></v-text-field>
                <v-text-field
                  v-model="name"
                  label="Subdistrict, District,Province"
                  required
                  outlined
                ></v-text-field>
                <v-btn
                  :disabled="!valid"
                  color="success"
                  class="mr-4"
                  @click="validate"
                >
                next
                </v-btn>
              </v-form>
              
            </v-expansion-panel-content>
            
          </v-expansion-panel>
        </v-expansion-panels>
        <v-btn
                  :disabled="!valid"
                  color="success"
                  class="mr-4"
                  @click="validate"
                  style="margin-top: 100px;"
                  block
                >
                submit
                </v-btn>
      </v-col>
    </v-container>
  </v-app>
</template>

<style>
.no-border {
  /* border: 0; */
  margin-left: 0;
  margin-right: 0;
}
</style>
