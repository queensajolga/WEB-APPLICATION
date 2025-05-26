<script setup>
import { ref, watchEffect, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const theme = ref('light')
const router = useRouter()
const route = useRoute()

const activeIndex = ref(null)
const currentPath = ref(route.path)

const userFirstName = ref('')

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

const messages = ref([
  {
    name: 'PEDAL & GO',
    preview: '2 messages from Jannah',
    avatar: '👩',
    status: 'online',
    id: 'jannah',
  },
  {
    name: 'YOUR SHOT RENTALS',
    preview: '5 messages from Honey',
    avatar: '🧑',
    status: 'online',
    id: 'honey',
  },
  { name: 'STYLE SWITCH', preview: 'Thank you!', avatar: '🧔', status: 'online', id: 'dan' },
  {
    name: 'THE FURNITURE LINK',
    preview: 'You replied to Joseph',
    avatar: '👨‍💼',
    status: 'online',
    id: 'joseph',
  },
  {
    name: 'YOUR CAMP COMFORT',
    preview: "Thanks ma'am",
    avatar: '👩',
    status: 'online',
    id: 'marian',
  },
  {
    name: 'Andrei',
    preview: 'You replied to Andrei',
    avatar: '👨‍💼',
    status: 'online',
    id: 'andrei',
  },
  { name: 'Yuri', preview: 'You replied to Yuri', avatar: '🧑', status: 'online', id: 'yuri' },
  { name: 'Beth', preview: 'You replied to Beth', avatar: '👩', status: 'online', id: 'beth' },
  { name: 'Queen', preview: 'Queen unsent a message', avatar: '👑', status: 'online', id: 'queen' },
])

const loaded = ref(false)
const loading = ref(false)

// Pop-up messenger variables
const dialog = ref(false)
const selectedUser = ref(null)
const newMessage = ref('')
const chatMessages = ref([]) // To hold messages for the current user

function onClick() {
  loading.value = true
  setTimeout(() => {
    loading.value = false
    loaded.value = true
  }, 2000)
}

function openMessengerPopup(message) {
  selectedUser.value = message
  dialog.value = true

  // Clear previous messages
  chatMessages.value = []

  // Define a variable for a simple text message (for cases without special actions)
  let simpleTextMessage = ''

  switch (message.id) {
    case 'jannah': // E-bike Rental
      chatMessages.value = [
        {
          text: `Hi ${userFirstName.value}! Your E-bike rental from May 10-12, 2025, is all set! We're looking forward to your ride. Please present your valid ID at the CSU campus for pickup. Enjoy the journey!`,
          isSent: false,
        },
        {
          text: `To finalize your booking, please proceed with the payment. Click the button below to complete your transaction. `, // Or simply: "Please proceed with payment to confirm your booking."
          isSent: false,
        },
        {
          text: `Proceed to Payment`,
          isSent: false,
          isPaymentAction: true,
          paymentLink: '/renteePayment',
        },
      ]
      break
    case 'honey': // Camera Rental
      chatMessages.value = [
        {
          text: `Hey ${userFirstName.value}! Your camera rental for May 15-17, 2025, is all set. Get ready to capture some amazing shots! Please remember to bring your valid ID for pickup at our CDO branch.`,
          isSent: false,
        },
        {
          text: `To finalize your booking, please proceed with the payment. Click the button below to complete your transaction. `, // Or simply: "Please proceed with payment to confirm your booking."
          isSent: false,
        },
        {
          text: `Proceed to Payment`,
          isSent: false,
          isPaymentAction: true,
          paymentLink: '/renteePayment',
        },
      ]
      break
    case 'dan': // Prom Dress Rental
      chatMessages.value = [
        {
          text: `Dear ${userFirstName.value},\n\nThis message confirms your prom dress rental for May 20, 2025. The gown is available for pickup at our Cagayan de Oro location. Please present a valid identification document upon collection.`,
          isSent: false,
        },
        {
          text: `To finalize your booking, please proceed with the payment. Click the button below to complete your transaction. `, // Or simply: "Please proceed with payment to confirm your booking."
          isSent: false,
        },
        {
          text: `Proceed to Payment`,
          isSent: false,
          isPaymentAction: true,
          paymentLink: '/renteePayment',
        },
      ]
      break
    case 'joseph': // Tables & Chairs Rental
      chatMessages.value = [
        {
          text: `Good day ${userFirstName.value}! Your tables and chairs rental for May 22-24, 2025, is confirmed. We look forward to seeing you at our warehouse/pickup point for collection.`,
          isSent: false,
        },
        {
          text: `To finalize your booking, please proceed with the payment. Click the button below to complete your transaction. `, // Or simply: "Please proceed with payment to confirm your booking."
          isSent: false,
        },
        {
          text: `Proceed to Payment`,
          isSent: false,
          isPaymentAction: true,
          paymentLink: '/renteePayment',
        },
      ]
      break
    case 'marian': // Camping Chair Rental
      chatMessages.value = [
        {
          text: `Hey ${userFirstName.value}! Get ready for some comfy relaxation! Your camping chair rental for May 25-26, 2025, is confirmed. Please have your ID ready for pickup at our CSU campus.`,
          isSent: false,
        },
        {
          text: `To finalize your booking, please proceed with the payment. Click the button below to complete your transaction. `, // Or simply: "Please proceed with payment to confirm your booking."
          isSent: false,
        },
        {
          text: `Proceed to Payment`,
          isSent: false,
          isPaymentAction: true,
          paymentLink: '/renteePayment',
        },
      ]
      break
    case 'andrei':
      simpleTextMessage = `...`
      break
    case 'yuri':
      simpleTextMessage = `...`
      break
    case 'beth':
      simpleTextMessage = `Typing`
      break
    case 'queen':
      simpleTextMessage = `Hi Ella! Visit our rental page to check out the latest items available for rent!`
      break

    case 'PEDAL & GO': // This case was already handled above by its 'jannah' ID, leaving this here for clarity.
      simpleTextMessage = `Good day ${userFirstName.value}! Your E-bike rental from May 10-12, 2025, is all set. We're looking forward to your ride and hope you have a fantastic experience. As a friendly reminder, please bring your valid ID for pickup at the CSU campus. If anything comes up or you have any questions before then, please message us directly.`
      break
    default:
      simpleTextMessage = `Hello, Good day ${message.name}! Your rental details will be confirmed shortly. Thank you for choosing us!`
  }

  if (simpleTextMessage) {
    chatMessages.value = [
      {
        text: simpleTextMessage,
        isSent: false,
      },
    ]
  }
}

function sendMessage() {
  if (newMessage.value.trim() !== '' && selectedUser.value) {
    chatMessages.value.push({ text: newMessage.value, isSent: true })
    newMessage.value = ''
    // In a real application, you'd send the message to the server for selectedUser.value.id
  }
}

// Function to handle payment button click
function proceedToPayment(link) {
  console.log(`Navigating to payment: ${link}`)
  router.push(link) // Use Vue Router to navigate for internal pages
  // For external payment gateways, use: window.open(link, '_blank');
  dialog.value = false // Close the chat dialog after clicking
}
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

        <div class="yellow-section py-8 px-4">
          <v-row justify="center" class="mb-8">
            <div class="custom-divider mx-auto"></div>
          </v-row>
          <v-row justify="center" class="mb-4">
            <h2 class="hello-text">Messages</h2>
          </v-row>

          <v-row justify="center" class="mb-8">
            <div
              class="custom-divider mx-auto"
              style="border-top: 3px solid black; width: 95%"
            ></div>
          </v-row>
          <v-row>
            <div></div>
          </v-row>
          <v-container justify="center" align="center" class="mb-6 py-6">
            <v-sheet class="navigation-container px-1 py-1" color="white">
              <v-row align="center" no-gutters>
                <v-col>
                  <v-text-field
                    :loading="loading"
                    append-inner-icon="mdi-magnify"
                    density="compact"
                    label="Search templates"
                    variant="solo"
                    hide-details
                    single-line
                    @click:append-inner="onClick"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-sheet>
          </v-container>

          <v-list class="px-4" lines="two">
            <v-list-item
              v-for="(msg, index) in messages"
              :key="index"
              :class="index === activeIndex ? 'bg-indigo-lighten-4 rounded-lg' : ''"
              @click="openMessengerPopup(msg)"
            >
              <template #prepend>
                <v-avatar color="white">
                  <span class="text-h6">{{ msg.avatar }}</span>
                </v-avatar>
                <v-icon color="green" size="10" class="ml-1 mt-5">mdi-circle</v-icon>
              </template>

              <v-list-item-title class="font-weight-bold text-lg">{{ msg.name }}</v-list-item-title>
              <v-list-item-subtitle class="text-body-2">{{ msg.preview }}</v-list-item-subtitle>

              <template #append>
                <v-icon>mdi-chevron-right</v-icon>
              </template>
            </v-list-item>
          </v-list>
        </div>

        <v-dialog v-model="dialog" width="auto">
          <v-card v-if="selectedUser">
            <v-toolbar color="#fff170" flat>
              <v-toolbar-title class="font-weight-bold">{{ selectedUser.name }}</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn icon @click="dialog = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-toolbar>
            <v-card-text
              class="message-area pa-4"
              style="height: 600px; overflow-y: auto; width: 600px"
            >
              <div
                v-for="(chatMsg, index) in chatMessages"
                :key="index"
                :class="{ sent: chatMsg.isSent, received: !chatMsg.isSent }"
                class="mb-2"
              >
                <v-chip
                  v-if="!chatMsg.isSent && !chatMsg.isPaymentAction"
                  class="mr-2"
                  color="#e0f7fa"
                  label
                  small
                  >{{ selectedUser.avatar }}</v-chip
                >

                <span
                  v-if="!chatMsg.isPaymentAction"
                  class="message-text rounded-4 pa-2"
                  :style="{ 'background-color': chatMsg.isSent ? '#e6ee9c' : '#f0f4c3' }"
                  >{{ chatMsg.text }}</span
                >

                <div v-if="chatMsg.isPaymentAction" class="payment-button-container">
                  <v-btn
                    color="yellow-lighten-2"
                    class="pay-button"
                    @click="proceedToPayment(chatMsg.paymentLink)"
                    >{{ chatMsg.text || 'Proceed to Payment' }}</v-btn
                  >
                </div>

                <v-chip v-if="chatMsg.isSent" class="ml-2" color="#e6ee9c" label small>👤</v-chip>
              </div>
            </v-card-text>
            <v-card-actions class="pa-2">
              <v-text-field
                v-model="newMessage"
                placeholder="Send a message"
                variant="outlined"
                rounded="pill"
                hide-details
                class="flex-grow-1 mr-2"
                @keyup.enter="sendMessage"
              ></v-text-field>
              <v-btn icon color="#ffd700" @click="sendMessage">
                <v-icon>mdi-send</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped>
/* Styles (unchanged) */
@import url('https://fonts.googleapis.com/css2?family=Jaldi&family=Kaushan+Script&display=swap');

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
