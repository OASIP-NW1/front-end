<script setup>
import {ref} from 'vue'
import { onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';
import BaseNav from '../components/BaseNav.vue'
const passwordd=ref('')
const eMail=ref('')
// const userList=ref([])
let token=ref(undefined)
const userCheck=ref(undefined)
const userLink=`${import.meta.env.BASE_URL}api/users`
const matchLink =`${import.meta.env.BASE_URL}api/login`

 //router
 const myRouter = useRouter();
  const goBooking= () =>
    myRouter.push({
      name: "Booking"
    });
// //GET user
// const getAllUser = async () => {
//   const res = await fetch(userLink);
//   if (res.status === 200) {
//     userList.value = await res.json();
//     userCheck.value = true;
//     console.log(userList.value)
//   } else {
//     userCheck.value = false;
//   }
// };
// onBeforeMount(async()=>{
//     await getAllUser();
// })

// validate
const check_404=ref(false)
const check_200=ref(false)
const check_401 =ref(false)
const check_400 =ref(false)
const checkOther=ref(false)

// send to back for check
const sendd =async ()=>{
    const res = await fetch(matchLink, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
     email:eMail.value,
     password:passwordd.value
    })
  });if(res.status==200){
    console.log("sign in successful")
    check_200.value=true
    token.value=await res.json()
    // console.log(token.value.jwtToken)
    saveLocal()
    setTimeout(()=>(goBooking()),2000)
  
  }
  else
  if(res.status==404){
    console.log('not found')
    check_404.value=true
  }
  else
  if(res.status==401){
    console.log("Password Incorrect")
    check_401.value=true
  }
  else
  if(res.status==400){
    console.log('Bad request')
    check_400.value=true
  }else{
    console.log('can not sign-in please try again later')
    checkOther.value=true 
  } 
}


// validate
const checkEMailN=ref(false)
const checkPasswordN=ref(false)
// submit
const submitt =()=>{
   check_404.value=false
    check_200.value=false
    check_401.value=false
    check_400.value=false
    checkOther.value=false
    // check email null
    if(eMail.value.length==0){
        checkEMailN.value=true
        console.log("e-mail is null")
    }else checkEMailN.value=false
        // check password null
    if(passwordd.value.length==0){
        checkPasswordN.value=true
        console.log("password is null")
    }else checkPasswordN.value=false

    if(checkEMailN.value==false&&checkPasswordN.value==false){
        console.log("get in last check")
        sendd()
    }
}

// local storage
const saveLocal=()=>{
  let role = undefined
  let name = undefined
  role=decode(token.value.accessToken).Roles
  name=decode(token.value.accessToken).sub
  localStorage.setItem('tokenA',`${token.value.accessToken}`)
  localStorage.setItem('tokenR',`${token.value.refreshToken}`)
  localStorage.setItem('role',`${role.substring(5)}`)
  localStorage.setItem('name',`${name}`)

}
//decode jwt key
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
  
  
    <div class="mx-auto my-14 max-w-screen-md p-5 pb-7 mx-auto mt-14 bg-gray-200 rounded-md shadow-sm shadow-xl justify-center">
    <div class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
    <div>
      <img class="mx-auto h-12 w-auto" src="../assets/login-img.png" alt="Workflow">
      <h2 class="mt-6 text-center text-3xl tracking-tight font-bold text-gray-900">Sign in to your account</h2>
      <p class="mt-2 text-center text-sm text-gray-600"></p>
    </div>
    <!-- <form class="mt-8 space-y-6" action="#" method="POST"> -->
      <input type="hidden" name="remember" value="true">
      <div class="rounded-md shadow-sm -space-y-px">
        <div>
          <label for="email-address" class="sr-only">Email address</label>
          <input :style="[check_400==true||checkEMailN==true?' border-style: solid;border-color: red;':'']" id="email-address" name="email" type="email" autocomplete="email" required class="appearance-none rounded-none relative 
          block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none 
          focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email address" v-model="eMail">
        </div>
        <div>
          <label for="password" class="sr-only">Password</label>
          <input :style="[check_401==true||checkPasswordN==true?' border-style: solid;border-color: red;':'']" id="password" name="password" type="password" autocomplete="current-password" 
          required class="appearance-none rounded-none relative block w-full px-3 py-2 border 
          border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none 
          focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password" v-model="passwordd">
        </div>
      </div>

      <!-- <div class="flex items-center justify-between">
        <div class="flex items-center">
          <input id="remember-me" name="remember-me" type="checkbox" 
          class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded">
          <label for="remember-me" class="ml-2 block text-sm text-gray-900"> Remember me </label>
        </div> -->

        <!-- <div class="text-sm">
          <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500"> Forgot your password? </a>
        </div>
      </div> -->

      <div>
        <button class="group relative w-full flex justify-center py-2 px-4 border 
        border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" @click="submitt">
          <!-- <span class="absolute left-0 inset-y-0 flex items-center pl-3">
            <svg class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
            </svg>
          </span> -->
          Sign in
        </button>
      </div>
    <!-- </form> -->
  </div>
