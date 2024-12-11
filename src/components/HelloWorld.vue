<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>My Tasks</h2>
    <p>Counters: {{ $store.state.tasks.length }}</p>
    <!-- <button @click="increment">+1</button> -->
    <div>
      <ul>
        <li v-for="(item, index) in $store.state.tasks" :key="item.id">
          <!-- <h3 v-if="item.complete" class="prov">{{ item.text }}</h3>
        <h3 v-else>{{ item.text }}</h3> -->
          <!-- {{ item.text ? "True" : "False" }} -->
          <div v-if="item.description == 'низкий'" class="main">
            <h2 class="block_grin">Сделаем потом</h2>
            <div class="block">
              <h4>№ -> {{ index + 1 }}</h4>
            </div>
            <div class="block">
              <h3>Name -> {{ item.text }}</h3>
            </div>
            <div class="block">
              <h3>State -> {{ item.description }}</h3>
            </div>
            <div class="block">
              <h3>State -> {{ item.srok }}</h3>
            </div>
            <button @click="deletTask(item.id, index)">Delet</button>
          </div>
          <div v-else-if="item.description == 'средний'" class="yellow">
            <h2 class="block_yel">Средняя Важность</h2>
            <div class="block">
              <h4>№ -> {{ index + 1 }}</h4>
            </div>
            <div class="block">
              <h3>Name -> {{ item.text }}</h3>
            </div>
            <div class="block">
              <h3>State -> {{ item.description }}</h3>
            </div>
            <div class="block">
              <h3>State -> {{ item.srok }}</h3>
            </div>
            <button @click="deletTask(item.id, index)">Delet</button>
          </div>
          <div v-else class="red">
            <h2 class="block_red">Важно очень</h2>
            <div class="block">
              <h4>№ -> {{ index + 1 }}</h4>
            </div>
            <div class="block">
              <h3>Name -> {{ item.text }}</h3>
            </div>
            <div class="block">
              <h3>State -> {{ item.description }}</h3>
            </div>
            <div class="block">
              <h3>State -> {{ item.srok }}</h3>
            </div>
            <button @click="deletTask(item.id, index)">Delet</button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "vuex";
export default defineComponent({
  name: "HelloWorld",
  props: {
    msg: String,
  },

  setup(props) {
    const store = useStore();
    store.dispatch("fetchUser").then(() => {
      console.log("Date ready");
    });
    // store.dispatch("fetchUser").then(() => {
    //   console.log("Date save");
    // });
    console.log(store.state.tasks);
    const increment = () => {
      store.commit("increment");
    };
    const deletTask = (id: number, index: number) => {
      store.commit("deletTask", id);
      store.dispatch("fetchDeletUser", id).then(() => {
        console.log("Delete");
        store.dispatch("fetchUser").then(() => {
          console.log("Date replay");
        });
      });
      alert(`Delete task - ${index + 1}`);
    };
    return { props, increment, deletTask };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.block {
  text-align: center;
  padding: 0;
  margin-top: 10px;
  background: darkcyan;
  color: white;
  font-weight: 900;
}
.main {
  display: grid;
  text-align: left;
  border: 1px solid darkcyan;
  padding: 2px 10px;
  margin-top: 10px;
  width: 200px;
  height: 300px;
}
.yellow {
  display: grid;
  text-align: left;
  border: 1px solid rgb(252, 195, 40);
  padding: 2px 10px;
  margin-top: 10px;
  width: 200px;
  height: 300px;
}
.red {
  display: grid;
  text-align: left;
  border: 1px solid rgb(245, 26, 26);
  padding: 2px 10px;
  margin-top: 10px;
  width: 200px;
  height: 300px;
}
.block_grin {
  font-size: 18px;
  text-align: center;
  color: white;
  background-color: green;
  padding: 10px 20px;
}
.block_yel {
  font-size: 16px;
  text-align: center;
  color: white;
  background-color: rgb(61, 74, 252);
  padding: 10px 20px;
}
.block_red {
  font-size: 18px;
  text-align: center;
  color: white;
  background-color: red;
  padding: 10px 20px;
}
.block h3 {
  margin: 0;
}
.block h4 {
  margin: 0;
  padding-left: 25px;
  text-align: left;
}
h3 {
  margin: 40px 0 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 180px;
}
ul {
  list-style-type: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}
button {
  padding: 10px 10px;
  margin-top: 10px;
  background: darkcyan;
  border: 0px;
  color: white;
  font-weight: 900;
}
button:hover {
  transition: 0.5s;
  cursor: pointer;
  background: rgb(2, 104, 104);
}
a {
  color: #42b983;
}
</style>
