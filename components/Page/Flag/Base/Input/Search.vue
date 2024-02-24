<template>
  <a-input
    type="text"
    v-model:value="value"
    placeholder="Search here"
    class="w-[300px] mb-4"
  />
</template>

<script lang="ts" setup>
const value = defineModel("value");

</script>