</div>
</div>

<!-- for alert -->
<div class="alert-area">
        <div v-if="check_200==true" class="alert success text-sm">
          <span class="closebtn" @click="check_200 = false">x</span>
          <strong class="block">Success !</strong> Sign-in successful.
        </div>
        <div v-if="checkEMailN==true" class="alert warning text-sm">
          <span class="closebtn" @click="checkEMailN = false">x</span>
          <strong class="block">Warning!</strong> Please input your e-mail.
        </div>
        <div v-if="checkPasswordN==true" class="alert warning text-sm">
          <span class="closebtn" @click="checkPasswordN = false">x</span>
          <strong class="block">Warning!</strong> Please input your password.
        </div>
        <div v-if="check_400==true" class="alert text-sm">
          <span class="closebtn" @click="check_400 = false">x</span>
          <strong class="block">Warning!</strong> E-mail invalid form.
        </div>
        <div v-if="check_401==true" class="alert text-sm">
          <span class="closebtn" @click="check_401 = false">x</span>
          <strong class="block">Error!</strong> Password Incorrect.
        </div>
        <div v-if="check_404==true" class="alert text-sm">
          <span class="closebtn" @click="check_404 = false">x</span>
          <strong class="block">Error!</strong> Not found this user.
        </div>
        <div v-if="checkOther==true" class="alert warning text-sm">
          <span class="closebtn" @click="checkOther = false">x</span>
          <strong class="block">Warning !</strong> A system error has occurred,please try again.
        </div>
</div>
</template>

<style scoped>
  /* alert */
.alert-area {
  position: fixed;
  top: 150px;
  right: 0;
  background-color: transparent;
  width: 23%;
  margin-right: 10px;
}
.alert {
  position: relative;
  width: 100%;
  padding-top: 15px;
  padding-left: 15px;
  padding-right: 15px;
  padding-bottom: 10px;
  animation: moveLeft 0.9s;
  animation-timing-function: ease-in-out;
  background-color: #f44336;
  color: white;
  opacity: 1;
  transition: opacity 0.6s;
  margin-bottom: 15px;
}
.alert.success {
  background-color: #04aa6d;
}
.alert.info {
  background-color: #2196f3;
}
.alert.warning {
  background-color: #ff9800;
}
.closebtn {
  margin-left: 15px;
  color: white;
  font-weight: bold;
  float: right;
  font-size: 22px;
  line-height: 20px;
  cursor: pointer;
  transition: 0.3s;
}
.closebtn:hover {
  color: black;
}
/* animetion */
@keyframes moveLeft {
  0% {
    right: -300px;
    top: 0px;
    opacity: 0;
  }
  100% {
    right: 0px;
    top: 0px;
    opacity: 1.5;
  }
}
</style>

