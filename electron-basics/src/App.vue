<script setup lang="ts">
import { ref } from 'vue';


const image = ref()

async function send() {
  const response = await window.ipcRenderer.invoke('send-event', 'hahahaha')
  alert(response)
}
async function copy() {
  window.api.copy()
}
async function show() {
  window.api.show()
}
async function capture() {
  const response = await window.api.capture()
  image.value = response
}
function logNativeImage() {
  window.api.logNativeImage()
}

</script>

<template>
  <img :src="image" />
  <div class="buttons">
    <button @click="send">发送(invoke)</button>
    <button @click="copy">复制(非沙盒)</button>
    <button @click="show">展示(剪切板)</button>
    <button @click="capture">抓取页面</button>
    <button @click="logNativeImage">输出(nativeImage)</button>
  </div>
</template>

<style scoped>
.buttons {
  display: flex;
  gap: 24px;
}

</style>
