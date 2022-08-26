<script setup>
import { ref ,onBeforeMount} from "vue";
import { useRoute, useRouter } from "vue-router";
const { params } = useRoute();
const userCheck= ref(undefined)
const userList=ref([])
const user =ref([])
const id = params.id;
const name=ref(undefined)
const eMail=ref(undefined)
const role =ref(undefined)
const created=ref(undefined)
const updated=ref(undefined)
const myRouoter=useRouter()
const nameL=100
const eMailL=50
const goAllUser = () => myRouoter.push({ name: "AllUser" });
const userLink=`${import.meta.env.BASE_URL}api/users`
//GET user
const getUser = async () => {
  const res = await fetch(`${userLink}/${id}`);
  if (res.status === 200) {
    user.value = await res.json();
    userCheck.value = true;
    if(user.value.id==id){
      name.value=user.value.name
      eMail.value=user.value.email
      role.value=user.value.role
      created.value=user.value.createdOn
      updated.value=user.value.updatedOn
    }
    //console.log(userList.value)
  } else {
    userCheck.value = false;
  }
};
onBeforeMount(async()=>{
    await getUser();
    
})
//remove information
const removeInfo = async () => {
  const res = await fetch(`${userLink}/${id}`,
   { method: "DELETE" });
  if (res.status === 200) {
    console.log("delete successfully");
    goAllUser();
  } else console.log("error");
};
// edit
const nameEdit=ref('')
const eMailEdit=ref('')
const roleEdit=ref('')
const isEdit=ref(false)
const editMode=()=>{
  isEdit.value=true
 nameEdit.value=name.value
 eMailEdit.value=eMail.value
 roleEdit.value=role.value
 console.log(isEdit.value)
 
}
// validate
const checkNameN=ref(undefined)
const checkEMailN=ref(undefined)
const checkNameL=ref(undefined)
const checkEMailL=ref(undefined)
const checkEmailF =ref(undefined)
const isSame =ref(undefined)


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
const updateSuccess=ref(false)
const submitt=()=>{
    isUniqueName.value=undefined
    isUniqueEmail.value=undefined
    isUniqueNameAndRole.value=undefined
    checkNameN.value=undefined
    checkNameL.value=undefined
    checkEmailF.value=undefined
    checkEMailN.value=undefined
    checkEMailL.value=undefined
    isSame.value=undefined
    checkUniqueName()
    checkUniqueEmail()
    checkUniqueNameAndRole()
 // check name is null?
    if(nameEdit.value==''){
        checkNameN.value=false
        console.log("pls input your name")
    }else checkNameN.value=true 
 
    // check e-mail is null?    
    if(eMailEdit.value==''){
        checkEMailN.value=false
        console.log("pls input your email")
    }else checkEMailN.value=true
    //check name length
    if(nameEdit.value.length>nameL){
      console.log("name over 100")
      checkNameL.value=false
    }else checkNameL.value=true //;console.log('checkName Length',checkNameL.value)
    //check e-mail length
    if(eMailEdit.value.length>eMailL){
      console.log("email over 50")
      checkEMailL.value=false
    }else checkEMailL.value=true //;console.log('checkEMail Length',checkEMailL.value)
    // check e-mail form
    if(valFormEmail(eMailEdit.value)==false){
      console.log("email invalid form")
      checkEmailF.value=false
    }else checkEmailF.value=true
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
    if(name.value==nameEdit.value&&eMail.value==eMailEdit.value&&role.value==roleEdit.value){
      isSame.value=true
        console.log("information no change")
    }else
    // last check
    if(checkEMailN.value==true && checkNameN.value==true &&checkEMailL.value==true &&checkNameL.value==true&&checkEmailF.value==true&&isUniqueName.value!==true&&isUniqueEmail.value!==true&&isUniqueNameAndRole.value!==true){
        console.log("status good")
        updateUser()
    } 
}
//update user
const statusNoSend=ref(false)
const updateUser=async ()=>{
  statusNoSend.value=undefined
 const  res = await fetch(`${userLink}/${id}`, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      name: nameEdit.value.trim(),
      email: eMailEdit.value.trim(),
      role: roleEdit.value==''?null:roleEdit.value,
    })
  }); 
    if( res.status==200){
        updateSuccess.value=true
        console.log("updated user")
        isUniqueName.value=undefined
        isUniqueEmail.value=undefined
        isUniqueNameAndRole.value=undefined
        checkNameN.value=undefined
        checkNameL.value=undefined
        checkEmailF.value=undefined
        checkEMailN.value=undefined
        checkEMailL.value=undefined
        isSame.value=undefined
        getUser()
        isEdit.value=false
        setTimeout(()=>(updateSuccess.value=false),5000)        

 }else{
        statusNoSend.value=true
        console.log("can not add new user pls try again")
        
    }
}
// functoin for check unique
const isUniqueName =ref(undefined)
const isUniqueEmail =ref(undefined)
const isUniqueNameAndRole =ref(undefined)
const checkUniqueName =()=>{
  for(let check of userList.value){
    if(check.name==nameEdit.value){
      console.log(`Name :${check.name}`)
      isUniqueName.value=true
    }
  }
}
const checkUniqueEmail =()=>{
  for(let check of userList.value){
    if(check.email==eMailEdit.value){
      console.log(`E-mail :${check.email}`)
      isUniqueEmail.value=true
    }
  }
}
const checkUniqueNameAndRole =()=>{
  for(let check of userList.value){
    if(check.role==roleEdit.value &&check.name==nameEdit.value){
      console.log(`Role :${check.role} Name : ${check.name}`)
      isUniqueNameAndRole.value=true
    }
  }
}

