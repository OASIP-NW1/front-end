<script setup>
import BaseDate from './BaseDate.vue'
import BaseLinkPage from './BaseLinkPage.vue'

console.clear()
    const logoSize = 'width:50px;';

    defineProps({
    link:{
        type:Boolean,
        default:false
    },
    signIn:{
        type:Boolean,
        default:false
    },
    signUp:{
        type:Boolean,
        default:false
    },
    logOut:{
        type:Boolean,
        default:false
    },
    contractUs:{
        type:Boolean,
        default:false
    },
    home:{
        type:Boolean,
        default:false
    },
    showUser:{
        type:Boolean,
        default:false
    }

})

</script>
 
<template>
    <nav
        class="  bg-gray-500  drop-shadow-md   w-[100%] h-[9%]" >
        <div class="px-5   flex justify-between flex-wrap container mx-auto  items-center">

        <div class="w-fit flex   m-2 ml-10">
            <img src="../assets/icon.png" alt="LOGO" :style="logoSize" class="w-fit "/>

            <h1 class="font-bold text-xl text-white mx-4 w-fit inline-flex my-auto">
                <BaseDate :isTime='true' />

                    <br>
                <span class=" font-medium text-[14px] ml-[10px] ">
                <BaseDate :isDate="true" />
                </span>
            </h1>
        </div>
 

        <div class=" flex  lg:space-x-6 mx-2">
          <BaseLinkPage :linkk="link" :signInn="signIn" :signUpp="signUp" :logOutt="logOut" :contractUss="contractUs" :showUserr="showUser"  :homee="home" />

        </div>
        <!-- <div v-if="true">
            <button class="hidden lg:inline-block mx-2 py-2 px-6 bg-blue-500 hover:bg-rose-500 text-l text-white 
                    font-bold  rounded-xl transition duration-200" @click="goSignIn">Sign In</button>
            <button class="hidden lg:inline-block mx-2 py-2 px-6 hover:bg-emerald-500 bg-rose-500 text-l text-white 
                    font-bold  rounded-xl transition duration-200" @click="goSignUp">Sign up</button>

            
        </div> -->
        


        
        </div>
    </nav>


    
</template>
 
<style>

</style>