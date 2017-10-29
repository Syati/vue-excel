import Vue from 'vue';
import XLSX from ''


Vue.component('todo-item', {
  props: ['todo'],
  template: '<li>{{ todo.text }}</li>',
});

let app = new Vue({
  el: '#app',
  data: {
    todos: [
      { id: 0, text: 'hoge' },
      { id: 1, text: 'moge' },
    ],
  },
});
