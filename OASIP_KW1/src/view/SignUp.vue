<script setup>
import {ref} from 'vue'
import { useRouter } from 'vue-router';
import { onBeforeMount } from 'vue';

const name=ref('')
const eMail=ref('')
const role= ref('')
const nameL=100
const eMailL=50
const passwordL=14
const userList=ref([])
const passwordd=ref('')
const passwordC=ref('')

//router
const myRouter = useRouter();
const goHome = () =>
  myRouter.push({
    name: "Home"
  });

  

const db="http://localhost:5000/user"
const userLink=`${import.meta.env.BASE_URL}api/users`


//GET user
const userCheck=ref(undefined)
const getUser = async () => {
  const res = await fetch(userLink);
  if (res.status === 200) {
    userList.value = await res.json();
    userCheck.value = true
    console.log("get user")
    //console.log(userList.value)
  } else {
    userCheck.value = false
  }
};
onBeforeMount(async()=>{
    await getUser();
})

// validate
const checkNameN=ref(undefined)
const checkEMailN=ref(undefined)
const checkNameL=ref(undefined)
const checkEMailL=ref(undefined)
const checkEmailF =ref(undefined)
const checkPasswordN=ref(undefined)
const checkPasswordL=ref(undefined)
const valFormEmail = (input) => {
  let valid =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (input.match(valid)) {
    return true;
  } else {
    return false;
  }
};

// submit
const submitt = ()=>{
    // console.log(name.value)
    // console.log(eMail.value)
    // console.log(role.value)
    isUniqueName.value=undefined
    isUniqueEmail.value=undefined
    isUniqueNameAndRole.value=undefined
    checkUniqueName()
    checkUniqueEmail()
    checkUniqueNameAndRole()


    // check name is null?
    if(name.value.trim()==''){
        checkNameN.value=false
        console.log("name is null")
    }else checkNameN.value=true 
 
    // check e-mail is null?    
    if(eMail.value.trim()==''){
        checkEMailN.value=false
        console.log("email is null")
    }else checkEMailN.value=true

    // check password null
    if(passwordC.value.length==0||passwordd.value.length==0){
        checkPasswordN.value=false
        console.log("password is null")
    }else checkPasswordN.value=true;console.log(checkPasswordN.value)

    //check name length
    if(name.value.length>nameL){
      console.log("name over 100")
      checkNameL.value=false
    }else checkNameL.value=true //;console.log('checkName Length',checkNameL.value)

    //check e-mail length
    if(eMail.value.length>eMailL){
      console.log("email over 50")
      checkEMailL.value=false
    }else checkEMailL.value=true //;console.log('checkEMail Length',checkEMailL.value)

    // check e-mail form
    if(valFormEmail(eMail.value)==false){
      console.log("email invalid form")
      checkEmailF.value=false
    }else checkEmailF.value=true

    // check password is length ?
    if(passwordC.value.length>passwordL ||passwordd.value.length>passwordL){
        checkPasswordL.value=false
        console.log("Passwords is over 14 ")
    }else checkPasswordL.value=true

    // check unique
    if(isUniqueName.value==true){
        console.log("name is ununique 😏")
    }else 
    if(isUniqueEmail.value==true){
        console.log("email is ununique 😏")
    }else
    if(isUniqueNameAndRole.value==true ){
        console.log("role and name is ununique")
    }else
    if(passwordC.value.trim()!==passwordd.value.trim()){
        console.log("Passwords do not match.")
    }else
    // last check
    if(checkEMailN.value==true && checkNameN.value==true &&checkEMailL.value==true &&checkNameL.value==true&&checkEmailF.value==true&&isUniqueName.value!==true&&isUniqueEmail.value!==true&&isUniqueNameAndRole.value!==true&&checkPasswordL.value==true&&checkPasswordN.value==true){
        console.log("status good")
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
      role: role.value==''?null:role.value.trim(),
      password: passwordd.value.trim()

    })
  });if( res.status==201){
        console.log("add new user")
        checkNameN.value=undefined
        checkEMailN.value=undefined
        name.value=''
        eMail.value=''
        role.value=''
        goHome()      

    }else{
        console.log("can not add new user pls try again")
        
    }
}

// functoin for check unique
const isUniqueName =ref(undefined)
const isUniqueEmail =ref(undefined)
const isUniqueNameAndRole =ref(undefined)

const checkUniqueName =()=>{
  for(let check of userList.value){
    if(check.name==name.value){
      console.log(`Name :${check.name}`)
      isUniqueName.value=true
    }
  }
}

