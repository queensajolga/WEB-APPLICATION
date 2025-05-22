<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { watchEffect } from 'vue'

const router = useRouter()
const route = useRoute()

const currentRentals = ref([])
const viewIndex = ref(0) // 0: Add Item, 1: Listed Items, 2: Bookings

const itemName = ref('')
const photo = ref(null)
const availableDates = ref([])
const quantity = ref(1)
const rentalFee = ref('')
const editingIndex = ref(null)

const userFirstName = ref('')

const valueRentals = ref([
  {
    name: 'Electric Drill',
    image: '/images/electricdrill.jpg',
    rentalFee: '150.00',
    location: 'Butuan City',
    contact: '09100904430',
    quantity: '2pcs.',
    availdate: 'May 23-25, 2025',
    description: 'Powerful electric drill for various tasks.',
  },
  {
    name: 'Mountain Bike',
    image: '/images/mountainbike2.jpg',
    rentalFee: '70.00',
    location: 'Ampayon City',
    contact: '09706222752',
    quantity: '1pc.',
    availdate: 'May 16 &17, 2025',
    description: 'Durable mountain bike for off-road adventures.',
  },
  {
    name: 'Prom Dress',
    image: '/images/promdress.jpg',
    rentalFee: '300.00',
    location: 'Brgy. Buhangin',
    contact: '09912329365',
    quantity: '1pc.',
    availdate: 'May 20,2025',
    description: 'Elegant prom dress, perfect for special occasions.',
  },
  {
    name: 'Rain Boots',
    image: '/images/rainboots2.jpg',
    rentalFee: '20.00',
    location: 'Brgy. Ampayon',
    contact: '09123894622',
    quantity: '3pc.',
    availdate: 'May 14-23, 2025',
    description: 'Waterproof rain boots to keep your feet dry.',
  },
  {
    name: 'E-bikes',
    image: '/images/ebike2.jpg',
    rentalFee: '150.00',
    location: 'Brgy. Baan',
    contact: '09869022752',
    quantity: '1pc.',
    availdate: 'May 10-15, 2025',
    description: 'Convenient e-bikes for easy commuting.',
  },
])

onMounted(() => {
  const storedName = localStorage.getItem('userFirstName')
  userFirstName.value = storedName ? storedName : 'Ella'
})

function handleUpload(e) {
  const file = e.target.files[0]
  if (file) photo.value = URL.createObjectURL(file)
}

function getDayClass(date) {
  const d = new Date(date)
  d.setHours(0, 0, 0, 0)
  const iso = d.toISOString().split('T')[0]
  return availableDates.value.map((d) => new Date(d).toISOString().split('T')[0]).includes(iso)
    ? 'available'
    : ''
}

function formatDateList(dates) {
  return dates.map((date) => new Date(date).toLocaleDateString()).join(', ')
}

function addToList() {
  if (!availableDates.value.length) {
    alert('Please select at least one available date.')
    return
  }

  const newItem = {
    name: itemName.value,
    image: photo.value || '/images/sample-item.jpg',
    rentalPeriod: formatDateList(availableDates.value),
    quantity: quantity.value,
    fee: rentalFee.value,
    rawDates: [...availableDates.value],
  }

  if (editingIndex.value !== null) {
    currentRentals.value[editingIndex.value] = newItem
    editingIndex.value = null
  } else {
    currentRentals.value.push(newItem)
  }

  localStorage.setItem('currentRentals', JSON.stringify(currentRentals.value))

  resetForm()
  viewIndex.value = 1 // show listed items after adding
}

function editItem(index) {
  const item = currentRentals.value[index]
  itemName.value = item.name
  photo.value = item.image
  rentalFee.value = item.fee
  quantity.value = item.quantity
  availableDates.value = item.rawDates || []
  editingIndex.value = index
  viewIndex.value = 0
}

function resetForm() {
  itemName.value = ''
  photo.value = null
  rentalFee.value = ''
  quantity.value = 1
  availableDates.value = []
  editingIndex.value = null
}

function deleteItem(index) {
  if (confirm('Are you sure you want to delete this item?')) {
    currentRentals.value.splice(index, 1)
    localStorage.setItem('currentRentals', JSON.stringify(currentRentals.value))
  }
}

function handleKeyPress(e) {
  if (e.key === 'ArrowLeft') {
    viewIndex.value = (viewIndex.value + 2) % 3
  } else if (e.key === 'ArrowRight') {
    viewIndex.value = (viewIndex.value + 1) % 3
  }
}

