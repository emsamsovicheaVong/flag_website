<template>
  <div class="bg-white shadow-lg w-full p-12">
    <div class="flex justify-end">
      <PageFlagBaseInputSearch v-model:value="search" />
    </div>
    <div>
      <PageFlagBaseTable v-model:search="search" />
    </div>
  </div>
</template>
<script lang="ts" setup>
const search = ref('')
</script>
