<script setup>
import { useRouter } from "vue-router";
const myRouter = useRouter();
// const goBooking = () => myRouter.push({ name: "Booking" });
const goSignUp = () => myRouter.push({ name: 'SignUp' })
const goSignIn = () => myRouter.push({ name: 'SignIn' })
</script>

<template>
  <div class="w-3/4 m-auto mt-12 p-10 flex text-gray-100">
    <!--Left Col-->
    <div class="showUp ">
      <div class="text">
        <span class="welcome">Welcome to OASIP </span>
        <br><span class="online">Online Appointment Sevice for Integrated Project Clinic</span>
      </div>

      <div class="text-5xl font-bold leading-tight w-fit">
        <span>Online Appointment</span><br />
        <span>Scheduling System</span>
      </div>
      <div class="leading-normal text-2xl mb-8 w-fit">
        <p>Booking appointment by yourself!</p>
      </div>
      <div class="w-fit">
        <button
          class="hover:underline bg-white text-gray-800 font-bold rounded-full py-6 px-10 shadow-lg  focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
          @click="goBooking"
        >
          Start
        </button>
      </div>
    </div>

    <!--Right Col-->
    <div class="showUp w-1/3 inline-block h-fit mt-20">
      <!-- ขึ้นลง -->
      <div class="w-62 m-auto">
        <img class="z-50 animate-bounce" src="../../public/hansom.jpg" />
      </div>

      <!-- เข้มจาง -->
      <!-- <img class="w-full md:w-3/5 z-50 animate-pulse " src="../assets/test2.png" /> -->
      <!-- https://tailwindcss.com/docs/animation -->

      <br>
        <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xl py-6 px-10 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" @click="goSignUp">Log In
        <svg aria-hidden="true" class="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
        </button> &nbsp;&nbsp;&nbsp;&nbsp;
<img src="../assets/login-img.png" alt="picture" id="picture" width="500">
>>>>>>> bf57c8b724ca433db27a43f6b778bae5cd10d86d
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
