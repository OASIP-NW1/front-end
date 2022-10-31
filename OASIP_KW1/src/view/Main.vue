<script setup>
import { useRouter } from 'vue-router'
import { onBeforeMount, onMounted, ref} from 'vue';
import BaseNav from '../components/BaseNav.vue'
const checkRole=ref(undefined)

const getRole=()=>{
    let role =localStorage.getItem('role')
    // console.log(role)
    checkRole.value=role
}
onBeforeMount(()=>{
    getRole()
  //  console.log(checkRole.value)
})
// onMounted(()=>{
//     console.log('test')
//     console.log(checkRole.value)
// })
    const myRouter = useRouter()
    const goBooking = () => myRouter.push({ name: 'Booking' })
    const goCategory = () => myRouter.push({ name: 'Category' })
    const goReservationList = () => myRouter.push({ name: 'ReservationList' })
    const goAllUser = () => myRouter.push({ name: 'AllUser' })
</script>
    
<template>
        <div id="bg_color" class="h-full">
            <BaseNav   :logOut="true" :link="false"   />
            <div class="  flex" style="height:88%">
                    <div class="bg-gray-700 pt-2 px-4 w-[15%]" >
                        <div class="w-[80%] mx-auto mt-10 text-xl text-gray-500">
                            <ul>
                                <li class=" text-center my-5 p-2 border-b-2 hover:font-semibold hover:text-gray-200 hover:text-2xl  border-gray-500 hover:border-b-3 hover:border-gray-400">
                                    <button @click="goBooking" class="focus:text-rose-200 focus:text-2xl focus:font-semibold">
                                        Booking
                                    </button>
                                </li>
                                <li class=" text-center my-5 p-2 border-b-2 hover:font-semibold hover:text-gray-200 hover:text-2xl  border-gray-500 hover:border-b-3 hover:border-gray-400">
                                    <button @click="goCategory" class="focus:text-rose-200 focus:text-2xl focus:font-semibold">
                                    Category                                        
                                    </button>
                                </li>
                                <li class=" text-center my-5 p-2 border-b-2 hover:font-semibold hover:text-gray-200 hover:text-2xl  border-gray-500 hover:border-b-3 hover:border-gray-400">
                                    <button @click="goReservationList" class="focus:text-rose-200 focus:text-2xl focus:font-semibold">
                                    Reservation                                       
                                    </button>
                                </li>
                                <li v-if="checkRole=='admin'?true:false" class=" text-center my-5 p-2 border-b-2  hover:font-semibold hover:text-gray-200 hover:text-[22px]  border-gray-500 hover:border-b-3 hover:border-gray-400">
                                    <button @click="goAllUser" class="focus:text-rose-200 focus:text-[22px] focus:font-semibold">
                                    Show all user                                        
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="flex object-cover w-[85%] " >
                     <router-view></router-view> 
                    </div>
            </div>
        </div>
    
</template>
    
<style scoped>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300&display=swap');
    
    /* ul li {
        list-style: none;
        margin: 0 auto;
        display: inline-block;
        padding: 0 10px;
        position: relative;
        text-decoration: none;
        text-align: center;
        font-family: 'Inter', sans-serif;
    } */
    
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
    