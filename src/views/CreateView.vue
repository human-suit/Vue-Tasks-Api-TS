<template>
  <div class="about">
    <h1>This is an create Tasks page</h1>
    <div>
      <input v-model="nameValue" placeholder="Invate text" type="text" />
      <button @click="addTask">ADD</button>
    </div>
    <div>
      <ul>
        <h2>History</h2>
        <li v-if="$store.state.history.length == 0">еще нет истории</li>
        <li v-for="(item, index) in $store.state.history" :key="item.id">
          <h3>
            {{ index + 1 }} - {{ item.date }} - вы создали "{{ item.name }}"
          </h3>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useStore } from "vuex";

// interface Props {
//   state: {
//     count: number;
//     name: string;
//     tasks: {
//       id: number;
//       text: string;
//       description: string;
//       srok: string;
//     }[];
//     history: any[];
//   };
// }

export default defineComponent({
  name: "CreateTasks",
  props: {
    msg: String,
  },
  setup(props) {
    const nameValue = ref(" ");
    const store = useStore();
    // console.log(nameValue);
    const addTask = () => {
      const date = new Date();
      const tasks: any = store.state.tasks;
      console.log(nameValue);
      if (nameValue.value.trim() !== "") {
        store.commit("createTask", nameValue.value);
        setTimeout(function () {
          nameValue.value = " ";
        }, 10);
      }
      store.dispatch("fetchAddUser", nameValue.value).then(() => {
        console.log("Add save");
        store.dispatch("fetchUser").then(() => {
          console.log("Date replay");
        });
      });
    };
    return { props, addTask, nameValue };
  },
});
</script>

<style scoped>
input {
  padding: 10px 100px 10px 10px;
}
button {
  margin-left: 10px;
  padding: 10px 50px;
  background: darkcyan;
  border: 0px;
  color: white;
  font-weight: 900;
}
button:hover {
  cursor: pointer;
  padding: 12px 52px;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  text-align: left;
  border: 1px solid darkcyan;
  padding: 2px 10px;
  margin-top: 10px;
}
</style>
