import { createStore } from "vuex";

export interface Props {
  count: number;
  tasks: {
    id: number;
    text: string;
    description: string;
    srok: string;
  }[];
  history: any[];
}

export default createStore<Props>({
  state: {
    count: 0,
    tasks: [
      {
        id: 1,
        text: "sad",
        description: "низкий",
        srok: "новая",
        // description: "низкий, средний, высокий",
        // srok: "новая, в работе, завершена",
      },
      {
        id: 2,
        text: "Bue",
        description: "средний",
        srok: "в работе",
      },
    ],
    history: [],
  },
  getters: {},
  mutations: {
    increment(state) {
      state.count++;
    },
    deletTask(state, newId) {
      state.tasks = state.tasks.filter((item) => item.id !== newId);
    },
    readyTask(state, newId) {
      state.tasks[newId].srok = "завершена";
    },
    createTask(state, nameTask) {
      const date = new Date();
      state.tasks.push({
        id: Date.now(),
        text: nameTask,
        description: "низкий",
        srok: "новая",
      });
      state.history.push({
        date: date.toLocaleString(),
        name: nameTask,
      });
      const newTasks = state.tasks;
      state.tasks = newTasks;
      alert("Создана новая задача!");
    },
    redactTask(state, newState) {
      console.log(newState.value.state0);
      if (newState.value.state2 == " " && newState.value.state3 != " ") {
        state.tasks[newState.value.state0].text = newState.value.state1;
        state.tasks[newState.value.state0].srok = newState.value.state3;
      } else if (newState.value.state2 != " " && newState.value.state3 == " ") {
        state.tasks[newState.value.state0].text = newState.value.state1;
        state.tasks[newState.value.state0].description = newState.value.state2;
      } else if (newState.value.state2 == " " && newState.value.state3 == " ") {
        state.tasks[newState.value.state0].text = newState.value.state1;
      } else {
        state.tasks[newState.value.state0].text = newState.value.state1;
        state.tasks[newState.value.state0].description = newState.value.state2;
        state.tasks[newState.value.state0].srok = newState.value.state3;
      }
      const newTasks = state.tasks;
      state.tasks = newTasks;
      alert("Создана обновлена!");
    },
    inviteTask(state, newId) {
      state.tasks[newId].srok = "завершена";
    },
    setTask(state, taskData) {
      state.tasks = taskData;
    },
  },
  actions: {
    // fetchData({ commit }) {
    //   return fetch("https://api.example.com/data/")
    //     .then((response) => response.json())
    //     .then((data) => {
    //       commit("setData", data);
    //     });
    // },
    async fetchAddUser({ commit }, nameTask) {
      try {
        const response = await fetch(
          `https://aafa9532e201eae7.mokky.dev/tasks`,
          {
            method: "post",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: Date.now(),
              text: nameTask,
              description: "низкий",
              srok: "новая",
            }),
          }
        );
        // const taskData = await response.json();
        // commit("setTask", taskData);
      } catch (error) {
        console.error("Error", error);
      }
    },
    async fetchRedactUser({ commit }, newState) {
      let desct = "";
      if (newState.value.state2 == " ") {
        desct = this.state.tasks[newState.value.state0].description;
      } else {
        desct = newState.value.state2;
      }
      let srokText = "";
      if (newState.value.state3 == " ") {
        srokText = this.state.tasks[newState.value.state0].srok;
      } else {
        srokText = newState.value.state3;
      }
      try {
        const response = await fetch(
          `https://aafa9532e201eae7.mokky.dev/tasks/${
            newState.value.state0 + 1
          }`,
          {
            method: "PATCH",
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
            body: JSON.stringify({
              id: newState.value.state0 + 1,
              text: newState.value.state1,
              description: desct,
              srok: srokText,
            }),
          }
        );
      } catch (error) {
        console.error("Error", error);
      }
    },
    async fetchDeletUser({ commit }, newId) {
      try {
        const response = await fetch(
          `https://aafa9532e201eae7.mokky.dev/tasks/${newId}`,
          {
            method: "delete",
          }
        );
      } catch (error) {
        console.error("Error", error);
      }
    },
    async fetchUser({ commit }) {
      try {
        const response = await fetch(
          `https://aafa9532e201eae7.mokky.dev/tasks`
        );
        const taskData = await response.json();
        commit("setTask", taskData);
      } catch (error) {
        console.error("Error", error);
      }
    },
  },
  modules: {},
});
