<template>
 <a-modal v-bind="$attrs" width="1100px" :footer="null">
  <a-descriptions title="Country Information" bordered>
   <a-descriptions-item label="Flag">
    <a-image :width="60" :height="30" :src="value?.flags?.png" />
   </a-descriptions-item>
   <a-descriptions-item label="Official Name">{{
    value?.name?.official
   }}</a-descriptions-item>
   <a-descriptions-item label="Common Name">{{
    value?.name?.common
   }}</a-descriptions-item>
   <a-descriptions-item label="Cca2">{{ value?.cca2 }}</a-descriptions-item>
   <a-descriptions-item label="Cca3">{{ value?.cca3 }}</a-descriptions-item>

   <a-descriptions-item :span="3" label="Capital City">
    <a-tag color="#2db7f5" v-for="(item, index) in value?.capital" :key="index">
     {{ item }}
    </a-tag>
   </a-descriptions-item>
   <a-descriptions-item label="Native Name" :span="3">
    <a-tag
     class="m-2"
     v-for="(item, index) in convertNativeName(value?.name?.nativeName)"
     :key="index"
     color="geekblue">
     {{ item?.official }}
    </a-tag>
   </a-descriptions-item>

   <a-descriptions-item label="Population" :span="1">
    {{ value?.population }}
   </a-descriptions-item>
   <a-descriptions-item label="Location" :span="2">
    <a :href="value?.maps?.googleMaps">{{
     value?.maps?.googleMaps
    }}</a></a-descriptions-item
   >

   <a-descriptions-item label="Currency" :span="3">
    <a-tag
     v-for="(item, index) in convertNativeName(value?.currencies)"
     :key="index">
     {{ item.symbol }} - {{ item.name }}
    </a-tag>
   </a-descriptions-item>
   <a-descriptions-item label="Continents" :span="1">
    <a-tag
     v-for="(item, index) in value?.continents"
     :key="index"
     color="#87d068">
     {{ item }}
    </a-tag>
   </a-descriptions-item>
   <a-descriptions-item label="IDD">{{ value?.idd?.root }}</a-descriptions-item>
   <a-descriptions-item label="Capital Lat-Long" :span="2">
    <a
     target="_blank"
     class="Tex"
     :href="`https://www.google.com/maps/place/${value?.capitalInfo?.latlng[0]},${value?.capitalInfo?.latlng[1]}`">
     <PushpinOutlined /> Go to map
    </a>
   </a-descriptions-item>
   <a-descriptions-item label="Flag Detail" :span="3">
    {{ value?.flags?.alt }}
   </a-descriptions-item>
   <a-descriptions-item label="Borders">
    <div v-if="value?.borders?.length">
     <a-tag
      v-for="(item, index) in value?.borders"
      :key="index"
      color="magenta">
      {{ item }}
     </a-tag>
    </div>
    <div v-else>
     <p>-</p>
    </div>
   </a-descriptions-item>
  </a-descriptions>
 </a-modal>
</template>
<script lang="ts" setup>
import { PushpinOutlined } from "@ant-design/icons-vue";

const value = defineModel("value");
const convertNativeName = (data: any) => {
 const officialNames:any = {};
 for (const key in data) {
  if (data.hasOwnProperty(key)) {
   officialNames[key] = data[key];
  }
 }
 return officialNames;
};
</script>
