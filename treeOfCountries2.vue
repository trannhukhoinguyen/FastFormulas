<template> 
  <div>
    <a-tree 
      v-model:selectedKeys="selectedKeys" 
      :tree-data="treeData" 
      show-icon
    >
      <template #switcherIcon="{ switcherCls }">
        <DeploymentUnitOutlined :class="switcherCls" />
      </template>
      <template #icon="{ key, selected }">
        <template v-if="key.split('-').length === 2">
          {{countryList[key.slice(2)].flag}}
        </template>
      </template>
    </a-tree>        
  </div>   
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { DeploymentUnitOutlined } from '@ant-design/icons-vue';
import { countries } from 'country-list-json';

const countryList = countries;
const selectedKeys = ref(['0-0-0']);
const treeData = countryList.map((nation, indexNation) => ({
    title: nation.name + ' (' + nation.dial_code + ')',
    key: `0-${indexNation}`,
    children: [{
      title: indexNation%2 ? 'blue' : 'green',
      key: `0-${indexNation}-1`,
    }],
}));
</script>
