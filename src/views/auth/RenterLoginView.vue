<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const schoolId = ref('')
const router = useRouter()

// Only allow numbers and dashes
function onSchoolIdInput(event) {
  const input = event.target.value
  schoolId.value = input.replace(/[^0-9-]/g, '')
}

// Handle login with validation
function handleLogin() {
  if (!schoolId.value) {
    alert('Please enter your School ID.')
    return
  }

  router.push('/renterdashboard')
}
</script>

<template>
  <v-responsive class="border rounded">
    <v-app
      :theme="theme"
      :style="{
        backgroundImage: `url('/public/images/yellowback.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }"
    >
      <v-main>
        <v-container>
          <v-row>
            <v-col cols="12" md="6" class="mx-auto">
              <v-card class="mx-auto elevation-24">
                <v-row class="d-flex justify-center my-6">
                  <v-col cols="12" md="6" class="d-flex justify-center align-center">
                    <v-img
                      :width="400"
                      aspect-ratio="16/0"
                      cover
                      src="./public/favicon.ico"
                    ></v-img>
                  </v-col>
                </v-row>

                <h1 class="text-center" style="font-size: 40px">Welcome to</h1>
                <h2 class="text-center" style="font-size: 60px">EASY BORROW</h2>
                <h3 class="text-center" style="font-size: 20px">Share smarter, Earn faster</h3>

                <v-spacer class="my-5"></v-spacer>
                <v-divider class="my-5"></v-divider>

                <v-container>
                  <v-row class="d-flex">
                    <v-col cols="12">
                      <!-- School ID input with restrictions -->
                      <v-text-field
                        v-model="schoolId"
                        @input="onSchoolIdInput"
                        label="School ID"
                        variant="outlined"
                        bg-color="yellow-lighten-1 rounded-lg"
                      ></v-text-field>

                      <v-checkbox label="Remember school id"></v-checkbox>

                      <v-hover v-slot="{ isHovering, props }">
                        <v-btn
                          v-bind="props"
                          :elevation="isHovering ? 24 : 6"
                          size="large"
                          color="yellow-lighten-2"
                          class="font-weight-bold mt-4 rounded-pill mx-auto pa-6"
                          @click="handleLogin"
                          block
                        >
                          login now
                        </v-btn>
                      </v-hover>

                      <v-divider class="my-5"></v-divider>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-main>
    </v-app>
  </v-responsive>
</template>

<style scoped>
.light-background,
.dark-background {
  background-image: url('/public/images/background.jpg');
  background-size: cover;
  background-position: center;
}
.login-button {
  text-decoration: none;
}
.theme--light .register-button {
  color: black;
}
.theme--dark .register-button {
  color: white;
}
</style>
