Vue.component('todo-item', {
    template: '\
      <li>\
        {{ title }}\
        <button v-on:click="$emit(\'delete\')">Delete</button>\
        <button v-if=\"!todo.isTaskComplete\" v-on:click="$emit(\'edit\', todo.id, todo.title)">Edit</button>\
        <button v-else disabled v-on:click="$emit(\'edit\')">Edit</button>\
        <button v-if=\"!todo.isTaskComplete\" v-on:click="$emit(\'complete\', todo.id)">Complete</button>\
        <button v-if=\"todo.isTaskComplete\" disabled v-on:click="$emit(\'complete\', todo.id)">Completed</button>\
      </li>\
    ',
    props: ['title', 'todo']
  });
  
  new Vue({
    el: '#todo-list-example',
    data: {
      newTodoText: '',
      editTodoText: '',
      isEditClicked: false,
      editableItem: null,
      isAllTaskDeleted: false,
      isAddBtnClicked: false,
      todo: [],
      todos: [
        {
          id: 1,
          title: 'Buy Books',
          isTaskComplete: false
        },
        {
          id: 2,
          title: 'Dusting',
          isTaskComplete: false
        },
        {
          id: 3,
          title: 'Prepare Food',
          isTaskComplete: false
        }
      ],
      nextTodoId: 4
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
      }

    }
  });
  