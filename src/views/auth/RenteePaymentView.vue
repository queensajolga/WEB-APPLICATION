<script setup>
import { ref, watchEffect, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const theme = ref('light')
const router = useRouter()
const route = useRoute()

const currentPath = ref(route.path)
const userFirstName = ref('')

// Define reactive variables for your form inputs
const Name = ref('')
const number = ref('')
const city = ref('')
const text = ref('') // Assuming 'text' is for Province

onMounted(() => {
  const storedName = localStorage.getItem('userFirstName')
  userFirstName.value = storedName ? storedName : 'Ella'
})

function navigateTo(path) {
  router.push(path)
}

watchEffect(() => {
  currentPath.value = route.path
})
</script>

<template>
  <v-app :theme="theme">
    <v-main>
      <v-container fluid class="py-6">
        <v-row justify="center" align="center" class="mb-6">
          <v-col cols="auto" class="d-flex align-center">
            <v-img src="/public/favicon.ico" width="160" height="160" contain />
            <v-sheet class="nav-container px-6 py-2 ml-4" color="white">
              <v-row align="center" no-gutters>
                <v-btn
                  text
                  class="nav-btn"
                  :class="{ active: route.path === '/renteelogin' }"
                  @click="navigateTo('renteelogin')"
                  >Home</v-btn
                >
                <v-btn
                  text
                  class="nav-btn"
                  :class="{ active: route.path === '/renteeRentals' }"
                  @click="navigateTo('renteeRentals')"
                  >Rentals</v-btn
                >
                <v-btn
                  text
                  class="nav-btn"
                  :class="{ active: route.path === '/renteeMessages' }"
                  @click="navigateTo('renteeMessages')"
                  >Messages</v-btn
                >
                <v-btn
                  text
                  class="nav-btn"
                  :class="{ active: route.path === '/renteeProfile' }"
                  @click="navigateTo('/renteeProfile')"
                  >Profile</v-btn
                >
              </v-row>
            </v-sheet>
          </v-col>
        </v-row>

        <div class="white-section py-8 px-4">
          <v-row justify="center" class="mb-8">
            <div class="custom-divider mx-auto"></div>
          </v-row>
          <v-row justify="center" class="mb-4">
            <h2 class="hello-text">Rental Payment</h2>
          </v-row>

          <v-row justify="center" class="mb-10">
            <div
              class="custom-divider mx-auto"
              style="border-top: 3px solid black; width: 95%"
            ></div>
          </v-row>

          <div class="white-section py-1 px-5">
            <v-row justify="center">
              <v-col cols="auto">
                <v-row justify="center ">
                  <p class="welcome-text">SELECT YOUR MODE OF PAYMENT</p>
                </v-row>
              </v-col>
            </v-row>

            <v-row justify="center">
              <v-col cols="12" sm="6" md="4">
                <v-dialog max-width="500">
                  <template v-slot:activator="{ props: activatorProps }">
                    <v-btn
                      color="yellow-lighten-2"
                      class="font-weight-bold mt-10 rounded-lg pa-2"
                      v-bind="activatorProps"
                      text="GCash"
                      variant="flat"
                      block
                      height="50px"
                      style="font-size: 18px"
                    >
                    </v-btn>
                  </template>

                  <template v-slot:default="{ isActive }">
                    <v-card class="text-center">
                      <v-card-title class="font-weight-bold" style="font-size: 25px"
                        >GCASH PAYMENT
                        <v-card-text>
                          <p style="font-size: 18px">
                            Please send your payment here: 0970622272<br />or
                          </p>
                          <p>SCAN HERE</p>
                          <v-spacer class="mt-10"></v-spacer>

                          <v-img src="/images/qr.jpg" max-width="400" class="mx-auto mt-2" contain>
                          </v-img>
                          <v-spacer class="mt-10"></v-spacer>

                          <p>
                            Once paid, please upload a screenshot of your<br />
                            transaction for verification.
                          </p>
                        </v-card-text>

                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn
                            color="yellow-lighten-2"
                            class="font-weight-bold mt-2 rounded-pill pa-2"
                            v-bind="activatorProps"
                            text="CLOSE"
                            variant="flat"
                            block
                            @click="isActive.value = false"
                          ></v-btn>
                        </v-card-actions>
                      </v-card-title>
                    </v-card>
                  </template>
                </v-dialog>
              </v-col>

              <v-col cols="12" sm="6" md="4">
                <v-btn
                  color="yellow-lighten-2"
                  class="font-weight-bold mt-10 rounded-lg pa-2"
                  text="Cash on Delivery / Pick up"
                  variant="flat"
                  block
                  height="50px"
                  style="font-size: 18px"
                ></v-btn>
              </v-col>
            </v-row>

            <v-spacer class="mt-10"></v-spacer>

            <v-row justify="center" class="mb-8">
              <div
                class="custom-divider mx-auto"
                style="border-top: 3px solid black; width: 95%"
              ></div>
            </v-row>

            <v-row justify="start mx-10">
              <v-col cols="auto">
                <v-row justify="center mx-5">
                  <p class="welcome-text" style="font-size: 30px">Delivery Information</p>
                </v-row>
              </v-col>
            </v-row>

            <v-spacer class="mt-10"></v-spacer>

            <v-row justify="center">
              <v-col cols="12" sm="6" md="7">
                <v-text-field
                  color="black"
                  text-color="black"
                  v-model="Name"
                  label="Name"
                  variant="outlined"
                  bg-color="yellow-lighten-2 rounded-lg"
                />
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  color="black"
                  v-model="number"
                  label="Phone number"
                  variant="outlined"
                  bg-color="yellow-lighten-2 rounded-lg"
                />
              </v-col>
            </v-row>

            <v-row justify="center">
              <v-col cols="12" sm="6" md="7">
                <v-text-field
                  color="black"
                  text-color="black"
                  v-model="Name"
                  label="Email"
                  variant="outlined"
                  bg-color="yellow-lighten-2 rounded-lg"
                />
              </v-col>
              <v-col cols="12" sm="6" md="4"> </v-col>
            </v-row>

            <v-spacer class="mt-10"></v-spacer>

            <v-row justify="start mx-10">
              <v-col cols="auto">
                <v-row justify="center mx-5">
                  <p class="welcome-text" style="font-size: 30px">Address</p>
                </v-row>
              </v-col>
            </v-row>

            <v-spacer class="mt-10"></v-spacer>

            <v-row justify="center">
              <v-col cols="12" sm="6" md="11">
                <v-text-field
                  color="black"
                  text-color="black"
                  v-model="Name"
                  label="Street address"
                  variant="outlined"
                  bg-color="yellow-lighten-2 rounded-lg"
                />
              </v-col>
            </v-row>
            <v-row justify="center">
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  color="black"
                  text-color="black"
                  v-model="city"
                  label="City"
                  variant="outlined"
                  bg-color="yellow-lighten-2 rounded-lg"
                />
              </v-col>
              <v-col cols="12" sm="6" md="5">
                <v-text-field
                  color="black"
                  v-model="text"
                  label="Province"
                  variant="outlined"
                  bg-color="yellow-lighten-2 rounded-lg"
                />
              </v-col>
            </v-row>
            <v-row justify="center">
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  color="black"
                  text-color="black"
                  v-model="number"
                  label="Postal code"
                  variant="outlined"
                  bg-color="yellow-lighten-2 rounded-lg"
                />
              </v-col>
              <v-col cols="12" sm="6" md="5"> </v-col>
            </v-row>

            <v-spacer class="mt-10"></v-spacer>
            <v-spacer class="mt-10"></v-spacer>

            <v-row justify="center" class="mb-8">
              <v-col cols="12" sm="6" md="8"> </v-col>
              <v-col cols="12" sm="6" md="3">
                <v-btn
                  color="yellow-lighten-2"
                  class="font-weight-bold mt-10 rounded-lg pa-2"
                  text="Confirm"
                  variant="flat"
                  block
                  height="50px"
                  style="font-size: 18px"
                >
                </v-btn>
              </v-col>
            </v-row>

            <v-spacer class="mt-10"></v-spacer>

            <div
              class="custom-divider mx-auto"
              style="border-top: 3px solid black; width: 95%"
            ></div>

            <v-spacer class="mt-10"></v-spacer>

            <v-row justify="center">
              <v-col cols="auto">
                <v-row justify="center ">
                  <p class="welcome-text">
                    Fill out only the Delivery Information if you want to deliver the item in your
                    location.
                  </p>
                </v-row>
              </v-col>
            </v-row>
          </div>
        </div>
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped>
/* Styles (unchanged) */
@import url('https://fonts.googleapis.com/css2?family=Jaldi&family=Kaushan+Script&display=swhttps://fonts.googleapis.com/css2?family=Jaldi&family=Kaushan+Script&display=swap');

.nav-container {
  border: 3px solid #ffd700;
  border-radius: 10px;
  display: inline-block;
  width: fit-content;
}
.navigation-container {
  border: 3px solid #ffd700;
  border-radius: 10px;
  max-width: 730px;
  width: 100%;
}
.nav-location-container {
  border: 3px solid #ffd700;
  border-radius: 10px;
  max-width: 800px;
  width: 100%;
}
.nav-btn {
  font-weight: bold;
  color: black !important;
  margin-right: 20px;
  border-radius: 20px;
  background-color: white;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
}
.nav-btn.active {
  border: 1px solid black;
}
.nav-btn-home {
  border: 1px solid black !important;
  pointer-events: none;
}
.yellow-section {
  background-color: #fff170;
  min-height: 100vh;
  padding: 40px;
  border-radius: 16px;
}
.hello-text {
  font-size: 50px;
  font-weight: 900;
  letter-spacing: 3px;
  color: #000000;
  font-family: 'Kaushan Script', cursive;
}
.welcome-text {
  font-size: 20px;
  color: black;
  font-family: 'Jaldi', sans-serif;
}
.custom-divider {
  width: 95%;
  height: 2px;
  background-color: black;
  border-radius: 2px;
}
.section-title {
  font-size: 32px;
  font-weight: bold;
  color: #000;
  font-family: 'Lexend Exa', sans-serif;
  letter-spacing: 1px;
}
.section-subtitle {
  font-size: 18px;
  color: #000;
  font-family: 'Jaldi', sans-serif;
}
.rental-card {
  background-color: white;
  border-radius: 16px;
  transition: box-shadow 0.3s;
}
.rental-card:hover {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}
.rental-title {
  font-weight: bold;
  font-size: 20px;
  color: #000;
}
.rental-info {
  font-family: 'Jaldi', sans-serif;
  font-size: 16px;
  color: #333;
  margin-top: 8px;
}

.message-area {
  display: flex;
  flex-direction: column;
}

.sent {
  align-items: flex-end;
  justify-content: flex-end;
  display: flex;
}

.received {
  align-items: flex-start;
  justify-content: flex-start;
  display: flex;
}

.message-text {
  padding: 8px 12px;
  border-radius: 18px;
  word-break: break-word;
}

.pay-button {
  padding: 8px 12px;
  border-radius: 18px;
  word-break: break-word;
}

.payment-button-container {
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin-top: 8px;
}
</style>
