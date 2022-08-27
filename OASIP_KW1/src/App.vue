<script setup>
import { ref, computed } from 'vue'
import BaseDate from './components/BaseDate.vue'
import { useRouter } from 'vue-router'

console.clear()
const logoSize = 'width:75px;';

const myRouter = useRouter()
const goHome = () => myRouter.push({ name: 'Home' })
const goBooking = () => myRouter.push({ name: 'Booking' })
const goCategory = () => myRouter.push({ name: 'Category' })
const goReservationList = () => myRouter.push({ name: 'ReservationList' })
const goContactUs = () => myRouter.push({ name: 'ContactUs' })
const goAllUser = () => myRouter.push({ name: 'AllUser' })
const goSignUp = () => myRouter.push({ name: 'SignUp' })
const goSignIn = () => myRouter.push({ name: 'SignIn' })

</script>

<template>
    <div id="bg_color">
        <nav class="relative px-5 py-7 flex justify-center items-center bg-transparent drop-shadow-md md:rounded-lg md:mx-auto w-full">
            <img src="./assets/icon.png" alt="LOGO" :style="logoSize" />
            <span class="font-bold text-xl text-white mx-4">
                <BaseDate :isTime='true' />

                <br>
                <span class=" font-medium">
                    <BaseDate :isDate="true" />
                </span>
            </span>
            <ul class="hidden absolute lg:flex lg:mx-auto lg:flex lg:items-center lg:w-auto lg:space-x-6">
                <li>
                            <button type="button" class="inline-block px-2 py-2 bg-transparent text-white 
                            font-medium text-lg leading-tight  rounded  
                            hover:bg-gray-900 hover:shadow-lg focus:bg-blue-400 focus:shadow-lg 
                            focus:outline-none focus:ring-0 active:bg-blue-300 active:shadow-lg 
                            transition duration-150 ease-in-out " @click="goHome">Home</button>
                                </li>
                                <li>
                                    <button type="button" class="inline-block px-2 py-2  bg-transparent text-white 
                            font-medium text-lg leading-tight  rounded  
                            hover:bg-gray-900 hover:shadow-lg focus:bg-blue-400 focus:shadow-lg 
                            focus:outline-none focus:ring-0 active:bg-gray-300 active:shadow-lg 
                            transition duration-150 ease-in-out " @click="goCategory">Category</button>
                                </li>
                                <li>
                                    <button type="button" class="inline-block px-4 py-2 bg-transparent text-white 
                            font-medium text-lg leading-tight  rounded 
                             hover:bg-gray-900 hover:shadow-lg focus:bg-blue-400
                            focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-300
                            active:shadow-lg transition duration-150 ease-in-out" @click="goBooking">Booking</button>

                                </li>
                                <li>
                            <button type="button" class="inline-block px-2 py-2  bg-transparent text-white 
                            font-medium text-lg leading-tight  rounded  
                            hover:bg-gray-900 hover:shadow-lg focus:bg-blue-400 focus:shadow-lg 
                            focus:outline-none focus:ring-0 active:bg-gray-300 active:shadow-lg 
                            transition duration-150 ease-in-out " @click="goReservationList">Reservation</button>
                                </li>

                                <li>
                            <button type="button" class="inline-block px-2 py-2  bg-transparent text-white 
                            font-medium text-lg leading-tight  rounded 
                            hover:bg-gray-900 hover:shadow-lg focus:bg-blue-400 focus:shadow-lg 
                            focus:outline-none focus:ring-0 active:bg-gray-300 active:shadow-lg 
                            transition duration-150 ease-in-out " @click="goAllUser">Show all user</button>
                                </li>
                                <li>
                            <button type="button" class="inline-block px-2 py-2  bg-transparent text-white 
                            font-medium text-lg leading-tight  rounded 
                            hover:bg-gray-900 hover:shadow-lg focus:bg-blue-400 focus:shadow-lg 
                            focus:outline-none focus:ring-0 active:bg-gray-300 active:shadow-lg 
                            transition duration-150 ease-in-out " @click="goContactUs">Contact us</button>
                                </li>
            </ul>
            <a class="hidden lg:inline-block lg:ml-auto lg:mr-3 py-2 px-6 bg-blue-500 hover:bg-blue-600 text-l text-white 
        font-bold  rounded-xl transition duration-200" href="#" @click="goSignIn">Sign In / Log In</a>
            <a class="hidden lg:inline-block lg:ml-right py-2 px-6 bg-emerald-500 hover:bg-emerald-600 text-l text-white 
        font-bold rounded-xl " href="#" @click="goSignUp">Register</a>
        </nav>
        <div class="flex object-cover ">
            <router-view></router-view>
        </div>
    </div>

</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300&display=swap');

ul li {
    list-style: none;
    margin: 0 auto;
    display: inline-block;
    padding: 0 10px;
    position: relative;
    text-decoration: none;
    text-align: center;
    font-family: 'Inter', sans-serif;
}

#bg_color {
    /* background-color: rgb(252 165 165); */
    background: linear-gradient(-45deg, #fdba74,#fca5a5,#a5f3fc);
    background-size: 400% 400%;
    height: 100vh;
    animation: gradient 10s ease infinite;
}
@keyframes gradient {
 0% {
  background-position: 0% 50%;
 }
 50% {
  background-position: 100% 50%;
 }
 100% {
  background-position: 0% 50%;
 }
}
</style>
