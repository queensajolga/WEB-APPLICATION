<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const refVForm = ref()

const formDataDefault = {
  email: '',
  password: '',
}

const formData = ref({
  ...formDataDefault,
})

// Password logic
const isPasswordVisible = ref(false) // To toggle visibility of password

const onLogin = () => {
  // Now formData.value.password will contain the actual password
  alert(`Email: ${formData.value.email}\nPassword: ${formData.value.password}`)
  // Here you would typically send the formData to your authentication API
}

const onFormSubmit = () => {
  refVForm.value?.validate().then(({ valid }) => {
    if (valid) onLogin()
  })
}

const theme = ref('light')
const menuItems = ref([
  { title: 'RENTEE', route: '/renteelogin' },
  { title: 'RENTER', route: '/renterlogin' },
])
</script>

<template>
  <v-app
    :theme="theme"
    :style="{
      backgroundImage: `url('/images/yellowback.jpg')`,
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
                  <v-img :width="400" aspect-ratio="16/0" cover src="/favicon.ico"></v-img>
                </v-col>
              </v-row>

              <h1 class="text-center" style="font-size: 40px">Welcome to</h1>
              <h2 class="text-center" style="font-size: 70px">EASY BORROW</h2>
              <h3 class="text-center" style="font-size: 20px">Share smarter, Earn faster</h3>

              <v-spacer class="my-5"></v-spacer>

              <v-card-text class="pt-4">
                <v-form ref="refVForm" fast-fail @submit.prevent="onFormSubmit">
                  <v-text-field
                    v-model="formData.email"
                    :rules="[requiredValidator, emailValidator]"
                    label="Email"
                    variant="outlined"
                    bg-color="yellow-lighten-1 rounded-lg elevation-5"
                  ></v-text-field>

                  <v-text-field
                    v-model="formData.password"
                    :rules="[requiredValidator]"
                    :append-inner-icon="isPasswordVisible ? 'mdi-eye-off' : 'mdi-eye'"
                    :type="isPasswordVisible ? 'text' : 'password'"
                    label="Password"
                    variant="outlined"
                    bg-color="yellow-lighten-1 rounded-lg elevation-5"
                    @click:append-inner="isPasswordVisible = !isPasswordVisible"
                  ></v-text-field>

                  <h4 class="text-center font-semibold" style="font-size: 15px">
                    Forgot Password?
                  </h4>

                  <v-spacer class="my-10"></v-spacer>

                  <div class="text-center">
                    <v-menu open-on-click>
                      <template v-slot:activator="{ isHovering, props }">
                        <v-btn
                          color="yellow-lighten-2"
                          v-bind="props"
                          :elevation="isHovering ? 24 : 10"
                          size="large"
                          class="font-weight-bold mt-4 rounded-pill mx-auto pa-6"
                          type="submit"
                          block
                        >
                          login as
                        </v-btn>
                      </template>

                      <v-spacer class="my-5"></v-spacer>

                      <v-list class="text-center" bg-color="yellow-lighten-2 rounded-xl">
                        <v-list-item
                          v-for="(item, index) in menuItems"
                          :key="index"
                          :value="item"
                          @click="router.push(item.route)"
                        >
                          <v-list-item-title>{{ item.title }}</v-list-item-title>
                        </v-list-item>
                      </v-list>
                    </v-menu>
                  </div>

                  <v-divider class="my-5"></v-divider>

                  <h5 class="text-center font-light" style="font-size: 18px">
                    Don't have an account?
                    <RouterLink to="/register" class="register-button"> REGISTER</RouterLink>
                  </h5>
                </v-form>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped>
/* No need for light-background/dark-background classes if handling through style binding */

.rentee-button {
  color: black;
  text-decoration: none;
  display: block;
  width: 100%;
}
.renter-button {
  color: black;
  text-decoration: none;
  display: block;
  width: 100%;
}
.register-button {
  text-decoration: none;
}
.theme--light .register-button {
  color: black;
}
.theme--dark .register-button {
  color: white;
}
</style>
