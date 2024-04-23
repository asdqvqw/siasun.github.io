<template>
    <div class="page-container main-view">
      <div class="table-box content-container page-content-box">
  aaaa:
        {{ responseData }}
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import  {timer_from} from '@/timer.js'

  
  import axios from 'axios'
  const responseData = ref(null)

  const fetchVelocity1 = () => {
    let userList = {
      group: 'siasun',
      account: 'test',
      password: '123456'
    }
    axios({
      method: 'post',
      url: '/api/data/cout',
      data: JSON.stringify(userList)
    })
      .then((res) => {
        responseData.value = res.data 
        jsondata.value.item =  responseData.value;

      })
      .catch((error) => {
  
      })
      .finally(() => {
  
      })
  
      timer_from.value = setTimeout(fetchVelocity1, 400);
  }
  
  onMounted(() => {
    fetchVelocity1()
  })
  
  </script>

  
