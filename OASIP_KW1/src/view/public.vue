<script setup>
import BaseNav from '../components/BaseNav.vue'
</script>
 
<template>
    <div id="bg_color" class="h-full">
        <BaseNav :signIn="true" :signUp="false" :contractUs="true" :home="true" />
        <div class="flex object-cover h-[88%]">
            <router-view></router-view>
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