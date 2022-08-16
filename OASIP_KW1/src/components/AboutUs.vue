<script setup>
import AntDesignGithubOutlined from './icons/AntDesignGithubOutlined.vue';

</script>
 
<template>
<!-- <div id="grad1"> -->
  <p class="title">OUR EXCUTIVE TEAMS</p>
  <table style="width:100%" id="group">
  <tr>
    <th><img src="../assets/dear.png" class="card-img-top" alt="..."></th>
    <th><img src="../assets/game.png" class="card-img-top" alt="..."></th>
    <th><img src="../assets/opal.png" class="card-img-top" alt="..."></th>
  </tr>
  <tr>
    <td class="name">Naphatsawan Butwat</td>
    <td class="name">Pichaya Pairin</td>
    <td class="name">Wareewan Pongpunchaikul</td>
  </tr>
  <tr>
    <td class="id">63130500064</td>
    <td class="id">63130500086</td>
    <td class="id">63130500105</td>
  </tr>
    <tr>
    <td class="git"><a href="https://github.com/NAPHATSAWAN-DEAR"><AntDesignGithubOutlined/></a></td>
    <td class="git"><a href="https://github.com/gpicha3"><AntDesignGithubOutlined/></a></td>
    <td class="git"><a href="https://github.com/wareewan-opal"><AntDesignGithubOutlined/></a></td>
  </tr>
</table>
  <!-- </div> -->
  <!-- </div> -->
</template>
 
<style>
#group{
  margin-top: -5.5em;
}
.name , .id , .git{
  text-align: center;
  font-family: 'Mali', cursive;
  font-size: 1.25em;
 /* padding-top: 1em; */
}
.title{
    font-family: 'Mali', cursive;
    font-weight: bolder;
    text-align: center;
    font-size: 2.5em;
    margin-top: -16em;
    margin-left: 0.5em;
}
.col{
    margin-left: 2em;
    margin-left: -0.5px;
    padding-right: -1px;
    padding-left: -1px;
    padding-left: 2em;
}

</style>