<template>
  <div class="hello">
    <li>
        {{ title }}
        <button v-on:click="$emit('delete')">Delete</button>
        <button v-if="!todo.isTaskComplete" v-on:click="$emit('edit', todo.id, todo.title)">Edit</button>
        <button v-else disabled v-on:click="$emit('edit')">Edit</button>
        <button v-if="!todo.isTaskComplete" v-on:click="$emit('complete', todo.id)">Complete</button>
        <button v-if="todo.isTaskComplete" disabled v-on:click="$emit('complete')">Completed</button>
      </li>
  </div>
</template>

<script>
export default {
  name: 'TodoItem',
  props: {
    title: String,
    todo: Object
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
