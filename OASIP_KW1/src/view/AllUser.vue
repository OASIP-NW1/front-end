<script setup>
import {onBeforeMount, ref} from 'vue';
const userList=ref([])
const userCheck=ref(undefined)
const userLink=`http://localhost:8080/api/users`

//GET user
const getCategory = async () => {
  const res = await fetch(userLink);
  if (res.status === 200) {
    userList.value = await res.json();
    userCheck.value = true;
    console.log(userList.value)
  } else {
    categoryCheck = false;
  }
};
onBeforeMount(async()=>{
    await getCategory();
})
</script>
 
<template>

  <div
    class="showUp w-5/6 p-5 pb-7 mx-auto mt-10 bg-white rounded-md shadow-xl overflow-auto">
    <div
      v-if="userList.length !== 0"
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
            <th scope="col" class="px-6 py-3">CreateOn</th>
            <th scope="col" class="px-6 py-3">UpdateOn</th>
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
            <td class="px-1 py-4">
              <div class="block m-auto">
                {{User.email}}
              </div>
            </td>
            <td class="px-6 py-4">
                {{User.role}}
            </td>
            <td class="px-6 py-4 text-ellipsis overflow-hidden">
              {{ User.createdOn }}
            </td>
            <td class="px-14 py-4">
                {{User.updatedOn}}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  
  </div>
</template>
 
<style>

</style>