const cancelEdit=()=>{
    isUniqueName.value=undefined
    isUniqueEmail.value=undefined
    isUniqueNameAndRole.value=undefined
    checkNameN.value=undefined
    checkNameL.value=undefined
    checkEmailF.value=undefined
    checkEMailN.value=undefined
    checkEMailL.value=undefined
    isSame.value=undefined
    isEdit.value=false
}
</script>
 
<template>
    <div
    class=" showUp w-3/5 p-5 pb-7 mx-auto m-10 bg-white rounded-md shadow-xl ">
      <div class="border-4 border-double">
      <h1 class="font-semibold  text-lg m-auto w-fit font-sans text-slate-600">User Detail </h1>
      <h2 class="text-slate-700 font-medium m-auto w-fit">User ID: {{id}}</h2>
      <div class=" w-full mx-auto">
      <!-- <div class=" w-2/5 m-12">
        <img src="../assets/Rick_Rolling.gif" alt="">
      </div> -->
      <div class="px-2 m-auto w-4/5  ">
    <div class=" w-full p-4 mx-auto">
            <div class="w-5/6 ml-12  pt-3">
              <!-- name -->
              <div  class="block w-full  pt-2">
                <div class="w-5/6 ml-12">
                <h3 class="w-fit inline font-semibold text-gray-400 pr-2">Name : </h3>
                <span v-if="isEdit==true" class="inline-block text-sm text-gray-300" :style="[nameEdit.length>nameL?'color: red;':'']">{{nameEdit.length }}/{{nameL}} charector</span>                  
                </div>

                <!-- for show name-->
                  <h4 v-if="isEdit==false" class="showUp rounded border-gray-300 border-2 ml-11 w-5/6  px-2  overflow-x-scroll " disabled>{{user.name}}</h4>                  
                <!-- for edit name -->      
                <input v-if="isEdit==true" type="text" :style="[isSame==true || isUniqueName==true||checkNameL==false ||checkNameN==false ? 'border-style:solid;border-color:red' : '']"  class="ml-11 showUp w-5/6 rounded border-fuchsia-500 border-2 border-solid  px-2" v-model="nameEdit" />
              </div>



              <!-- e-mail -->
              <div class="block w-full  pt-3">
                <div class="w-5/6 ml-12">
                <h3 class="w-fit inline text-gray-400  font-semibold pr-2">E-mail : </h3>    
                <span v-if="isEdit==true" class="inline-block text-sm text-gray-300 " :style="[eMailEdit.length>eMailL?'color: red;':'']">{{eMailEdit.length}}/{{eMailL}} charector</span>              
                </div>

                <!-- for show email -->
                <h4 v-if="isEdit==false" class="showUp rounded border-gray-300 border-2 ml-11 overflow-x-auto w-5/6 px-2 ">{{user.email}}</h4>
                <input v-if="isEdit==true" :style="[isSame==true||isUniqueEmail==true||checkEMailL==false||checkEMailN==false||checkEmailF==false ? 'border-style:solid;border-color:red':'']" type="text"  class="ml-11 showUp rounded border-fuchsia-500 border-2 border-solid w-5/6 px-1" v-model="eMailEdit" />
 
              </div> 
              <!-- role -->
              <div class="block w-full ml-11 pt-3">
                  <div class=" inline-block">
                  <label class="inline w-fit text-gray-400  font-semibold pr-2" for="role">Role : </label>
                 <h4 v-if="isEdit==false" class="showUp w-fit rounded border-gray-300 border-2 px-2 inline-block">{{role}}</h4>                  
                  </div>
 
                 <!-- <input v-if="isEdit==true" type="text" class="border-cyan-400 border-3 border-solid w-4/5" v-model="roleEdit" /> -->
                 <select v-if="isEdit==true" :style="[isSame==true||isUniqueNameAndRole==true ? 'border-style:solid;border-color:red':'']" class=" showUp px-2 border-fuchsia-500 border-2 border-solid rounded w-28" id="role" v-model="roleEdit">
                   <option value="" disabled >select your role.</option>
                   <option  value="student">student</option>
                   <option  value="lecturer">lecturer</option>
                   <option  value="admin">admin</option>
                 </select>                     
              </div>
              <!-- created -->
            <div class="pt-3 flex ml-11 w-fit">
              <h3 class="w-fit font-semibold text-gray-400 inline">created on :  </h3>
              <h4 class="w-fit px-2 text-gray-600">{{created}}</h4>
            </div>
              <!-- update on -->
            <div class="pt-3 flex ml-11 w-fit">
            <h3 class="w-fit font-semibold text-gray-400 inline">updated on :  </h3>
            <h4 class="w-fit px-2 text-gray-600">{{updated}}</h4>                 
            </div>        
          </div>          
        </div>
        <!-- for no edit button -->
        <div v-if="isEdit==false" class="showUp flex m-auto mt-7 mb-3 w-fit">
          <a href="#remove" class="m-2 p-2 custom-btn remove">Remove</a>
          <button @click="editMode" class="custom-btn edit m-2 p-2 ">Edit</button>
          <button @click="goAllUser" class="custom-btn back m-2 p-2 ">Back</button>
        </div>
        <!-- for edit button -->
        <div v-if="isEdit==true" class="showUp flex m-auto mt-7 mb-3 w-fit">
          <button @click="cancelEdit" class="custom-btn remove m-2  ">cancel</button>
          <a href="#submit" class="custom-btn edit m-2  ">Submit</a>
        </div>
      </div>
      </div>
    </div>
    <!-- for remove  -->
  <div id="remove" class="overlay">
    <div class="popup2 h-96">
      <h2 class="mb-5 text-xl font-bold bg-white mx-auto w-fit">
        Are you sure(remove) ?
      </h2>
      <div class="option flex m-auto w-full mt-10">
        <a
          @click="removeInfo"
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
  </div>

      <!-- alert  -->
      <div  class="alert-area">
        <div v-if="updateSuccess == true" class="alert success text-sm">
          <span class="closebtn" @click="updateSuccess = false">x</span>
          <strong class="block">Success!</strong> Update user success.
        </div>
        <div v-if="statusNoSend == true" class="alert warning text-sm">
          <span class="closebtn" @click="statusNoSend = false">x</span>
          <strong class="block">Warning !</strong> Unable to update, please try again later.
        </div>
        <div v-if="isUniqueName == true" class="alert warning text-sm">
          <span class="closebtn" @click="isUniqueName = false">x</span>
          <strong class="block">Warning !</strong> This name is used.
        </div>
        <div v-if="isUniqueEmail == true" class="alert warning text-sm">
          <span class="closebtn" @click="isUniqueEmail = false">x</span>
          <strong class="block">Warning !</strong> This e-mail is used.
        </div>
        <div v-if="isUniqueNameAndRole == true" class="alert warning text-sm">
          <span class="closebtn" @click="isUniqueNameAndRole = false">x</span>
          <strong class="block">Warning !</strong> This name and role is used.
        </div> 
        <div v-if="checkNameN == false" class="alert warning text-sm">
          <span class="closebtn" @click="checkNameN = undefined">x</span>
          <strong class="block">Warning !</strong> Please enter your name.
        </div>
        <div v-if="checkNameL == false" class="alert warning text-sm">
          <span class="closebtn" @click="checkNameL = undefined">x</span>
          <strong class="block">Warning !</strong> The name contains more than {{nameL}} characters.
        </div>
        <div v-if="checkEmailF == false" class="alert warning text-sm">
          <span class="closebtn" @click="checkEmailF = undefined">x</span>
          <strong class="block">Warning !</strong> The e-mail format is incorrect.
        </div>
        <div v-if="checkEMailN == false" class="alert warning text-sm">
          <span class="closebtn" @click="checkEMailN = undefined">x</span>
          <strong class="block">Warning !</strong> Please enter your e-mail.
        </div>                                                           
        <div v-if="checkEMailL == false" class="alert warning text-sm">
          <span class="closebtn" @click="checkEMailL = undefined">x</span>
          <strong class="block">Warning !</strong> The e-mail contains more than {{eMailL}} characters.
        </div>
        <div v-if="isSame == true" class="alert warning text-sm">
          <span class="closebtn" @click="isSame = undefined">x</span>
          <strong class="block">Warning !</strong> The information has not changed.
        </div>                                                            
      </div>
     
    
