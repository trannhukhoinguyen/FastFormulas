<template> 
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
          <a-image
            :width="20"
            :src="countryTable[key.slice(2)].flag"
          />
        </template>
      </template>
    </a-tree>  
</template>
<script setup>
import { ref } from 'vue';
import { DeploymentUnitOutlined, TwitterOutlined, DropboxOutlined } from '@ant-design/icons-vue';

const selectedKeys = ref(['0-0-0']);
class Country {
  constructor(id, countryName, flag, isChecked, color) {
    this.id = id;
    this.countryName = countryName;
    this.flag = flag;
    this.isChecked = isChecked;
    this.color = color;
  }
};
let countryTable = [];
for(let i = 1; i <= 50; i++) {
  const countryTemp = new Country(
    i, 
    `countryName${i}`, 
    `https://cdn-icons-png.flaticon.com/128/630/${630666+i}.png`, 
    i%2 ? 'Yes' : 'No', 
    i%2 ? 'blue' : 'green',
  );
  countryTable.push(countryTemp);
};
const treeData = countryTable.map(nation => ({
    title: nation.countryName,
    key: `0-${nation.id-1}`,
    children: [{
      title: nation.isChecked,
      key: `0-${nation.id-1}-0`,
    }, {
      title: nation.color,
      key: `0-${nation.id-1}-1`,
    }],
}));
</script>
