<script setup>
import { useRouter } from "vue-router";

const myRouter = useRouter();
// const goBooking = () => myRouter.push({ name: "Booking" });
const goSignUp = () => myRouter.push({ name: 'SignUp' })
const goSignIn = () => myRouter.push({ name: 'SignIn' })
</script>

<template>
 
  
  <div class="w-3/4 m-auto mt-20 p-10 flex text-gray-100">
    <!--Left Col-->
    <div class="showUp ">
      <div class="text">
        <span class="welcome">Welcome to OASIP </span>
        <br><span class="online">Online Appointment Sevice for Integrated Project Clinic</span>
      </div>
      <br>
        <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xl py-6 px-10 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" @click="goSignUp">Sign up
        <svg aria-hidden="true" class="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
        </button> &nbsp;&nbsp;&nbsp;&nbsp;
<img src="../assets/login-img.png" alt="picture" id="picture" width="500">
    </div>
  </div>

</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300&display=swap');
.showUp {
  position: relative;
  animation: wii 1s;
  animation-timing-function: ease-in-out;
}

.text{
    font-family: 'Inter', sans-serif;
}
.welcome{
  font-size: 4.5em;
  /* padding-left: -5em; */
  margin-left: -1.5em;
}
.online{
  font-size: 2em;
  margin-left: -3.5em;
}
#picture{
    margin-left: 47em;
    margin-top: -15em;
}
#SignUp{
  font-size: 1.5em;
}
/* animation */
@keyframes wii {
  0% {
    top: -40px;
    opacity: 0;
  }

  100% {
    top: 0px;
    opacity: 1.5;
  }
}
</style>