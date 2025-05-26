import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/auth/LoginView.vue'
import RenteeLoginView from '@/views/auth/RenteeLoginView.vue'
import RenteeRentalView from '@/views/auth/RenteeRentalView.vue'
import RenteeMessagesView from '@/views/auth/RenteeMessagesView.vue'
import RenteeProfileView from '@/views/auth/RenteeProfileView.vue'
import RegisterView from '@/views/auth/RegisterView.vue'
import RenterLoginView from '@/views/auth/RenterLoginView.vue'
import RenterDashboardView from '@/views/auth/RenterDashboardView.vue'
import RentalsView from '@/views/auth/RentalsView.vue'
import MessageView from '@/views/auth/MessageView.vue'
import ProfileView from '@/views/auth/ProfileView.vue'
import RenteePaymentView from '@/views/auth/RenteePaymentView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: LoginView,
    },
    {
      path: '/renteeLogin',
      name: 'renteeLogin',
      component: RenteeLoginView,
    },
    {
      path: '/renteeRentals',
      name: 'renteeRentals',
      component: RenteeRentalView,
    },
    {
      path: '/renteeMessages',
      name: 'renteeMessages',
      component: RenteeMessagesView,
    },
    {
      path: '/renteeProfile',
      name: 'renteeProfile',
      component: RenteeProfileView,
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
    },
    {
      path: '/renterlogin',
      name: 'renterlogin',
      component: RenterLoginView,
    },
    {
      path: '/renterDashboard',
      name: 'renterDashboard',
      component: RenterDashboardView,
    },
    {
      path: '/rentals',
      name: 'rentals',
      component: RentalsView,
    },
    {
      path: '/message',
      name: 'messae',
      component: MessageView,
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView,
    },
    {
      path: '/renteePayment',
      name: 'renteePayment',
      component: RenteePaymentView,
    },
  ],
})

export default router