const checkUniqueEmail =()=>{
  for(let check of userList.value){
    if(check.email==eMail.value){
      console.log(`E-mail :${check.email}`)
      isUniqueEmail.value=true
    }
  }
}

const checkUniqueNameAndRole =()=>{
  for(let check of userList.value){
    if(check.role==role.value &&check.name==name.value){
      console.log(`Role :${check.role} Name : ${check.name}`)
      isUniqueNameAndRole.value=true
    }
  }
}

</script>
 
<template>
  <!-- <div class="w-2/5 h-2/6 bg-white rounded-md p-4 m-auto mt-10"> -->
  <!-- head -->
  <!-- <div class="m-auto w-fit"> -->
  <!-- <h2>Register</h2> -->
  <!-- </div> -->
  <!-- body -->
  <!-- <div class="m-auto w-2/5">
      <div class="m-4 ">
        <label for="name">Username ({{ name.length }}) :</label>
        <input id="name" class="border-black border-2" type="text" v-model="name">
      </div>
      <div class="m-4">
        <label for="email">E-mail ({{ eMail.length }}) :</label>
        <input id="email" class="border-black border-2" type="text" v-model="eMail">
      </div>
      <div class="m-4">
        <h3>role :</h3> 
                <input class="border-black border-2" type="text" v-model="role"> -->
  <!-- <label for="role">Role:</label>
        <select id="role" v-model="role">
          <option value="" disabled selected>select your role.</option>
          <option value="student">Student</option>
          <option value="lecturer">Lecturer</option>
          <option value="admin">Admin</option>
        </select> -->
  <!-- </div> -->
  <!-- <div class="m-4">
        <label for="pw">Password ({{ passwordd.length }}) :</label>
        <input id="pw" class="border-black border-2" type="password" v-model="passwordd">
      </div> -->
  <!-- <div class="m-4">
        <label for="cpw">Confirm Password ({{ passwordC.length }}) :</label>
        <input id="cpw" class="border-black border-2" type="password" v-model="passwordC">
      </div> -->
  <!-- </div> -->
  <!-- button -->
  <!-- <div class="m-auto w-fit bg-lime-400">
      <a href="#submit" class="p-6 m-2"> submit </a>
    </div> -->

  <!-- </div> -->
  <!-- for submit  -->
  <div id="submit" class="overlay">
    <div class="popup2 ">
      <h2 class="mb-5 text-xl font-bold bg-white mx-auto w-fit">Are you sure ?</h2>
      <div class="option flex m-auto w-full mt-10">
        <a @click="submitt" href="#"
          class="w-full text-center p-2 px-2 bg-gray-200 hover:bg-green-500 font-bold hover:text-white">Yes</a>
        <a href="#" class="w-full text-center p-2 px-2 bg-gray-200 hover:bg-rose-500 font-bold hover:text-white">No</a>
      </div>
    </div>
  </div>

  <section class="bg-gray-50 dark:bg-gray-900">
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
        <img class="w-8 h-8 mr-2" src="../assets/icon.png" alt="logo"> Register </a>
      <div
        class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Create and account
          </h1>
          <form class="space-y-4 md:space-y-6" action="#">
            <div>
              <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
              <input type="text" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 
                      sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 
                      dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
                      dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required=""
                v-model="name">
            </div>
            <div>
              <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
              <input type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 
                      sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 
                      dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
                      dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required=""
                v-model="eMail">
            </div>
            <div>
              <label for="role" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Role</label>
              <select id="role" v-model="role">
                <option value="" disabled selected>select your role.</option>
                <option value="student">Student</option>
                <option value="lecturer">Lecturer</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div>
              <label for="password"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
              <input type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border 
                      border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 
                      block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                      dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""
                      v-model="passwordd">
            </div>
            <div>
              <label for="cpw" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm
                password</label>
              <input type="confirm-password" name="confirm-password" id="confirm-password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 
                      focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                      dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" v-model="passwordd"
                >
            </div>
            <!-- <div class="flex items-start">
              <div class="flex items-center h-5">
                <input id="terms" aria-describedby="terms" type="checkbox"
                  class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                  required="">
              </div>
            </div> -->
            <!-- <button type="submit" class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 
              font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 
              dark:focus:ring-primary-800" a href="#submit" @click="submitt">Create an account</button> -->
               <div class="m-auto w-fit bg-lime-400">
      <a href="#submit" class="p-6 m-2"> submit </a>
    </div>
            <p class="text-sm font-light text-gray-500 dark:text-gray-400">
              Already have an account? <a href="#" class="font-medium text-primary-600 hover:underline 
              dark:text-primary-500">Login here</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  </section>
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