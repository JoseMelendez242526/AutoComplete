<template>
  <div class="demo">
    <div v-if="selected" style="padding-top:10px; width: 100%;">
      You have selected <code>{{selected.name}}, with bank: {{selected.bank}}</code>
    </div>
    <div class="autosuggest-container">
      <vue-autosuggest
        v-model="query"
        :suggestions="filteredOptions"
        @focus="focusMe"
        @click="clickHandler"
        @input="onInputChange"
        @selected="onSelected"
        :get-suggestion-value="getSuggestionValue"
        :input-props="{id:'autosuggest__input', placeholder:'Select your fighter!'}">
        <div slot-scope="{suggestion}" style="display: flex; align-items: center;">
          <img :style="{ display: 'flex', width: '25px', height: '25px', borderRadius: '15px', marginRight: '10px'}" :src="suggestion.item.avatar" />
          <div style="{ display: 'flex', color: 'navyblue'}">{{suggestion.item.name}}</div>
        </div>
      </vue-autosuggest>
    </div>
  </div>
</template>
 
<script>
import { VueAutosuggest } from "vue-autosuggest";
 
export default {
  components: {
    VueAutosuggest
  },
  data() {
    return {
      query: "",
      selected: "",
      suggestions: [
        {
          data: [
            { id: 1, name: "sophiabowers", bank: "first tech", avatar: "data:image/jpeg;base64,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" },
            { id: 2, name: "johnwick", bank: "iccu", avatar: "https://lh3.googleusercontent.com/proxy/SI8eP_N0XZbxqqgzn1Cp5KnUzzobC8z-bfcaUUC-axPEPqwJ_8UXZtKVJPBQs5sFk8w4Bj9ykOGF4WMVuA" },
            { id: 3, name: "test464152", bank: "cu1", avatar: "https://upload.wikimedia.org/wikipedia/en/thumb/e/e9/Gandalf600ppx.jpg/220px-Gandalf600ppx.jpg" },
            { id: 4, name: "jbutcher12", bank: "bellco", avatar: "https://upload.wikimedia.org/wikipedia/en/thumb/3/35/Aragorn300ppx.png/150px-Aragorn300ppx.png" },
            { id: 5, name: "ella_riv1", bank:"bethpage", avatar:""}, 
            { id: 6, name: "david_keegan1", bank: "fibre", avatar:""}, 
            { id: 7, name: "awesome723", bank: "cusocal", avatar:""}
          ]
        }
      ]
    };
  },
  computed: {
    filteredOptions() {
      return [
        { 
          data: this.suggestions[0].data.filter(option => {
            return option.name.toLowerCase().indexOf(this.query.toLowerCase()) > -1;
          })
        }
      ];
    }
  },
  methods: {
    // clickHandler(item) {
    //   // event fired when clicking on the input
    // },
    onSelected(item) {
      this.selected = item.item;
    },
    onInputChange(text) {
      // event fired when the input changes
      console.log(text)
    },
    /**
     * This is what the <input/> value is set to when you are selecting a suggestion.
     */
    getSuggestionValue(suggestion) {
      return suggestion.item.name;
    },
    focusMe(e) {
      console.log(e) // FocusEvent
    }
  }
}
</script> 
 
<style>
.demo { 
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
 
input {
  width: 260px;
  padding: 0.5rem;
}
 
ul {
  width: 100%;
  color: rgba(30, 39, 46,1.0);
  list-style: none;
  margin: 0;
  padding: 0.5rem 0 .5rem 0;
}
li {
  margin: 0 0 0 0;
  border-radius: 5px;
  padding: 0.75rem 0 0.75rem 0.75rem;
  display: flex;
  align-items: center;
}
li:hover {
  cursor: pointer;
}
 
.autosuggest-container {
  display: flex;
  justify-content: center;
  width: 280px;
}
 
#autosuggest { width: 100%; display: block;}
.autosuggest__results-item--highlighted {
  background-color: rgba(51, 217, 178,0.2);
}
</style> 