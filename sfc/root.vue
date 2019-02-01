<template>
  <div id="root">
    <h1 class="header">Rootコンポーネント</h1>
    <p>これはRootコンポーネントです</p>
    <foo></foo>
    <bar></bar>
  </div>
</template>

<style>
#root {
  border: solid 1px blue;
  margin: 4px;
  padding: 4px;
}
.header {
  color: blue;
}

p {
  text-decoration: underline;
}
</style>

<script>
import Foo from "./foo";
import Bar from "./bar";
export default {
  components: {
    Foo,
    Bar
  }
};
</script>
