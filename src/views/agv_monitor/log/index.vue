<template>
  <div>
    <h1>WebSocket</h1>
    <input v-model="message" placeholder="Type a message" />
    <button @click="sendMessage">Send Message</button>
    <div v-if="serverMessage">
      <h2>Message from Server:</h2>
      <p>{{ serverMessage }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const message = ref('');
const serverMessage = ref('');
let socket;

const connectWebSocket = () => {
  socket = new WebSocket('ws://172.30.241.44:81'); // 替换为你的 WebSocket 服务器地址

  socket.onopen = () => {
    console.log('WebSocket connection opened');
  };

  socket.onmessage = (event) => {
    serverMessage.value = event.data; // 接收服务器消息
    console.log('Message from server:', event.data);
  };

  socket.onclose = () => {
    console.log('WebSocket connection closed');
  };

  socket.onerror = (error) => {
    console.error('WebSocket error:', error);
  };
};

const sendMessage = () => {
  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.send(message.value);
    message.value = ''; // 发送后清空输入框
  } else {
    console.error('WebSocket is not open. Ready state: ', socket.readyState);
  }
};

onMounted(() => {
  connectWebSocket(); // 连接 WebSocket
});

onBeforeUnmount(() => {
  if (socket) {
    socket.close(); // 关闭连接
  }
});
</script>

<style scoped>
/* 添加一些样式 */
h1 {
  font-size: 2em;
}
input {
  margin-right: 10px;
}
</style>