watchEffect(() => {
  const slideParam = router.currentRoute.value.query.slide
  const slideNum = parseInt(slideParam)

  if (!isNaN(slideNum) && slideNum >= 0 && slideNum <= 2) {
    viewIndex.value = slideNum
  }
})

onMounted(() => {
  const saved = localStorage.getItem('currentRentals')
  currentRentals.value = saved ? JSON.parse(saved) : []
  window.addEventListener('keydown', handleKeyPress)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeyPress)
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
            <v-img src="./favicon.ico" width="160" height="160" contain />
            <v-sheet class="nav-container px-6 py-2 ml-4" color="white">
              <v-row align="center" no-gutters>
                <v-btn
                  text
                  class="nav-btn"
                  :class="{ active: route.path === '/renterDashboard' }"
                  @click="navigateTo('renterDashboard')"
                  >Home</v-btn
                >
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

        <v-row justify="center" class="mb-6">
          <div class="custom-divider mx-auto"></div>
        </v-row>

        <v-row justify="center" class="mb-6">
          <v-col cols="auto">
            <div class="dot-nav">
              <span :class="{ dot: true, active: viewIndex === 0 }" @click="viewIndex = 0"></span>
              <span :class="{ dot: true, active: viewIndex === 1 }" @click="viewIndex = 1"></span>
              <span :class="{ dot: true, active: viewIndex === 2 }" @click="viewIndex = 2"></span>
            </div>
          </v-col>
        </v-row>

        <div v-if="viewIndex === 0" class="item-list-white rounded-lg pa-10">
          <h3 class="list-header text-center">Add New Item</h3>
          <div class="underline mb-12"></div>

          <v-row justify="center" class="mb-4">
            <v-col cols="12" sm="7">
              <v-text-field
                v-model="itemName"
                bg-color="yellow-lighten-2"
                variant="outlined"
                label="Item Name"
              />
            </v-col>
            <v-col cols="12" sm="3">
              <v-text-field
                v-model="rentalFee"
                bg-color="yellow-lighten-2"
                variant="outlined"
                type="number"
                prefix="₱"
                label="Rental Fee"
              />
            </v-col>
            <v-col cols="12" sm="7">
              <v-text-field
                v-model="itemName"
                bg-color="yellow-lighten-2"
                variant="outlined"
                label="Description"
              />
            </v-col>
            <v-col cols="12" sm="3">
              <v-text-field
                v-model="quantity"
                bg-color="yellow-lighten-2"
                variant="outlined"
                type="number"
                label="Quantity"
              />
            </v-col>
          </v-row>

          <v-row justify="center" class="mb-4">
            <v-col cols="12" sm="4">
              <v-file-input
                label="Upload Photo"
                bg-color="yellow-lighten-2"
                variant="outlined"
                accept="image/*"
                @change="handleUpload"
              />
              <v-img v-if="photo" :src="photo" class="mt-2 rounded-lg" height="120" cover />
            </v-col>
            <v-col cols="12" sm="6">
              <div class="calendar-box pa-4 bg-yellow-lighten-2">
                <div class="calendar-header mb-2">Select Available Dates</div>
                <Datepicker v-model="availableDates" :multi-dates="true" :day-class="getDayClass" />
                <p class="text-caption mt-2">Click a date to toggle availability</p>
              </div>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" class="text-center">
              <v-btn color="yellow darken-2" @click="addToList">
                {{ editingIndex !== null ? 'Save Changes' : 'Add to the list' }}
              </v-btn>
            </v-col>
          </v-row>
        </div>

        <div v-else-if="viewIndex === 1" class="item-list-yellow rounded-lg pa-6">
          <h3 class="list-header text-center">My Listed Items</h3>
          <div class="underline mb-6"></div>
          <v-row dense>
            <v-col v-for="(it, i) in currentRentals" :key="i" cols="12" class="mb-4">
              <v-sheet
                class="d-flex justify-space-between align-center pa-4 rounded-xl"
                elevation="2"
                color="white"
              >
                <div class="d-flex align-center item-clickable" @click="editItem(i)">
                  <v-img :src="it.image" width="120" height="120" class="rounded-lg" cover />
                  <v-col class="item-info">
                    <div class="font-weight-bold mb-1 text-lg">{{ it.name }}</div>
                    <div class="mb-1">Available date(s): {{ it.rentalPeriod }}</div>
                    <div class="mb-1">Rental Fee: ₱{{ it.fee }}</div>
                    <div>Quantity: {{ it.quantity }}</div>
                  </v-col>
                </div>
                <v-btn icon color="red" @click.stop="deleteItem(i)">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </v-sheet>
            </v-col>
          </v-row>
        </div>

        <div v-else class="item-list-yellow rounded-lg pa-6">
          <h3 class="list-header text-center">View Bookings</h3>
          <div class="underline mb-6"></div>

          <v-row justify="start" class="mt-4 dense">
            <v-col
              cols="12"
              sm="6"
              md="4"
              lg="3"
              v-for="(rental, index) in valueRentals"
              :key="index"
            >
              <v-card class="rental-card pa-6" elevation="6">
                <v-img :src="rental.image" height="160" cover></v-img>
                <v-card-title class="rental-title mt-2">{{ rental.name }}</v-card-title>
                <v-card-text class="rental-info">
                  <v-dialog max-width="600">
                    <template v-slot:activator="{ props: activatorProps }">
                      <v-btn
                        color="yellow-lighten-2"
                        class="font-weight-bold mt-2 rounded-pill mx-auto pa-2"
                        v-bind="activatorProps"
                        text="View details"
                        variant="flat"
                        block
                      ></v-btn>
                    </template>

                    <template v-slot:default="{ isActive }">
                      <v-card class="text-center">
                        <v-card-title class="font-weight-bold">ITEM DETAILS</v-card-title>
                        <v-row>
                          <v-col>
                            <v-card-text>
                              Item name: <br />{{ valueRentals[index].name }}</v-card-text
                            >
                          </v-col>
                          <v-col>
                            <v-card-text>
                              Rental fee: <br />₱{{ valueRentals[index].rentalFee }}</v-card-text
                            >
                          </v-col>
                          <v-col>
                            <v-card-text>
                              Location: <br />{{ valueRentals[index].location }}</v-card-text
                            >
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col>
                            <v-card-text>
                              Contact Number: <br />{{ valueRentals[index].contact }}</v-card-text
                            >
                          </v-col>
                          <v-col>
                            <v-card-text>
                              Available date: <br />{{ valueRentals[index].availdate }}</v-card-text
                            >
                          </v-col>
                          <v-col>
                            <v-card-text>
                              Quantity: <br />{{ valueRentals[index].quantity }}</v-card-text
                            >
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col>
                            <v-card-text>
                              Description: <br />{{ valueRentals[index].description }}</v-card-text
                            >
                          </v-col>
                        </v-row>

                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn
                            color="yellow-lighten-2"
                            class="font-weight-bold mt-2 rounded-pill mx-auto pa-2"
                            v-bind="activatorProps"
                            text="EXIT"
                            variant="flat"
                            block
                            @click="isActive.value = false"
                          ></v-btn>
                        </v-card-actions>
                      </v-card>
                    </template>
                  </v-dialog>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </div>
      </v-container>

      <v-container> </v-container>
    </v-main>
  </v-app>
</template>

<style scoped>
.nav-container {
  border: 2px solid #ffd700;
  border-radius: 15px;
}
.nav-btn {
  font-weight: bold;
  color: black !important;
  margin-right: 20px;
  border-radius: 20px;
}
.nav-btn-home {
  border: 1px solid black !important;
  pointer-events: none;
}
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
.custom-divider {
  width: 95%;
  height: 2px;
  background: black;
}
.item-list-yellow {
  background: #fff170;
}
.list-header {
  font-family: 'Kaushan Script', cursive;
  font-size: 2rem;
}
.underline {
  height: 2px;
  background: #000;
  margin: 0.5rem auto 1.5rem;
  width: 60%;
}
.item-info {
  padding-left: 20px;
}
.calendar-box {
  background: white;
  border-radius: 12px;
}
.calendar-header {
  font-weight: bold;
  font-size: 16px;
}
:deep(.dp__cell.available) {
  background-color: #4caf50 !important;
  color: white !important;
  border-radius: 8px;
}
.item-clickable {
  cursor: pointer;
  transition: background-color 0.2s ease;
}
.item-clickable:hover {
  background-color: #ffec99;
}
.dot-nav {
  display: flex;
  gap: 10px;
  justify-content: center;
}
.dot {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: gray;
  cursor: pointer;
  transition: background 0.3s ease;
}
.dot.active {
  background: black;
}
</style>
