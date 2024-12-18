<template>
  <div class="home">
    <h2>Задача - Индекс {{ $route.params.id }}</h2>
    <div class="center">
      <div class="block">
        <h2>{{ $store.state.tasks[$route.params.id].id }} - id</h2>
        <h3>Название - {{ $store.state.tasks[$route.params.id].text }}</h3>
        <h4>
          Описание - {{ $store.state.tasks[$route.params.id].description }}
        </h4>
        <h2>{{ $store.state.tasks[$route.params.id].srok }}</h2>
      </div>
      <!-- <h2>{{ $store.state.tasks[$route.params.id] }}</h2> -->
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "ItemTask",
  component: {},
  setup() {
    return {};
  },
});
</script>

<style scoped>
.home {
  margin: 0 auto;
}
.block {
  border: 2px solid gray;
  text-align: left;
  padding: 20px;
  width: 800px;
  border-right: 40px solid rgb(0, 119, 128);
}
</style>
