<script setup>
import { ref } from 'vue'
import BaseDate from './components/BaseDate.vue'
import BaseNav from './components/BaseNav.vue'
import { useRouter } from 'vue-router'
import { computed } from '@vue/reactivity';

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
// const isLogIn =ref(false)
// const localS =computed(()=>localStorage.getItem('token'))

// const check=computed(()=>{
//     let checkk=undefined
//    if(localS.value!=null){
//         checkk=true
//    }else checkk=false
//     return checkk
// })


// console.log(localStorage.length)
const logOut=()=>{
    //   localStorage.removeItem('tokenA')
    //   localStorage.removeItem('tokenR')
    //   localStorage.removeItem('role')

    //localStorage.getItem('token')
     //goHome()
    //console.log(localStorage.getItem('token'))
}

const decode=(token)=>{  
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}
</script>

<template>
    <div id="bg_color">
            <router-view></router-view>
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
