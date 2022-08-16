<script setup>
import { ref,onBeforeMount } from 'vue'

console.clear();

let data = ref({})
let toggle = ref(true)
// GET
const getNotes = async () =>{
    const res = await fetch(`${import.meta.env.BASE_URL}api/events`)
    if(res.status === 200) {
    console.log(`response.status: ${res.status}`)
    console.log(res);
    data.value = await res.json()
    console.log(data.value.length);
    toggle.value = false
    }else 
    console.log("error, cann't get data");
}
onBeforeMount( async () => {
   await getNotes()
})
console.log(toggle.value);
</script>
 
<template>
<!-- <div id="grad1"> -->
<p class="sub"><b>BOOKING</b></p>
<p class="sub2">ABOUT INT221 INFORMATION TECHNOLOGY INTEGRATED PROJECT</p>
<!-- <p class="sub4">By OASIP_KW1</p> -->
<div class="sub3">
  <img src="../assets/title.png" alt="">
</div>
<!-- </div> -->
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Itim&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Changa+One&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Ubuntu+Mono:wght@700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:wght@700&display=swap');
html, body {
  width: 100%;
  height:100%;
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
/* body{
  position: fixed;
} */
#grad1{ 
  background: linear-gradient(-45deg,#0583d2,#61b0b7,#b8e3ff,#16558f);
  /* background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab); */
  width: 100%;
  height: 100vh;
  background-size: 400% 400%;
  /* position: relative; */
  animation: gradient 15s ease infinite;
    /* animation: change 1s ease-in-out infinite; */
}
.sub{
  font-size: 3em;
  text-align: center;
  color: #000000;
  position: absolute;
  width: 1000px;
  left: 365px;
  margin-top: -9em;
  /* font-family: 'Ubuntu Mono', monospace; */
  /* font-family: 'Libre Baskerville', serif; */
  font-family: 'Mali', cursive;
  margin-left: -11.5em;
  text-shadow: 5px 5px 10px #FFFFFF;
}
.sub2{
  font-size:0.95em;
  text-align: center;
  color: #000000;
  position: absolute;
  width: 702px;
  left: 480px;
  margin-top: -23em;
  /* font-family: 'Libre Baskerville', serif; */
  text-shadow: 5px 5px 10px #FFFFFF;
  font-family: 'Mali', cursive;
  /* font-family: 'Ubuntu Mono', monospace; */
  /* font-family: 'Libre Baskerville', serif; */
  margin-left: -33.5em;
}
.sub3{
  position: absolute;
  margin-top: -39em;
  left: 35em;
  width: 500;
  height: 600;
  /* font-family: 'Ubuntu Mono', monospace; */
}

.sub4{
  /* font-size: 1.5em; */
  text-align: center;
  color: #000000;
  position: absolute;
  width: 702px;
  left: 480px;
  margin-top: -18em;
  /* font-family: 'Ubuntu Mono', monospace; */
  font-family: 'Libre Baskerville', serif;
  margin-left: -21em;
}

    
</style>