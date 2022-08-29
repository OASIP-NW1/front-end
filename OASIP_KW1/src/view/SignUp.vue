<script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router';
  import { onBeforeMount } from 'vue';
  const name = ref('')
  const eMail = ref('')
  const role = ref('')
  const nameL = 100
  const eMailL = 50
  const userList = ref([])
  const passwordd = ref('')
  const passwordC = ref('')
  const pwMaxL= 14
  const pwMinL = 8
  //router
  const myRouter = useRouter();
  const goHome = () =>
    myRouter.push({
      name: "Home"
    });
  
  const db = "http://localhost:5000/user"
  const userLink = `${import.meta.env.BASE_URL}api/users`
  //GET user
  const userCheck = ref(undefined)
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
  onBeforeMount(async () => {
    await getUser();
  })
  // validate
  const checkNameN = ref(undefined)
  const checkEMailN = ref(undefined)
  const checkNameL = ref(undefined)
  const checkEMailL = ref(undefined)
  const checkEmailF = ref(undefined)
  const checkPasswordN = ref(undefined)
  const checkPasswordL = ref(undefined)
  const noMatchP =ref(undefined)
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
  const submitt = () => {
    // console.log(name.value)
    // console.log(eMail.value)
    // console.log(role.value)
    noMatchP.value = undefined
    isUniqueName.value = undefined
    isUniqueEmail.value = undefined
    isUniqueNameAndRole.value = undefined
    checkUniqueName()
    checkUniqueEmail()
    checkUniqueNameAndRole()
    // check name is null?
    if (name.value.trim() == '') {
      checkNameN.value = false
      console.log("name is null")
    } else checkNameN.value = true
  
    // check e-mail is null?    
    if (eMail.value.trim() == '') {
      checkEMailN.value = false
      console.log("email is null")
    } else checkEMailN.value = true

    // check password null
    if (passwordC.value.length == 0 || passwordd.value.length == 0) {
      checkPasswordN.value = false
      console.log("password is null")
    } else checkPasswordN.value = true; console.log(checkPasswordN.value)
  
    //check name length
    if (name.value.length > nameL) {
      console.log("name over 100")
      checkNameL.value = false
    } else checkNameL.value = true //;console.log('checkName Length',checkNameL.value)

    //check e-mail length
    if (eMail.value.length > eMailL) {
      console.log("email over 50")
      checkEMailL.value = false
    } else checkEMailL.value = true //;console.log('checkEMail Length',checkEMailL.value)

    // check e-mail form
    if (valFormEmail(eMail.value) == false) {
      console.log("email invalid form")
      checkEmailF.value = false
    } else checkEmailF.value = true

    // check password is length ?
    if (passwordd.value.length > pwMaxL || passwordd.value.length < pwMinL) {
      checkPasswordL.value = false
      console.log("The characters should be at least 8-14 characters. ")
    } else checkPasswordL.value = true

    // check unique
    if (isUniqueName.value == true) {
      console.log("name is ununique 😏")
    } else
      if (isUniqueEmail.value == true) {
        console.log("email is ununique 😏")
      } else
        if (isUniqueNameAndRole.value == true) {
          console.log("role and name is ununique")
        } else
          if (passwordC.value !== passwordd.value) {
            console.log("Passwords do not match.")
            noMatchP.value=true
          } else
            // last check
            if (checkEMailN.value == true && checkNameN.value == true && checkEMailL.value == true && checkNameL.value == true && checkEmailF.value == true && isUniqueName.value !== true && isUniqueEmail.value !== true && isUniqueNameAndRole.value !== true && checkPasswordL.value == true && checkPasswordN.value == true && noMatchP.value!==true) {
              console.log("status good")
              addNewUser()
            }
  }
  //add new user
  const addNewUser = async () => {
    const res = await fetch(userLink, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        name: name.value.trim(),
        email: eMail.value.trim(),
        role: role.value == '' ? null : role.value.trim(),
        password: passwordd.value.trim()
  
      })
    }); if (res.status == 201) {
      console.log("add new user")
      checkNameN.value = undefined
      checkEMailN.value = undefined
      name.value = ''
      eMail.value = ''
      role.value = ''
      passwordC.value=''
      passwordd.value=''
      goHome()
    } else {
      console.log("can not add new user pls try again")
  
    }
  }
  // functoin for check unique
  const isUniqueName = ref(undefined)
  const isUniqueEmail = ref(undefined)
  const isUniqueNameAndRole = ref(undefined)
  const checkUniqueName = () => {
    for (let check of userList.value) {
      if (check.name == name.value) {
        console.log(`Name :${check.name}`)
        isUniqueName.value = true
      }
    }
  }
  const checkUniqueEmail = () => {
    for (let check of userList.value) {
      if (check.email == eMail.value) {
        console.log(`E-mail :${check.email}`)
        isUniqueEmail.value = true
      }
    }
  }
  const checkUniqueNameAndRole = () => {
    for (let check of userList.value) {
      if (check.role == role.value && check.name == name.value) {
        console.log(`Role :${check.role} Name : ${check.name}`)
        isUniqueNameAndRole.value = true
      }
    }
  }
  </script>
   
  <template>      
        <div class="w-fit mx-auto 2xl:w-3/4 xl:w9/12 flex">
          <!-- Col -->
          <!-- <div class="w-500 h-auto bg-gray-400 hidden  lg:block 2xl:w-1/2 bg-cover rounded-l-lg"
            style="background-image: url('https://source.unsplash.com/K4mSJ7kc0As/600x800')"></div> -->
          <!-- Col -->
          <div class="w-fit  mx-auto lg:w-1/2 bg-white p-5 rounded">
            <h3 class="pt-2 text-2xl font-semibold text-gray-600 text-center">Register</h3>
            <form class="px-8 pt-4 pb-4 mb-1 bg-white rounded">
              <div class="mt-1">
                <label for="name" class="inline-block mr-1.5 mb-2 text-sm font-bold text-gray-500"> Username </label> 
                <span class="text-xs"> {{name.length}}/{{nameL}} character</span>
                <input type="text" id="name" class="bg-gray-500 border border-gray-300 text-gray-900 
                        sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 
                        dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
                        dark:focus:ring-blue-500 dark:focus:border-blue-500"  required=""
                  v-model="name">
              </div>
              <div class="mt-1">
                <label for="email" class="inline-block mr-1.5 mb-2 text-sm font-bold text-gray-500">Your email</label>
                <span class="text-xs">{{eMail.length}}/{{eMailL}} character</span>
                <input type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 
                        sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 
                        dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
                        dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="oasip@sit.kmutt.ac.th"
                  required="" v-model="eMail">
              </div>
              <div class="mt-1">
                <label for="role" class="block mb-2 text-sm font-bold text-gray-500">Role</label>
                <select id="role" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 
              focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
              dark:focus:ring-blue-500 dark:focus:border-blue-500" v-model="role">
                  <option class="text-gray-500" value="" disabled selected>select your role ( student )</option>
                  <option class="bg-rose-500" value="student">Student</option>
                  <option value="lecturer">Lecturer</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div class="mt-1">
                <label for="pw" class="inline-block mr-1.5 mb-2 text-sm font-bold text-gray-500">Password</label>
                <span class="text-xs">{{passwordd.length}}/{{pwMaxL}} character</span>
                <span v-if="passwordd.length>14 || passwordd.length<8" class="text-rose-400 ml-1 text-xs">* The characters should be at least 8-14 characters. *</span>
                <input type="password" name="password" id="pw"  class="bg-gray-50 border 
                        border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 
                        block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                        dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""
                  v-model="passwordd">
              </div>
              <div class="mt-1">
                <label for="cpw" class="inline-block mb-2 text-sm font-bold text-gray-500 ">Confirm password</label> 
                <span v-if="noMatchP==true" class="text-xs text-rose-400">* password not match *</span>
                <span></span>
                <input type="password" name="confirm-password" id="cpw"  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 
                        focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                        dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""
                  v-model="passwordC">
              </div>
                <a href="#submit" >
                  <div class="mt-4 w-full px-4 py-2 font-bold text-center text-white bg-rose-400 rounded-full hover:bg-rose-500 focus:outline-none focus:shadow-outline">
                   Sign In 
                 </div>
                </a>
              
              <!-- <div class="text-center">
                <a class="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800" href="./register.html">Create an Account!</a>
              </div>
              <div class="text-center">
                <a class="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800" href="./forgot-password.html">Forgot Password?</a>
              </div> -->
            </form>
          </div>
        </div>

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

    <!-- const checkNameN = ref(undefined)
  const checkEMailN = ref(undefined)
  const checkNameL = ref(undefined)
  const checkEMailL = ref(undefined)
  const checkEmailF = ref(undefined)
  const checkPasswordN = ref(undefined)
  const checkPasswordL = ref(undefined)
  const noMatchP =ref(undefined) -->
    <div class="alert-area">
      <div v-if="true== true" class="alert warning text-sm">
          <span class="closebtn" @click="checkEMailN = false">x</span>
          <strong class="block">Warning!</strong> Please enter your email.
        </div>
    </div>


  </template>
   
  <style scoped>
  .container{
    margin-top: -4em;
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
  background-color: gray;
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