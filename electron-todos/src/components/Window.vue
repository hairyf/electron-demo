<script lang="ts" setup>
function close() {
  window.ipcRenderer.send('close')
}
function hide() {
  window.ipcRenderer.send('hide')
}
function full() {
  window.ipcRenderer.send('full')
}
</script>

<template>
  <div class="window">
    <div @click="hide" class="i-ri-subtract-line" />
    <div @click="full" style="font-size: 18px;" class="i-ri-fullscreen-exit-fill" />
    <div @click="close" class="i-ri-close-line" />
  </div>
</template>

<style scoped>
.window {
  height: 40px;
  border-bottom: 1px solid;
  display: flex;
  justify-content: end;
  align-items: center;
  padding: 0 12px;
  gap: 12px;
  user-select: none;
  -webkit-app-region: drag;
}
.window > div {
  font-size: 20px;
  cursor: pointer;
  -webkit-app-region: no-drag;
}
</style>
