<script setup>
import { ref } from 'vue'

const theme = ref('light')

function onClick() {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}
</script>

<template>
  <v-responsive class="border rounded">
    <v-app :theme="theme">
      <v-app-bar class="px-3">
        <v-spacer></v-spacer>

        <v-btn
          :prepend-icon="theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'"
          slim
          @click="onClick"
        ></v-btn>
      </v-app-bar>

      <v-divider></v-divider>

      <v-container>
        <v-row class="d-flex justify-center">
          <v-col cols="12" md="6" class="d-flex justify-center align-center">
            <v-img :width="600" aspect-ratio="4/3" cover src="./images/EBlogo.png"></v-img>
          </v-col>
        </v-row>
      </v-container>
      <h5 class="text-center" style="font-size: 40px">Welcome to</h5>
      <p class="text-center" style="font-size: 60px">EASY BORROW</p>
      <p class="text-center" style="font-size: 20px">Share smarter, earn faster.</p>
      <v-main>
        <v-container>
          <v-row class="d-flex justify-center">
            <v-col cols="12" md="6">
              <v-card-text class="bg-surface-yellow-lighten-1">
                <v-form fast-fail @submit.prevent>
                  <v-text-field
                    label="Email"
                    variant="outlined"
                    color="black"
                    bg-color="yellow-lighten-1 rounded-5"
                  ></v-text-field>

                  <v-text-field
                    label="Lastname"
                    variant="outlined"
                    color="black"
                    bg-color="yellow-lighten-1 rounded-5"
                  ></v-text-field>

                  <v-text-field
                    label="Email"
                    variant="outlined"
                    color="black"
                    bg-color="yellow-lighten-1 rounded-5"
                  ></v-text-field>

                  <v-text-field
                    label="Password"
                    type="password"
                    variant="outlined"
                    color="black"
                    bg-color="yellow-lighten-1 rounded-5"
                  ></v-text-field>

                  <v-text-field
                    label="Password confirmation"
                    type="password"
                    variant="outlined"
                    color="black"
                    bg-color="yellow-lighten-1 rounded-5"
                  ></v-text-field>

                  <v-btn color="yellow-darken-1" class="tetxmt-2 rounded-pill" type="submit" block
                    ><RouterLink to="/">REGISTER</RouterLink></v-btn
                  >
                </v-form>
                <v-divider class="my-5"></v-divider>

                <h5 class="text-center">
                  Already have an account?<RouterLink to="/"> Click here to log in</RouterLink>
                </h5>
              </v-card-text>
            </v-col>
          </v-row>
        </v-container>
      </v-main>
    </v-app>
  </v-responsive>
</template>

<style scoped>
.background-image {
  background-image: scr('@/public/images/bg.jpg');
  background-size: cover;
  background-position: center;
  height: 100vh;
  width: 100%;
}
</style>
