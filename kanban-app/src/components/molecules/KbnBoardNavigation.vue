<template>
  <nav class="board-navigation">
    <div class="title">
      <h1>Kanban App</h1>
    </div>
    <div class="actions">
      <KbnButton type="text" @click="$emit('logout')">ログオフ</KbnButton>
    </div>
  </nav>
</template>

<script>
import KbnButton from "@/components/atoms/KbnButton";
export default {
  name: "KbnBoardnavigation",
  components: {
    KbnButton
  }
};
</script>

<style scoped>
.board-navigation {
  display: flex;
  border-bottom: medium solid black;
}
.title {
  flex: 1;
}
h1 {
  margin: 0px;
}
.actions {
  width: 64px;
  display: flex;
  justify-content: center;
  align-items: center;
}
button {
  cursor: pointer;
}
</style>