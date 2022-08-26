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
    <div>
        <h1>sign in</h1>
        <div class="mt-3">
            <label for="eMail" class="inline">e-mail :</label>
            <input id="eMail" type="text" v-model="eMail">
        </div>
        <div class="mt-3">
            <label for="pw" class="inline">password :</label>
            <input id="pw" type="password" v-model="passwordd">
        </div>
        <div class="mt-3">
            <button class="bg-rose-400 p-1.5" @click="submitt">submit</button>
        </div>
    </div>
</template>
 
<style>
</style>