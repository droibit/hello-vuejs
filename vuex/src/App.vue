<template>
  <div>
    <h2>タスク一覧</h2>
    <ul>
      <li v-for="task in tasks" :key="task.id">
        <input type="checkbox" :checked="task.done" @change="toggleTaskStatus(task)">
        {{ task.name }}
        -
        <span
          v-for="id in task.labelIds"
          :key="id"
        >{{ getLabelText(id) }}/</span>
      </li>
    </ul>
    <form @submit.prevent="addTask">
      <input type="text" v-model="newTaskName" placeholder="新しいタスク">
    </form>

    <h2>ラベル一覧</h2>
    <ul>
      <li v-for="label in labels" :key="label.id">
        <input type="checkbox" :value="label.id" v-model="newTaskLabelIds">
        {{ label.text }}
      </li>
    </ul>
    <form @submit.prevent="addLabel">
      <input type="text" v-model="newLabelText" placeholder="新しいラベル">
    </form>
    <h2>ラベルでフィルタ</h2>
    <ul>
      <li v-for="label in labels" :key="label.id">
        <input type="radio" :checked="label.id === filter" @change="changeFilter(label.id)">
        {{ label.text }}
      </li>
      <li>
        <input type="radio" :checked="filter === null" @change="changeFilter(null)">
        フィルタなし
      </li>
    </ul>

    <h2>保存と復元</h2>
    <button type="button" @click="save">保存</button>
    <button type="button" @click="restore">復元</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newTaskName: "",
      newTaskLabelIds: [],
      newLabelText: ""
    };
  },
  computed: {
    tasks() {
      return this.$store.getters.filteredTasks;
    },
    labels() {
      return this.$store.state.labels;
    },
    filter() {
      return this.$store.state.filter;
    }
  },
  methods: {
    addTask() {
      this.$store.commit("addTask", {
        name: this.newTaskName,
        labelIds: this.newTaskLabelIds
      });
      this.newTaskName = "";
      this.newTaskLabelIds = [];
    },
    toggleTaskStatus(task) {
      this.$store.commit("toggleTaskStatus", {
        id: task.id
      });
    },
    addLabel() {
      this.$store.commit("addLabel", {
        text: this.newLabelText
      });
      this.newLabelText = "";
    },
    getLabelText(id) {
      const label = this.labels.filter(label => label.id == id)[0];
      return label ? label.text : "";
    },
    changeFilter(labelId) {
      this.$store.commit("changeFilter", {
        filter: labelId
      });
    },
    save() {
      this.$store.dispatch("save");
    },
    restore() {
      this.$store.dispatch("restore");
    }
  }
};
</script>
