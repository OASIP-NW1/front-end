<script setup>
import {ref} from 'vue'

const name=ref('')
const eMail=ref('')
const role= ref('')

const userLink=`http://localhost:8080/api/users`

// submit
const submit =async ()=>{
  const res = await fetch(userLink, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      name: name.value,
      email: eMail.value,
      role: role.value,
      createdOn:null,
      updatedOn:null

    }),
  });
    if(res.status==201){
        console.log("add new user")
    }else{
        console.log("can not add new user")
    }
  }    

</script>
 
<template>
    <div class="w-2/5 h-2/6 bg-white rounded-md p-4 m-auto mt-10">
        <!-- head -->
        <div class="m-auto w-fit">
            <h2>Sign-up</h2> 
        </div>
        <!-- body -->
        <div class="m-auto w-2/5">
            <div class="m-4 ">
                <h3>Username :</h3> 
                <input class="border-black border-2" type="text" v-model="name">
            </div>
            <div class="m-4">
                <h3>E-mail :</h3>
                <input class="border-black border-2" type="text" v-model="eMail">
            </div>
            <div class="m-4">
                <h3>role :</h3> 
                <input class="border-black border-2" type="text" v-model="role">
            </div>
            <!-- <div class="m-4">
                <h3>password :</h3> 
                <input class="border-black border-2" type="text" v-model="role">
            </div> -->
        </div>
        <!-- button -->
        <div class="m-auto w-fit">
            <button class="p-6 m-2" @click="submit">
                submit
            </button>
        </div>


           
    </div>
</template>
 
<style>

</style>