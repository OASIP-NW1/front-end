<script setup>
import { ref ,onBeforeMount} from "vue";
import { useRoute, useRouter } from "vue-router";
const { params } = useRoute();

const userCheck= ref(undefined)
const userList=ref([])
const id = params.id;
const name=ref(undefined)
const eMail=ref(undefined)
const role =ref(undefined)
const created=ref(undefined)
const updated=ref(undefined)
const myRouoter=useRouter()
const goAllUser = () => myRouoter.push({ name: "AllUser" });

const userLink=`${import.meta.env.BASE_URL}api/users`

//GET user
const getUser = async () => {
  const res = await fetch(`${userLink}/${id}`);
  if (res.status === 200) {
    userList.value = await res.json();
    userCheck.value = true;
    if(userList.value.id==id){
      name.value=userList.value.name
      eMail.value=userList.value.email
      role.value=userList.value.role
      created.value=userList.value.createdOn
      updated.value=userList.value.updatedOn
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
const nameEdit=ref('sdfsdf')
const eMailEdit=ref('')
const roleEdit=ref('')
const isEdit=ref(false)
const edit=()=>{
  isEdit.value=true
 nameEdit.value=name.value
 console.log(isEdit.value)
 
}
</script>
 
<template>
    <div
    class=" showUp w-3/5 p-5 pb-7 mx-auto m-10 bg-white rounded-md shadow-xl overflow-auto">
      <h1 class="m-auto w-fit">User Detail </h1>
      <h2 class="m-auto w-fit">User ID: {{id}}</h2>
      <div class="flex w-fit mx-auto">
      <div class=" w-2/5 m-12">
        <img src="../assets/Rick_Rolling.gif" alt="">
      </div>

      <div class="px-2 m-auto w-3/5  border-l-4">
<div class=" w-4/5 p-4 mx-auto">
            <div class="w-full ">
              <!-- name -->
              <div v-if="isEdit==false" class="w-full mx-auto">
                <h3 class="w-fit block  ">Name : </h3>
                <!-- for show name-->
                <h4  class="overflow-x-auto w-full resize-none" disabled>{{userList.name}}</h4>
                <!-- for edit name -->                
                <input type="text"  class=" w-full resize-none" v-model="nameEdit" />
              </div>
                <h3 class="w-fit block ">role :  {{role}}</h3>
              <div>
                <h3 class="w-full ">E-mail : </h3>
                <h4 class="overflow-x-auto">{{userList.email}}</h4> 
              </div> 
            
            <h3 class="w-full ">created on :  {{created}}</h3>
            <h3 class="w-fit ">updated on :  {{updated}}</h3>         
          </div>          
        </div>

        <!-- for button -->
        <div class="flex m-auto mt-7 mb-3 w-fit">
          <a href="#remove" class="m-2 p-2 bg-rose-400 text-white">Remove</a>
          <button @click="edit" class="m-2 p-2 bg-slate-800 text-white">Edit</button>
          <button @click="goAllUser" class="m-2 p-2 bg-slate-800 text-white">Back</button>
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
</template>
 
<style scoped>
/* width */
::-webkit-scrollbar {
  height: 7.5px;
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
  background: #577fbb;
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