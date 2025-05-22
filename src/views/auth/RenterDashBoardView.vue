<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const theme = ref('light')
const router = useRouter()
const route = useRoute()

const userFirstName = ref('User') // Default value, will be updated from localStorage
const currentRentals = ref([])

// Sample data for Current Rentals, mimicking the image
const myCurrentRentals = ref([
  {
    name: 'Scientific Calculator',
    image: '/images/scical2.jpg', // Placeholder, replace with actual path
    rentalFee: '50.00',
    rentalDate: 'March 22-23, 2025',
  },
  {
    name: 'Arnis Stick',
    image: '/images/arnis.jpg', // Placeholder
    rentalFee: '25.00',
    rentalDate: 'March 26, 2025',
  },
  {
    name: 'Rubber Boots',
    image: '/images/rainboots2.jpg', // Placeholder
    rentalFee: '75.00',
    rentalDate: 'March 25-20, 2025',
  },
  {
    name: 'Laboratory Gown',
    image: '/images/labgown.jpg', // Placeholder
    rentalFee: '50.00',
    rentalDate: 'March 28, 2025',
  },
  {
    name: 'E-Bike',
    image: '/images/ebike2.jpg  ', // Placeholder
    rentalFee: '50.00',
    rentalDate: 'March 28, 2025',
  },
])

onMounted(() => {
  const storedName = localStorage.getItem('userFirstName')
  if (storedName) {
    userFirstName.value = storedName
  }

  // You might fetch actual current rentals from localStorage or an API here
  // For now, we'll use the dummy data
  currentRentals.value = myCurrentRentals.value
})

onMounted(() => {
  const storedName = localStorage.getItem('userFirstName')
  userFirstName.value = storedName ? storedName : 'User'
})

function navigateTo(path) {
  router.push(path)
}
</script>

<template>
  <v-app :theme="theme">
    <v-main>
      <v-container fluid class="py-6">
        <v-row justify="center" align="center" class="mb-6">
          <v-col cols="auto" class="d-flex align-center">
            <v-img src="/images/EBlogo.png" width="160" height="160" contain />
            <v-sheet class="nav-container px-6 py-2 ml-4" color="white">
              <v-row align="center" no-gutters>
                <v-btn text class="nav-btn">Home</v-btn>
                <v-btn
                  text
                  class="nav-btn"
                  :class="{ active: route.path === '/rentals' }"
                  @click="navigateTo('rentals')"
                  >Rentals</v-btn
                >
                <v-btn
                  text
                  class="nav-btn"
                  :class="{ active: route.path === '/message' }"
                  @click="navigateTo('message')"
                  >Messages</v-btn
                >

                <v-btn
                  text
                  class="nav-btn"
                  :class="{ active: route.path === '/profile' }"
                  @click="navigateTo('/profile')"
                  >Profile</v-btn
                >
              </v-row>
            </v-sheet>
          </v-col>
        </v-row>

        <div class="yellow-section py-8 px-4">
          <v-row justify="center" class="mb-8">
            <div class="custom-divider mx-auto"></div>
          </v-row>

          <v-row justify="center" class="mb-4">
            <h2 class="hello-text">HELLO, {{ userFirstName.toUpperCase() }}!</h2>
          </v-row>

          <v-row justify="center" class="mb-2">
            <p class="welcome-text">Welcome to Easy Borrow</p>
          </v-row>

          <v-row justify="center" class="mb-8">
            <div class="custom-divider mx-auto"></div>
          </v-row>

          <v-spacer class="my-15"> </v-spacer>
          <v-container>
            <iframe
              style="text-align: center"
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d39421.791217760074!2d125.5501002095567!3d8.937513010887908!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sph!4v1747884292045!5m2!1sen!2sph"
              width="100%"
              height="600"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </v-container>
          <v-spacer class="my-10">
            <p class="text-center" style="font-size: 20px">
              Click the location pins to know how far is the rental from your location.
            </p>
          </v-spacer>

          <v-row justify="center" class="mb-8">
            <div class="custom-divider mx-auto"></div>
          </v-row>

          <v-row justify="center" class="mb-6" align="center">
            <router-link to="/rentals" style="text-decoration: none">
              <v-btn class="nav-btn mx-4 px-10 py-4">List an Item</v-btn>
            </router-link>

            <router-link
              :to="{ path: '/rentals', query: { slide: 'bookings' } }"
              style="text-decoration: none"
            >
              <v-btn
                class="nav-btn mx-4 px-10 py-4"
                @click="router.push({ path: '/rentals', query: { slide: 2 } })"
              >
                View Bookings
              </v-btn>
            </router-link>
          </v-row>

          <v-spacer class="my-10"> </v-spacer>
          <v-row justify="center" class="mb-8">
            <div class="my-bold-divider"></div>
          </v-row>

          <v-spacer class="my-10"> </v-spacer>

          <p class="text-center" style="font-size: 25px">CURRENT RENTALS</p>
          <v-spacer class="my-10"> </v-spacer>

          <v-row justify="center" class="mb-6" align="center">
            <v-col cols="12" sm="6" md="9" v-for="(rental, index) in currentRentals" :key="index">
              <v-card class="rental-card pa-4" elevation="3">
                <v-row>
                  <v-col
                    ><v-img :width="250" aspect-ratio="1/1" contain :src="rental.image"></v-img
                  ></v-col>

                  <v-col>
                    <v-col>
                      <v-template>
                        <v-card-title class="rental-title mt-2 text-center d-flex align-center">
                          <v-icon color="green" size="12" class="mr-1">mdi-circle</v-icon>
                          <span>{{ rental.name }}</span>
                        </v-card-title>
                      </v-template>
                      <v-card-text class="rental-info">
                        <div><strong>Rental Date:</strong> {{ rental.rentalDate }}</div>
                        <div><strong>Rental Fee:</strong> {{ rental.rentalFee }}</div>
                      </v-card-text>
                    </v-col>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
          </v-row>
        </div>
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Jaldi&family=Kaushan+Script&display=swap');

.nav-container {
  border: 2px solid #ffd700;
  border-radius: 15px;
  display: inline-block;
  width: fit-content;
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
  font-family: 'Kaushan Script', cursive;
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
.my-bold-divider {
  width: 95%;
  height: 3px;
  background-color: black;
  border-radius: 2px;
}
</style>
