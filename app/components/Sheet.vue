<template>
  <div class="sheet">
    <form>
      <label for="file">File</label>
      <input id="file" type="file" @change="handleFileChange"/>
    </form>

    <table>
      <thead><tr>
        <th v-for="c in cols" :key="c.key">{{ c.name }}</th>
      </tr></thead>
      <tbody>
        <tr v-for="r, key in data" :key="key">
          <td v-for="c in cols" :key="c.key">
            <sheet-cell v-model="r[c.key]"></sheet-cell>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import XLSX from 'xlsx'
import SheetCell from './SheetCell.vue'

export default {
  name: 'Sheet',
  components: {'sheet-cell': SheetCell},
  data: function(){
    return {
      data: [],
      cols: [],
    }
  },
  methods: {
    handleFileChange(evt){
      const files = evt.target.files;
      this._readFile(files[0]);
    },
    _readFile(file) {
      /* Boilerplate to set up FileReader */
      const reader = new FileReader();
      reader.onload = (e) => {
        /* Parse data */
        const bstr = e.target.result;
        const wb = XLSX.read(bstr, {type: 'binary'});
        /* Get first worksheet */
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        /* Convert array of arrays */
        const data = XLSX.utils.sheet_to_json(ws, {header: 1});
        const headerRow = (data[0]).map((value, index) => ({key: index, name: value}));
        /* Update state */
        this.data = data.slice(1);
        this.cols = headerRow;
      };
      reader.readAsBinaryString(file);
    }
  }
}
</script>