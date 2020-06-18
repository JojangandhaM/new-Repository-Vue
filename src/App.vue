<template>
  <div id="my-todo-list">
    <div>
    <form class="add" v-if="isAddBtnClicked" v-on:submit.prevent="addNewTodo">
          <label class="labelclass" for="new-todo">Add a todo task:</label>
          <input class="inputclass"
            autocomplete="off"
            v-model="newTodoText"
            id="new-todo"
            placeholder="Please add a new item."
          >
          <button>Add</button>
        </form>
        <form class="edit" v-if="isEditClicked" v-on:submit.prevent="edittingTodoitemDone">
            <label class="labelclass" for="edit-todo">Edit a todo item:</label>
            <input class="inputclass"
              autocomplete="off"
              v-model="editTodoText"
              id="edit-todo"
              placeholder="Please edit the item."
            >
            <button>Done</button>
          </form>
        
        <div class="list">
            <label v-if="!isAllTaskDeleted && todos.length !== 0" class="listlabel">List of All task created</label>
            <ul>
                <li
                  is="TodoItem"
                  v-for="(todo, index) in todos"
                  v-bind:key="todo.id"
                  v-bind:title="todo.title"
                  v-bind:todo="todo"
                  v-on:delete="todos.splice(index, 1)"
                  v-on:edit="editItem"
                  v-on:complete="completeTask"
                ></li>
              </ul>
        </div>
        <div class="operations">
            <div class="deleteall" v-if="(!isAllTaskDeleted && todos.length !== 0)">
                <button @click="deleteAllTask">Delete All Item</button>
            </div>
            <div class="taskdeleted" v-else>
                <label>All task has been deleted. Please add new task. </label>
            </div>
            <div v-bind:class="{addtask: true, addadditionalcls: !isAllTaskDeleted && todos.length !== 0}">
                <button class="addbtn" @click="addbtnClicked">Add Task</button>
            </div>
            <div class="sortall" v-if="(!isAllTaskDeleted && todos.length !== 0)">
                <button @click="sortTask">Sort Task</button>
            </div>
        </div>        
      </div>
    <div>
  </div>
  </div>
</template>

<script>
import TodoItem from './components/TodoItem.vue'

export default {
  name: '#my-todo-list',
  components: {
    TodoItem
  },
  data: function() {
      return {
        newTodoText: '',
        editTodoText: '',
        isEditClicked: false,
        editableItem: null,
        isAllTaskDeleted: false,
        isAddBtnClicked: false,
        todos: [
          {
            id: 1,
            title: 'Prepare Food',
            isTaskComplete: false
          },
          {
            id: 2,
            title: 'Cleaning Home',
            isTaskComplete: false
          },
          {
            id: 3,
            title: 'Buy Books',
            isTaskComplete: false
          }
        ],
        nextTodoId: 4
      }
    },
    methods: {
      addNewTodo: function () {
          if(this.newTodoText) {
            if(this.isAllTaskDeleted) {
                this.nextTodoId = 1;
                this.todos.push({
                    id: this.nextTodoId++,
                    title: this.newTodoText
                });
            } else {
                this.todos.push({
                    id: this.nextTodoId++,
                    title: this.newTodoText
                });
            }
          }       
        this.newTodoText = '';
        this.isAddBtnClicked = false;
        this.isAllTaskDeleted = false;
      },
      editItem: function(itemId, itemText) {
        this.editTodoText = itemText;
        this.editableItem = itemId;
        this.isEditClicked = true;
      },
      edittingTodoitemDone: function() {
        this.todos[this.editableItem-1].title = this.editTodoText;
        this.editTodoText = '';
        this.editableItem = null;
        this.isEditClicked = false;
      },
      deleteAllTask: function() {
          this.todos = [];
          this.isAllTaskDeleted = true;
      },
      addbtnClicked: function() {
        this.isAddBtnClicked = true;
      },
      completeTask: function(itemId) {
        this.todos[itemId-1].isTaskComplete = true;
      },
      sortTask: function() {
          this.todos.sort(function(a, b){
                const titleA = a.title.toUpperCase();
                const titleB = b.title.toUpperCase();
                if(titleA > titleB) {
                    return 1;
                } else if( titleA < titleB) {
                    return -1;
                } else {
                    return 0;
                }
            });
      }
    }
}
</script>

<style>
.ul li {
    margin: 5px;
}

li {
    font-size: 18px;
    font-family: monospace;
}

button {
    font-size: 16px;
    background-color: #ecdbdb;
    padding: 5px;
    box-shadow: 0 1px 1px black;
    margin: 10px;
    border-radius: 4px;
}

.inputclass {
    margin-top: 10px;
    margin-bottom: 10px;
    padding: 5px;
}


.labelclass {
    margin-top: 10px;
    margin-bottom: 10px;
    padding: 10px;
    font-weight: bold;
    font-size: 20px;
}

.list, .add, .edit {
    width: 50%;
    padding: 15px;
    margin: 5px;
    border: 2px;

}

.deleteall, .taskdeleted {
    padding: 5px;
    margin: 5px;
}
.addtask {
    padding: 5px;
    margin: 5px;
}
.addadditionalcls {
    padding-top: 15px;
}

.taskdeleted, .listlabel {
    font-size: 20px;
    font-weight: normal;
    font-family: monospace;
}

.operations{
    display: flex;
}

.addbtn {
    margin: 0px;
}

.sortall {
    padding-top: 5px;
    margin: 5px;
}

</style>
