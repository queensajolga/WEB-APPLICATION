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
            <v-img :width="400" aspect-ratio="4/3" cover src="./images/EBlogo.png"></v-img>
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
                    color="yellow-lighten-1"
                    bg-color="yellow-lighten-1"
                  ></v-text-field>

                  <v-text-field
                    label="Password"
                    type="password"
                    variant="outlined"
                    color="yellow-lighten-1"
                    bg-color="yellow-lighten-1"
                  ></v-text-field>
                  <p class="text-center font-weight-medium" style="font-size: 15px">
                    Forgot password?
                  </p>

                  <v-btn color="yellow-darken-1" class="mt-6 rounded-pill" type="submit" block
                    >LOG IN AS</v-btn
                  >

                  <v-btn
                    color="yellow-lighten-2"
                    class="mt-4 rounded-pill"
                    prepend-icon="mdi-google"
                    width="400"
                    type="submit"
                    block
                    >Sign in with Google</v-btn
                  >
                </v-form>
                <v-divider class="my-5"></v-divider>

                <h5 class="text-center">
                  Don't have an account?
                  <RouterLink to="/register"> REGISTER </RouterLink>
                </h5>
              </v-card-text>
            </v-col>
          </v-row>
        </v-container>
      </v-main>
    </v-app>
  </v-responsive>
</template>
