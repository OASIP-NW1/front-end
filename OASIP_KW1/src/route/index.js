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
import EditCategory from '../view/EditCategory.vue'
import Main from '../view/Main.vue'
import Public from '../view/public.vue'
import GuessUser from '../view/GuessUser.vue'
const history=createWebHistory(import.meta.env.BASE_URL)
      
const routes=[
    {   path:'/',
        name:'Public',
        component: Public,
        children:[
            {
                path:'/',
            name:'Home',
            component: Home,
            },
            {
                path:'contact-us',
                name:'ContactUs',
                component: ContactUs
            },
            {   
                path:'sign-in',
                name:'SignIn',
                component: SignIn        
            },
            {
                path:'/guest-user',
                name:'GuessUser',
                component: GuessUser
            },

        ]
    },
   
    
    {
        path:'/account/',
        name: 'Main',
        component: Main,
        children:[
        {
            path:'/account/booking',
            name:'Booking',
            component: Booking
        },
        {
            path:'/account/category',
            name:'Category',
            component: Category
        },
        {
            path:'/account/category/DetailCategory/:id',
            name:'DetailCategory',
            component: DetailCategory
        },
        {
            path:'/account/reservation-list/reservation/:id',
            name:'Reservation',
            component: Reservation
        },
        {
            path:'/account/reservation-list',
            name:'ReservationList',
            component: ReservationList
        },
        {
            path:'/account/all-user/user/:id',
            name:'User',
            component: User
        },
        {
            path:'/account/all-user',
            name:'AllUser',
            component: AllUser
        },
        {   
            path:'sign-up',
            name:'SignUp',
            component: SignUp        
        },

        ]
    },
    // {
    //     path:'/EditCategory/:id',
    //     name:'EditCategory',
    //     component: EditCategory
    // },
    
    {
        path:'/:NoPage(.*)',
        name:'NotFound',
        component: NotFound
    }, 
]

const router=createRouter({history,routes})
export default router