</template>
 
<style scoped>
.custom-btn {
  width: 100px;
  height: 40px;
  padding: 10px 25px;
  font-family: "Lato", sans-serif;
  font-weight: 500;
  background: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  display: inline-block;
  text-align: center;
}
/* back*/
.back {
  background: rgb(115, 115, 115);
  color: #fff;
  line-height: 42px;
  padding: 0;
  border: none;
}
.back:hover {
  background: transparent;
  color: #000;
  box-shadow: -7px -7px 20px 0px #fff9, -4px -4px 5px 0px #fff9,
    7px 7px 20px 0px #0002, 4px 4px 5px 0px #0001;
}
.back:before,
.back:after {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  height: 2px;
  width: 0;
  background: #000;
  transition: 400ms ease all;
}
.back:after {
  right: inherit;
  top: inherit;
  left: 0;
  bottom: 0;
}
.back:hover:before,
.back:hover:after {
  width: 100%;
  transition: 800ms ease all;
}
/* edit */
.edit {
  background: rgb(166, 166, 166);
  color: #fff;
  line-height: 42px;
  padding: 0;
  border: none;
}
.edit:hover {
  background: rgb(252, 140, 252);
  color: #000;
  box-shadow: -7px -7px 20px 0px #fff9, -4px -4px 5px 0px #fff9,
    7px 7px 20px 0px #0002, 4px 4px 5px 0px #0001;
}
.edit:before,
.edit:after {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  height: 2px;
  width: 0;
  background: #000;
  transition: 400ms ease all;
}
.edit:after {
  right: inherit;
  top: inherit;
  left: 0;
  bottom: 0;
}
.edit:hover:before,
.edit:hover:after {
  width: 100%;
  transition: 800ms ease all;
}
.eidt-color {
  border-color: rgb(252, 140, 252);
}
/* remove */
.remove {
  background: rgb(255, 172, 172);
  color: #fff;
  line-height: 42px;
  padding: 0;
  border: none;
}
.remove:hover {
  background: rgb(166, 166, 166);
  color: #000;
  box-shadow: -7px -7px 20px 0px #fff9, -4px -4px 5px 0px #fff9,
    7px 7px 20px 0px #0002, 4px 4px 5px 0px #0001;
}
.remove:before,
.remove:after {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  height: 2px;
  width: 0;
  background: #000;
  transition: 400ms ease all;
}
.remove:after {
  right: inherit;
  top: inherit;
  left: 0;
  bottom: 0;
}
.remove:hover:before,
.remove:hover:after {
  width: 100%;
  transition: 800ms ease all;
}
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
/* width */
::-webkit-scrollbar {
  height: 5.5px;
  width: 9px;
}
/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px transparent;
  border-radius: 10px;
}
/* Handle */
::-webkit-scrollbar-thumb {
  background: rgb(109, 109, 112);
  border-radius: 10px;
}
/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #ef61e3;
}
/* remove */
.remove {
  background: rgb(166, 166, 166);
  color: #fff;
  line-height: 42px;
  padding: 0;
  border: none;
}
.remove:hover {
  background: rgb(255, 172, 172);
  color: #000;
  box-shadow: -7px -7px 20px 0px #fff9, -4px -4px 5px 0px #fff9,
    7px 7px 20px 0px #0002, 4px 4px 5px 0px #0001;
}
.remove:before,
.remove:after {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  height: 2px;
  width: 0;
  background: #000;
  transition: 400ms ease all;
}
.remove:after {
  right: inherit;
  top: inherit;
  left: 0;
  bottom: 0;
}
.remove:hover:before,
.remove:hover:after {
  width: 100%;
  transition: 800ms ease all;
}




