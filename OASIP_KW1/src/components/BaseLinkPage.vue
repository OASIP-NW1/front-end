<script setup>
import { useRouter } from 'vue-router'
import * as msal from 'msal';
import {ref,onBeforeMount} from 'vue'
defineProps({
    linkk:{
        type:Boolean
    },
    signInn:{
        type:Boolean
    },
    signUpp:{
        type:Boolean
    },
    logOutt:{
        type:Boolean
    },
    contractUss:{
        type:Boolean
    },
    homee:{
        type:Boolean
    },
    showUserr:{
        type:Boolean
    }

})
    const status = ref(undefined)
    
    const myRouter = useRouter()
    const goHome = () => myRouter.push({ name: 'Home' })
    const goBooking = () => myRouter.push({ name: 'Booking' })
    const goCategory = () => myRouter.push({ name: 'Category' })
    const goReservationList = () => myRouter.push({ name: 'ReservationList' })
    const goContactUs = () => myRouter.push({ name: 'ContactUs' })
    const goAllUser = () => myRouter.push({ name: 'AllUser' })
    const goSignUp = () => myRouter.push({ name: 'SignUp' })
    const goSignIn = () => myRouter.push({ name: 'SignIn' })

    const logOut=async()=>{
        if(status.value==true){
        console.log('sign in with teams')
       await userAgentApplication.value.logout()
        localStorage.removeItem("isMST")
        localStorage.removeItem('tokenA')
        localStorage.removeItem('tokenR')
        localStorage.removeItem('role')
        localStorage.removeItem('name')
        sessionStorage.clear();
        goHome()
        }else if(status.value!=true){
        console.log('sign in without teams')
        localStorage.removeItem("isMST")
        localStorage.removeItem('tokenA')
        localStorage.removeItem('tokenR')
        localStorage.removeItem('role')
        localStorage.removeItem('name')
        sessionStorage.clear();
        goHome()
        }

        
       
        
        
        // localStorage.getItem('token')
        
         
        //console.log(localStorage.getItem('token'))
    }

    // mst
    const userAgentApplication = ref(new msal.UserAgentApplication({
      auth: {
        clientId: '63b704b4-2c35-4065-886a-8c24369da93b',
        authority: 'https://login.microsoftonline.com/6f4432dc-20d2-441d-b1db-ac3380ba633d',
        // redirectUri: 'http://localhost:3000/sign-in',
      },
      cache: {
        cacheLocation: 'localStorage',
        storeAuthStateInCookie: true,
      },
    }));


    const checkMST =()=>{
        let statusMst =Boolean(localStorage.getItem('isMST'))
        status.value =statusMst
        console.log(status.value)
    }
    onBeforeMount(()=>{
    checkMST()
    //  console.log(checkRole.value)
    })
</script>
 
<template>
            <div v-if="homee==true" class="mx-3" >
                <button type="button" class="inline-block px-2 py-2 bg-transparent text-white 
                                font-medium text-lg leading-tight  rounded  
                                hover:bg-gray-900 hover:shadow-lg focus:bg-blue-400 focus:shadow-lg 
                                focus:outline-none focus:ring-0 active:bg-blue-300 active:shadow-lg 
                                transition duration-150 ease-in-out " @click="goHome">Home</button>
            </div>
            <div v-if="linkk==true" class="inline-flex">

            
            <div class="mx-3">
                <button type="button" class="inline-block px-2 py-2  bg-transparent text-white 
                                font-medium text-lg leading-tight  rounded  
                                hover:bg-gray-900 hover:shadow-lg focus:bg-blue-400 focus:shadow-lg 
                                focus:outline-none focus:ring-0 active:bg-gray-300 active:shadow-lg 
                                transition duration-150 ease-in-out " @click="goCategory">Category</button>
            </div>
            <div class="mx-3">
                <button type="button" class="inline-block px-4 py-2 bg-transparent text-white 
                                font-medium text-lg leading-tight  rounded 
                                 hover:bg-gray-900 hover:shadow-lg focus:bg-blue-400
                                focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-300
                                active:shadow-lg transition duration-150 ease-in-out"
                    @click="goBooking">Booking</button>

            </div>
            <div class="mx-3">
                <button type="button" class="inline-block px-2 py-2  bg-transparent text-white 
                                font-medium text-lg leading-tight  rounded  
                                hover:bg-gray-900 hover:shadow-lg focus:bg-blue-400 focus:shadow-lg 
                                focus:outline-none focus:ring-0 active:bg-gray-300 active:shadow-lg 
                                transition duration-150 ease-in-out " @click="goReservationList">Reservation</button>
            </div>
            <div v-if="showUserr==true" class="mx-3">
                <button type="button" class="inline-block px-2 py-2  bg-transparent text-white 
                                font-medium text-lg leading-tight  rounded 
                                hover:bg-gray-900 hover:shadow-lg focus:bg-blue-400 focus:shadow-lg 
                                focus:outline-none focus:ring-0 active:bg-gray-300 active:shadow-lg 
                                transition duration-150 ease-in-out " @click="goAllUser">Show all user</button>
            </div>
            </div>

            <div v-if="contractUss==true" class="mx-3">
                <button type="button" class="inline-block px-2 py-2  bg-transparent text-white 
                                font-medium text-lg leading-tight  rounded 
                                hover:bg-gray-900 hover:shadow-lg focus:bg-blue-400 focus:shadow-lg 
                                focus:outline-none focus:ring-0 active:bg-gray-300 active:shadow-lg 
                                transition duration-150 ease-in-out " @click="goContactUs">Contact us</button>
            </div>
            <!-- <div v-if="userr==true" class="w-48 m-auto  bg-white p-0.5 rounded">
                <h1 class="mx-auto w-fit">{{userName}}</h1>

            </div> -->

            <div v-if="signInn==true">
                <button class="justify-end hidden lg:inline-block mx-2 py-2 px-6 hover:bg-blue-400 bg-emerald-500 hover:text-gray-600 text-l text-white 
                    font-bold  rounded-xl transition duration-200" @click="goSignIn">Sign in</button>
            </div>

            <div v-if="signUpp==true">
                <button class="justify-end hidden lg:inline-block mx-2 py-2 px-6 hover:bg-emerald-400 hover:text-gray-600 bg-blue-600 text-l text-white 
                    font-bold  rounded-xl transition duration-200" @click="goSignUp">Sign up</button>
            </div>
            <div v-if="logOutt==true " >
                <button class="justify-end hidden lg:inline-block mx-1 py-1 px-4 hover:bg-rose-300 hover:text-gray-600  text-[14px] text-white 
                    font-bold  rounded-xl transition duration-200" @click="logOut">Log out</button>
            </div>
            
</template>
 
<style>

</style>