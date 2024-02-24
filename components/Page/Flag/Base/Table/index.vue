<template>
  <PageFlagBaseDialogCountryInfo v-model:open="dialog" v-model:value="dialogData" />
  <a-table
    :columns="columns"
    :data-source="dataTable"
    :pagination="pagination"
    :loading="loading"
    @change="handleChange"
  >
    <template #bodyCell="{ column, text, record }">
      <template v-if="column.dataIndex == 'flags'">
        <a-image :width="60" :height="30" :src="text?.png" />
      </template>
      <template v-if="column.dataIndex == 'name'">
        <a class="text-blue" @click="handleOpenInformation(record)">
          {{ text?.official }}
        </a>
      </template>
      <template v-if="column.dataIndex == 'altSpellings'">
        <a-tag
          v-for="tag in text"
          :key="tag"
          class="m-1"
          :color="
            tag === 'loser' ? 'volcano' : tag.length > 5 ? 'geekblue' : 'green'
          "
        >
          {{ tag.toUpperCase() }}
        </a-tag>
      </template>
      <template v-if="column.dataIndex == 'idd'">
        {{ text?.root }}
      </template>
      <template v-if="column.dataIndex == 'nativeName'">
        <a-tag
          class="m-2"
          v-for="(item, index) in convertNativeName(record?.name?.nativeName)"
          :key="index"
        >
          {{ item }}
        </a-tag>
      </template>
    </template>
  </a-table>
</template>
<script lang="ts" setup>
const search = defineModel("search");
const loading = ref<boolean>(false);
const dialog = ref<boolean>(false);
const dialogData = ref()
const pageSize = ref(25);
const API = useApi();
const dataTable = ref([]);
const columns = [
  {
    title: "Flags",
    dataIndex: "flags",
    key: "flag",
    width: 100,
  },
  {
    title: "Country Name",
    dataIndex: "name",
    key: "name",
    width: 200,
    sorter: true,
  },
  {
    title: "Country Code",
    dataIndex: "cca2",
    key: "cca2",
    width: 150,
  },
  {
    title: "Country Code",
    key: "ccn3",
    dataIndex: "cca3",
    width: 150,
  },
  {
    title: "Native Name",
    key: "nativeName",
    dataIndex: "nativeName",
    width: 150,
  },
  {
    title: "Alternative Country Name",
    key: "altSpellings",
    dataIndex: "altSpellings",
    width: 350,
  },
  {
    title: "IDD",
    key: "idd",
    dataIndex: "idd",
    width: 100,
  },
];

watch(search, async (val: string) => {
  await searchCountryName();
});

const convertNativeName = (data: any) => {
  const officialNames = {};
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      officialNames[key] = data[key].official;
    }
  }
  return officialNames;
};
const searchCountryName = async () => {
  loading.value = true;

  if (search.value) {
    loading.value = true;
    try {
      const response = await API.get(`name/${search.value}`);
      dataTable.value = response;
    } catch (err: any) {
      loading.value = false;
      dataTable.value = [];
    }
    loading.value = false;
  } else {
    await fetchData();
  }
  loading.value = false;
};

const pagination = computed(() => ({
  total: dataTable.value.length,
  pageSize: pageSize.value,
}));
const handleChange = (pagination: any, filters: any, sorter: any) => {
  loading.value = true;
  pageSize.value = pagination?.pageSize;
  if (sorter?.order == "descend") {
    dataTable.value = dataTable.value.sort((a: string, b: string) =>
      a.name?.official.localeCompare(b?.name?.official)
    );
  } else {
    dataTable.value = dataTable.value.sort((a: string, b: string) =>
      b.name?.official.localeCompare(a?.name?.official)
    );
  }
  loading.value = false;
};
const handleOpenInformation = (record:any) => {
  dialog.value = true;
  dialogData.value = record
};
const fetchData = async () => {
  loading.value = true;
  try {
    const response = await API.get("all");
    dataTable.value = response;
  } catch (err: any) {
    loading.value = false;
    dataTable.value = [];
  }
  loading.value = false;
};
await fetchData();
</script>
