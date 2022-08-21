import {createRouter, createWebHistory} from 'vue-router'
import Home from '../view/Home.vue'
import NotFound from '../view/NotFound.vue'
import Booking from '../view/Booking.vue'
import Category from '../view/Category.vue'
import Reservation from '../view/Reservation.vue'
import ReservationList from '../view/ReservationList.vue'
import ContactUs from '../view/ContactUs.vue'
import AllUser from '../view/AllUser.vue'
import User from '../view/User.vue'
import SignIn from '../view/SignIn.vue'
import SignUp from '../view/SignUp.vue'
import DetailCategory from '../view/DetailCategory.vue'

const history=createWebHistory(import.meta.env.BASE_URL)
      
const routes=[
    {   path:'/',
        name:'Home',
        component: Home
    },
    {
        path:'/:NoPage(.*)',
        name:'NotFound',
        component: NotFound
    },
    {
        path:'/booking',
        name:'Booking',
        component: Booking
    },
    {
        path:'/category',
        name:'Category',
        component: Category
    },
    {
        path:'/DetailCategory',
        name:'DetailCategory',
        component: DetailCategory
    },
    {
        path:'/reservation/:id',
        name:'Reservation',
        component: Reservation
    },
    {
        path:'/reservation-list',
        name:'ReservationList',
        component: ReservationList
    },
    {
        path:'/contact-us',
        name:'ContactUs',
        component: ContactUs
    },
    {
        path:'/all-user',
        name:'AllUser',
        component: AllUser
    },
    {
        path:'/user/:id',
        name:'User',
        component: User
    },
    {   
        path:'/sign-in',
        name:'SignIn',
        component: SignIn        
    },
    {   
        path:'/sign-up',
        name:'SignUp',
        component: SignUp        
    }
]

const router=createRouter({history,routes})
export default router