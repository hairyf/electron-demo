<script lang="ts" setup>
import { ref, useModel } from 'vue';

const props = defineProps<{
  completed: boolean
  description: string
}>()

const emit = defineEmits<{
  delete: []
}>()
const description = useModel(props, 'description')
const completed = useModel(props, 'completed')

const isEditing = ref(false)

function finishEditing() {
  isEditing.value = false
}
</script>

<template>
  <li class="d-flex align-items-center list-group-item">
    <button
      class="btn border-0 flex-grow-1 text-left shadow-none"
      :class="{ completed }"
      @click="completed = !completed"
      v-if="!isEditing"
    >
      <span>{{ description }}</span>
    </button>
    <form v-else class="flex-grow-1" @submit.prevent="finishEditing()">
      <input
        type="text"
        class="form-control"
        v-model="description"
        @blur="finishEditing()"
        ref="newTodo"
      />
    </form>
    <button
      @click="!isEditing && (isEditing = true)"
      class="btn btn-outline-primary border-0 ml-2"
    >
      <span class="fa fa-edit"></span>
    </button>
    <button @click="emit('delete')" class="btn btn-outline-danger border-0">
      <span class="fa fa-trash"></span>
    </button>
  </li>
</template>

<style scoped>
.completed {
  text-decoration: line-through;
}
</style>