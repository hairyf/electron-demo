<script lang="ts" setup>
import { ref } from 'vue';

const text = ref('')

const emit = defineEmits(['new-todo'])

function addTodo() {
  emit('new-todo', text.value)
  text.value = ''
}
</script>

<template>
  <form class="col-12 col-sm-10 col-lg-6" @submit.prevent="addTodo()">
    <input
      v-model="text"
      type="text"
      class="form-control"
      placeholder="Create a new to-do..."
    />
  </form>
</template>

<style lang="scss" scoped></style>
