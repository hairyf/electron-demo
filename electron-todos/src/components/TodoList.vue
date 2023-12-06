<script lang="ts" setup>
import { ref } from 'vue';
import TodoInput from './TodoInput.vue';
import Todo from './Todo.vue';

defineProps<{
  name: string
}>()

const todos = ref([
  { description: "Do the dishes", completed: false },
  { description: "Take out the trash", completed: false },
  { description: "Finish doing laundry", completed: false },
])

function addTodo(todo: string) {
  todos.value.push({ description: todo, completed: false })
}
function deleteTodo(deletedTodo: any) {
  todos.value = todos.value.filter(todo => todo !== deletedTodo);
}
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col-12 py-5">
        <h1>{{ name }}</h1>
      </div>
    </div>
    <div class="row mb-3">
      <todo-input style="width: 100%;" @new-todo="addTodo" />
    </div>
    <div class="row">
      <div class="col-12 col-sm-10 col-lg-6">
        <ul class="list-group">
          <Todo v-for="(todo, index) in todos" 
            :key="index" 
            v-model:description="todo.description" 
            v-model:completed="todo.completed"
            @delete="deleteTodo(todo)"
          />
        </ul>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
