<script setup>
import {ref} from 'vue'
import { useRouter } from 'vue-router';

const name=ref('')
const eMail=ref('')
const role= ref('')
const nameL=100
const eMailL=50

// validate
const checkName=ref(undefined)
const checkEMail=ref(undefined)

//router
const myRouter = useRouter();
const goHome = () =>
  myRouter.push({
    name: "Home"
  });

  

const userLink=`http://localhost:8080/api/users`

// submit
const submitt = ()=>{
    console.log(name.value)
    console.log(eMail.value)
    console.log(role.value)

    if(name.value==''){
        checkName.value=false
        console.log(false)
    }else checkName.value=true 

    if(eMail.value==''){
        checkEMail.value=false
        console.log(false)
    }else checkEMail.value=true

    if(checkEMail.value==true && checkName.value==true){
        console.log(true)
        addNewUser()
    } 
  }    

//add new user

const addNewUser=async ()=>{
 const  res = await fetch(userLink, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      name: name.value.trim(),
      email: eMail.value.trim(),
      role: role.value==''?null:role.value,
      createdOn:null,
      updatedOn:null

    }),
  });if(await res.status==201){
        console.log("add new user")
        checkName.value=undefined
        checkEMail.value=undefined
        name.value=''
        eMail.value=''
        role.value=''
        goHome()      

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
            <a href="#submit" class="p-6 m-2" >
                submit
            </a>
        </div>


           
    </div>

         <!-- for submit  -->
  <div id="submit" class="overlay">
    <div class="popup2 ">
      <h2 class="mb-5 text-xl font-bold bg-white mx-auto w-fit">
        Are you sure ?
      </h2>

      <div class="option flex m-auto w-full mt-10">
        <a
          @click="submitt"
          href="#"
          class="w-full text-center p-2 px-2 bg-gray-200 hover:bg-green-500 font-bold hover:text-white"
          >Yes</a
        >
        <a
          href="#"
          class="w-full text-center p-2 px-2 bg-gray-200 hover:bg-rose-500 font-bold hover:text-white"
          >No</a
        >
      </div>
    </div>
  </div>
</template>
 
<style scoped>
/* submit */
.overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.7);
  transition: opacity 500ms;
  visibility: hidden;
  opacity: 0;
}
.overlay:target {
  visibility: visible;
  opacity: 1;
}
.popup2 {
  margin: auto;
  margin-top: 17%;
  padding-top: 23px;
  background: #fff;

  width: 20%;
  height: 130px;
  position: relative;
  transition: all 5s ease-in-out;
}

.popup2 h2 {
  margin-top: 0;
  color: #333;
}

.popup2 .option {
  bottom: 0;
}

@media screen and (max-width: 700px) {
  .popup2 {
    width: 70%;
  }

  .option {
    width: 20%;
  }
}

</style>