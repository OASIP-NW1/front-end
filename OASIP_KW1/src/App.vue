<script setup>

</script>
 
<template>
  <div id="grad1">
  <nav class="navbar navbar-expand-lg">
    <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav">
      <li class="nav-item">
        <router-link :to="{ name: 'Home'}"><a class="nav-link" style="color: #000000; font-size: medium;"><b>HOME</b></a></router-link>
      </li>
       <li class="nav-item">
        <router-link :to="{ name: 'EventCategory'}"><a class="nav-link" style="color: #000000; font-size: medium;"><b>CATEGORY</b></a></router-link>
      </li> 
       <li class="nav-item">
        <router-link :to="{ name: 'EventListAll'}"><a class="nav-link" style="color: #000000; font-size: medium;"><b>APPOINMENT</b></a></router-link>
      </li>
      <li class="nav-item">
        <router-link :to="{  name: 'AddEvents' }"><a class="nav-link" style="color: #000000; font-size: medium;"><b>RESERVE</b></a></router-link>
      </li>
       <li class="nav-item">
        <router-link :to="{  name: 'Abouts' }"><a class="nav-link" style="color: #000000; font-size: medium;"><b>PROFILES</b></a></router-link>
      </li>
    </ul>
  </div>
</nav>
</div>
<!-- </div> -->
<router-view></router-view>
</template>
 
<style>
@import url('https://fonts.googleapis.com/css2?family=Ubuntu+Mono:wght@700&display=swap');
.navbar{
  /* margin-left: -1em; */
  padding: 29.75em;
  /* width: max-content; */
  /* height: 90px; */
  /* position: fixed; */
  /* margin-top: 5em; */
}
.nav-item{
  /* position: fixed; */
  margin-top: 0.99em;
  padding-left: 2em;
  /* font-family: 'Ubuntu Mono', monospace; */
  font-family: 'Mali', cursive;
}
</style>