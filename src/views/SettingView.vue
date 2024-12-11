<template>
  <div class="home">
    <h2>Мои задачи</h2>
    <div>
      <ul>
        <li
          @click="openModal"
          v-for="(item, index) in $store.state.tasks"
          :key="item.id"
        >
          {{ index + 1 }} - {{ item.text }}<br />
          State -> {{ item.description }}<br />
          State ->
          {{ item.srok }}
          <button @click="TogglePopup('buttonTrigger', index)">Redact</button>
        </li>
      </ul>
    </div>
    <!-- <div>
      <h1>Vue Popups</h1>
      <button @click="TogglePopup('buttonTrigger', index)">Open Popup</button>
    </div> -->

    <refModal
      v-if="this.popupTriggers.buttonTrigger"
      :TogglePopup="() => TogglePopup('buttonTrigger')"
    >
      <div class="popup">
        <div class="popup-inner">
          <div class="guid">
            <slot />
            <h3>Редактироваие - {{ idState }}</h3>
            <h4>{{ errorid }}</h4>
            <label for="#">Name Task</label>
            <input v-model="nameValue" placeholder="Invate text" type="text" />
            <select v-model="stateOne">
              <option value="низкий">Низкий приоритет</option>
              <option value="средний">Средний приоритет</option>
              <option value="высокий">Высокий приоритет</option>
            </select>
            <select v-model="stateTwo">
              <option value="Новая задача">Новая задача</option>
              <option value="В работе">В работе</option>
              <option value="Завершена">Завершена</option>
            </select>
            <button class="popup-close" @click="addTask()">Ready</button>
            <button class="popup-close" @click="TogglePopup('buttonTrigger')">
              Close Popup
            </button>
          </div>
        </div>
      </div>
    </refModal>
  </div>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent, ref } from "vue";
import { useStore } from "vuex";
import refModal from "@/components/refModal.vue";
import HelloWorld from "@/components/HelloWorld.vue";
// interface Props {
//   buttonTrigger?: boolean;
//   timedTrigger?: boolean;
// }

export default defineComponent({
  name: "SettingsTask",
  component: {
    refModal,
    HelloWorld,
  },
  setup() {
    const nameValue = ref(" ");
    const errorid = ref(" ");
    const stateFull = ref({});
    const stateOne = ref(" ");
    const stateTwo = ref(" ");
    const idState = ref(0);
    const store = useStore();

    store.dispatch("fetchUser").then(() => {
      console.log("Date save");
    });

    const popupTriggers = ref({
      buttonTrigger: false,
      timedTrigger: false,
    });

    const TogglePopup = (trigger: string, id: number) => {
      // console.log(popupTriggers.value.buttonTrigger);
      if (trigger == "buttonTrigger") {
        popupTriggers.value.buttonTrigger = !popupTriggers.value.buttonTrigger;
        idState.value = id;
        // console.log(idState.value);
        // this.msg = id;
      } else {
        popupTriggers.value.timedTrigger = !popupTriggers.value.timedTrigger;
      }
      errorid.value = " ";
    };

    const addTask = () => {
      // console.log(stateOne.value);
      stateFull.value = {
        state0: idState,
        state1: nameValue,
        state2: stateOne,
        state3: stateTwo,
      };
      if (nameValue.value.trim() !== "") {
        errorid.value = " ";
        store.commit("redactTask", stateFull);
        setTimeout(function () {
          nameValue.value = " ";
          const stateOne = " ";
          const stateTwo = " ";
          const idState = 0;
        }, 10);
        store.dispatch("fetchRedactUser", stateFull).then(() => {
          console.log("Date save");
        });
      } else {
        errorid.value = "Нужно больше символов!";
      }
    };
    return {
      TogglePopup,
      popupTriggers,
      stateOne,
      stateTwo,
      addTask,
      nameValue,
      idState,
      errorid,
    };
  },
});
</script>

<style scoped>
.guid {
  display: grid;
  gap: 20px;
  text-align: left;
}
label {
  margin-bottom: -20px;
}
.guid h4 {
  color: red;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}
li {
  display: grid;
  text-align: left;
  border: 1px solid darkcyan;
  padding: 2px 10px;
  margin-top: 10px;
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
  cursor: pointer;
}
a {
  color: #42b983;
}
.popup {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
}
.popup-inner {
  background: #fff;
  padding: 32px;
}
</style>
