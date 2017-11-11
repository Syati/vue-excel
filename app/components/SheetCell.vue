<template>
  <div class="sheetCell" @click="handleCellClick">
    <span class="sheetCellValue" v-show="!isEditing">{{ value }}</span>
    <input v-show="isEditing"
           ref='cell'
           :value="value"
           @input="updateValue($event.target.value)"
           @blur="handleCellBlur"
    >
  </div>
</template>

<script>
export default {
  name: 'SheetCell',
  props: [ 'value' ],
  data: function(){
    return {
      isEditing: false
    }
  },
  methods: {
    updateValue(value){
      this.$emit('input', value);
    },
    handleCellClick: function(){
      if(!this.isEditing) {
        this.isEditing = true;
        this.$nextTick(() => this.$refs.cell.focus());
      }
    },
    handleCellBlur: function(){
      this.isEditing = false;
    }
  }
}
</script>