<script setup>
import {ref} from 'vue'
import { onBeforeMount } from 'vue';
const passwordd=ref('')
const eMail=ref('')
const userList=ref([])
const userCheck=ref(undefined)
const userLink=`${import.meta.env.BASE_URL}api/users`
const matchLink =`${import.meta.env.BASE_URL}api/match`
//GET user
const getAllUser = async () => {
  const res = await fetch(userLink);
  if (res.status === 200) {
    userList.value = await res.json();
    userCheck.value = true;
    console.log(userList.value)
  } else {
    userCheck.value = false;
  }
};
onBeforeMount(async()=>{
    await getAllUser();
})
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
    console.log("good status")
  }else console.log("Password no match pls sign up")
}

// validate
const checkEMailN=ref(undefined)
const checkPasswordN=ref(undefined)
// submit
const submitt =()=>{

    // check email null
    if(eMail.value.length==0){
        checkEMailN.value=false
        console.log("e-mail is null")
    } checkEMailN.value=true
        // check password null
    if(passwordd.value.length==0){
        checkPasswordN.value=false
        console.log("password is null")
    } checkPasswordN.value=true
    if(checkEMailN.value==true&&checkPasswordN.value==true){
        console.log("get in last check")
        sendd()
    }
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
          <input id="email-address" name="email" type="email" autocomplete="email" required class="appearance-none rounded-none relative 
          block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none 
          focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email address" v-model="eMail">
        </div>
        <div>
          <label for="password" class="sr-only">Password</label>
          <input id="password" name="password" type="password" autocomplete="current-password" 
          required class="appearance-none rounded-none relative block w-full px-3 py-2 border 
          border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none 
          focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password" v-model="passwordd">
        </div>
      </div>

      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <input id="remember-me" name="remember-me" type="checkbox" 
          class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded">
          <label for="remember-me" class="ml-2 block text-sm text-gray-900"> Remember me </label>
        </div>

        <div class="text-sm">
          <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500"> Forgot your password? </a>
        </div>
      </div>

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
</template>

<style>
</style>

