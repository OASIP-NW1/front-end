<script setup>
import {onBeforeMount, ref} from 'vue';
import { useRouter } from "vue-router";
const userList=ref([])
const userCheck=ref(undefined)
<<<<<<< Updated upstream
const userLink=`${import.meta.env.BASE_URL}api/users`
=======
const userLink=`http://localhost:8080/api/users`
const db="http://localhost:5000/user"
>>>>>>> Stashed changes

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
</script>
 
<template>
    <!-- for show no user -->
  <div v-if="userList.length == 0" class="w-64 h-28 p-5  mx-auto mt-10 bg-white rounded-md shadow-xl" >
      <h4 class="text-center w-fit m-auto ">No User</h4> 
  </div>

    <!-- for show user -->
  <div v-else
    class="showUp w-5/6 p-5 pb-7 mx-auto mt-10 bg-white rounded-md shadow-xl overflow-auto">
    <div
      
      class="drop-shadow-2xl bg-white overflow-y-auto mx-auto h-fit"
      style="height: 440px; width: 100%"
    >
      <table class="table-fixed m-auto md:table-flexed w-full">
        <thead
          class="sticky top-0 text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
        >
          <tr>
            <th scope="col" class="px-6 py-3">Name</th>
            <th scope="col" class="px-3 py-3">Email</th>
            <th scope="col" class="px-6 py-3">Role</th>
            <!-- <th scope="col" class="px-6 py-3">CreateOn</th>
            <th scope="col" class="px-6 py-3">UpdateOn</th> -->
            <th scope="col" class="px-6 py-3">more detail</th>

          </tr>
        </thead>
        <tbody>
          <tr
            v-for="User in userList"
            :key="User.id"
            class="text-center border-y border-t-0 dark:border-gray-700"
          >
            <th
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 font-semibold whitespace-nowrap text-ellipsis overflow-hidden"
            >
              {{ User.name }}
            </th>
            <td class="px-1 py-4 text-ellipsis overflow-hidden ">
              <div class="  block m-auto">
                {{User.email}}
              </div>
            </td>
            <td class="px-6 py-4">
                {{User.role}}
            </td>
            <!-- <td class="px-6 py-4 text-ellipsis overflow-hidden">
              {{ User.createdOn }}
            </td>
            <td class="px-14 py-4">
                {{User.updatedOn}}
            </td> -->
            <td class="px-14 py-4">
              <button
                @click="goUser(User)"
                class="text-black hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
              >
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

</style>