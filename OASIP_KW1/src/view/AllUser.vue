<script setup>
import { onBeforeMount, onMounted, ref } from 'vue';
import { useRouter } from "vue-router";
import BaseLoading from "../components/BaseLoading.vue"


const userList = ref([])
const userCheck = ref(undefined)

const userLink = `${import.meta.env.BASE_URL}api/users`
const refreshTLink =`${import.meta.env.BASE_URL}api/refresh`
//const db="http://localhost:5000/user"
const token =ref(undefined)


//router
const myRouter = useRouter();
const goUser = (input) =>
  myRouter.push({
    name: "User",
    params: {
      id: input.id,
    },
  });


//GET user
const getAllUser = async () => {
  const auther=ref(localStorage.getItem('tokenA'))
  const refreshT=ref(localStorage.getItem('tokenR'))
  const res = await fetch(userLink,{
    method:'GET',
    headers:{
      "Authorization":`Bearer ${auther.value}`
    }
  });
   if (res.status === 200) {
    userList.value = await res.json();
    userCheck.value = true;
    console.log('get user successful')
  }else
  if(res.status === 401){
    const ress= await fetch(refreshTLink,{
      method:'GET',
      headers:{
        "Authorization":`Bearer ${refreshT.value}`
      }
    });

    if(ress.status === 200){
      token.value =await ress.json()
      saveLocal()
      console.log('refresh token successful')
      getAllUser()
    }else console.log('something waring to get token')


  } else {
    userCheck.value = false;
    console.log('can not to get user')
  }
};
onBeforeMount( () => {
   getAllUser();
})
onMounted(()=>{
  console.log(userCheck.value)
})

console.log(userCheck.value)

// local storage
const saveLocal=()=>{
  localStorage.setItem('tokenA',`${token.value.accessToken}`)
  localStorage.setItem('tokenR',`${token.value.refreshToken}`)
}
</script>
 
<template>
  <!-- for loading -->
  <div v-if="userCheck==undefined" class="  p-5  mx-auto mt-40  ">
    <BaseLoading :heightt="100" :widthh="100" :thick="15" />
    
  </div>
  <!-- for show no user -->
  <div v-else-if="userCheck==false" class="w-64 h-28 p-5  mx-auto mt-10 bg-white rounded-md shadow-xl">
    <h4 class="text-center w-fit m-auto ">No User</h4>
  </div>

  <!-- for show user -->
  <div v-else-if="userCheck==true" class="showUp  p-5 pt-10 pb-7 mx-auto  bg-white  overflow-auto">
    <!-- this for filter -->
    <div class="mx-auto  bg-gray-400">
      for filter
      --
      --
    </div>
    <div class="drop-shadow-2xl bg-white overflow-y-auto mx-auto h-fit" style="height: 440px; width: 100%">
      <table class="table-fixed m-auto md:table-flexed w-full">
        <thead class="sticky top-0 text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="px-6 py-3">Name</th>
            <th scope="col" class="px-3 py-3">Email</th>
            <th scope="col" class="px-6 py-3">Role</th>
            <th scope="col" class="px-6 py-3">more detail</th>

          </tr>
        </thead>
        <tbody>
          <tr v-for="User in userList" :key="User.id" class="text-center border-y border-t-0 dark:border-gray-700">
            <th scope="row"
              class="px-6 py-4 font-medium text-gray-900 font-semibold whitespace-nowrap text-ellipsis overflow-hidden">
              {{ User.name }}
            </th>
            <td class="px-1 py-4 text-ellipsis overflow-hidden ">
              <div class="  block m-auto">
                {{ User.email }}
              </div>
            </td>
            <td class="px-6 py-4">
              {{ User.role }}
            </td>
            <!-- <td class="px-6 py-4 text-ellipsis overflow-hidden">
              {{ User.createdOn }}
            </td>
            <td class="px-14 py-4">
                {{User.updatedOn}}
            </td> -->
            <td class="px-14 py-4">
              <button @click="goUser(User)"
                class="text-black hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800">
                Detail
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

  </div>
</template>
 
<style>
.showUp {
  position: relative;
  animation: wii 1s;
  animation-timing-function: ease-in-out;
}

/* animatio* */
@keyframes wii {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1.5;
  }
}
</style>