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
      <v-app-bar color="yellow-lighten-1" class="px-3">
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

      <v-main>
        <v-container>
          <v-row class="d-flex justify-center">
            <v-col cols="12" md="6">
              <template v-slot:title>
                <span class="font-weight-black">Welcome to</span>
              </template>

              <v-card-text class="bg-surface-yellow-lighten-1">
                <v-form fast-fail @submit.prevent>
                  <v-text-field label="Firstname" variant="outlined"></v-text-field>

                  <v-text-field label="Lastname" variant="outlined"></v-text-field>

                  <v-text-field label="Email" variant="outlined"></v-text-field>

                  <v-text-field label="Password" type="password" variant="outlined"></v-text-field>

                  <v-text-field
                    label="Password confirmation"
                    type="password"
                    variant="outlined"
                  ></v-text-field>

                  <v-btn color="yellow-lighten-1" class="mt-2" type="submit" block>LOG IN</v-btn>
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

      <v-footer color="yellow-lighten-1" border app>2025 Easy Borrow</v-footer>
    </v-app>
  </v-responsive>
</template>