.showUp {
  position: relative;
  animation: wii 1s;
  animation-timing-function: ease-in-out;
}

/* alert */
.alert-area {
  position: fixed;
  top: 150px;
  right: 0;
  background-color: transparent;
  width: 18%;
  margin-right: 10px;
}

.alert {
  position: relative;
  width: 100%;
  padding-top: 15px;
  padding-left: 15px;
  padding-right: 15px;
  padding-bottom: 10px;
  animation: moveLeft 0.9s;
  animation-timing-function: ease-in-out;
  background-color: #f44336;
  color: white;
  opacity: 1;
  transition: opacity 0.6s;
  margin-bottom: 15px;
}

.alert.success {
  background-color: #d547e4;
}

.alert.info {
  background-color: #2196f3;
}

.alert.warning {
  background-color: #ff9800;
}

.closebtn {
  margin-left: 15px;
  color: white;
  font-weight: bold;
  float: right;
  font-size: 22px;
  line-height: 20px;
  cursor: pointer;
  transition: 0.3s;
}

.closebtn:hover {
  color: black;
}

/* animation */
@keyframes moveLeft {
  0% {
    right: -300px;
    top: 0px;
    opacity: 0;
  }

  100% {
    right: 0px;
    top: 0px;
    opacity: 1.5;
  }
}

</style>