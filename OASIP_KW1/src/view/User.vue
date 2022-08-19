<script setup>
import { ref ,onBeforeMount} from "vue";
import { useRoute, useRouter } from "vue-router";
const { params } = useRoute();

const userCheck=ref(undefined)
const userList=ref([])
const id = params.id;

const userLink=`http://localhost:8080/api/users`

//GET user
const getUser = async () => {
  const res = await fetch(userLink);
  if (res.status === 200) {
    userList.value = await res.json();
    userCheck.value = true;
    console.log(userList.value)
  } else {
    userCheck = false;
  }
};
onBeforeMount(async()=>{
    await getUser();
})
</script>
 
<template>
    <div
    class="showUp w-5/6 p-5 pb-7 mx-auto mt-10 bg-white rounded-md shadow-xl overflow-auto">
    testings
{{id}}
    </div>

</template>
 
<style>

</style>