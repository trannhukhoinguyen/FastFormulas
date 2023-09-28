<template>
  <a-table :columns="columns" :data-source="data">
    <template #headerCell="{ column }">
      <template v-if="column.key === 'company'">
        {{column.name}}
      </template>
      <template v-if="column.key === 'c1'">
        <a-select 
          v-model:value="value1" 
          style="width: 100px" 
          :options="options"
          @change="handleChange1"
        />
      </template>
      <template v-if="column.key === 'c2'">
        <a-select 
          v-model:value="value2" 
          style="width: 100px" 
          :options="options"
          @change="handleChange2"
        />
      </template>
      <template v-if="column.key === 'c3'">
        <a-select 
          v-model:value="value3" 
          style="width: 100px" 
          :options="options"
          @change="handleChange3"
        />
      </template>
    </template>

    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'features'">
        {{record.features}}
      </template>
      <template v-if="column.key === 'c1' && record.c1.find(e => e.country === value1)">
        {{record.c1.find(e => e.country === value1).feature}}
      </template>
      <template v-if="column.key === 'c2' && record.c2.find(e => e.country === value2)">
        {{record.c2.find(e => e.country === value2).feature}}
      </template>
      <template v-if="column.key === 'c3' && record.c3.find(e => e.country === value3)">
        {{record.c3.find(e => e.country === value3).feature}}
      </template>
    </template>
  </a-table>
</template>
<script setup>
import { SmileOutlined, DownOutlined } from '@ant-design/icons-vue';
import { defineComponent, ref } from 'vue';
const value1 = ref('australia');
const value2 = ref('vietnam');
const value3 = ref('japan');

const options = [
  {
    value: 'australia',
    label: 'Australia',
  }, 
  {
    value: 'vietnam',
    label: 'Vietnam',
  }, 
  {
    value: 'japan',
    label: 'Japan',
  }, 
  {
    value: 'korea',
    label: 'Korea',
  },
];

const columns = [{
  name: 'Features',
  dataIndex: 'features',
  key: 'features',
}, {
  title: 'Country 1',
  dataIndex: 'c1',
  key: 'c1',
  width: '180px',
}, {
  title: 'Country 2',
  dataIndex: 'c2',
  key: 'c2',
  width: '180px',
}, {
  title: 'Country 3',
  dataIndex: 'c3',
  key: 'c3',  
  width: '180px',
}];

const data = [
{
  key: '1',
  features: 'FPT',
  c1: [
        {country: 'australia', feature: 'Begin FPT'}, 
        {country: 'vietnam', feature: 'Fresh FPT'},
        {country: 'japan', feature: 'Pro FPT'},
        {country: 'korea', feature: 'Master FPT'},
  ],
  c2: [
        {country: 'australia', feature: 'Begin FPT'}, 
        {country: 'vietnam', feature: 'Fresh FPT'},
        {country: 'japan', feature: 'Pro FPT'},
        {country: 'korea', feature: 'Master FPT'},
  ],
  c3: [
        {country: 'australia', feature: 'Begin FPT'}, 
        {country: 'vietnam', feature: 'Fresh FPT'},
        {country: 'japan', feature: 'Pro FPT'},
        {country: 'korea', feature: 'Master FPT'},
  ],
}, 

{
  key: '2',
  features: 'Viettel',
  c1: [
        {country: 'australia', feature: 'Begin Viettel'}, 
        {country: 'vietnam', feature: 'Fresh Viettel'},
        {country: 'japan', feature: 'Pro Viettel'},
        {country: 'korea', feature: 'Master Viettel'},
  ],
  c2: [
        {country: 'australia', feature: 'Begin Viettel'}, 
        {country: 'vietnam', feature: 'Fresh Viettel'},
        {country: 'japan', feature: 'Pro Viettel'},
        {country: 'korea', feature: 'Master Viettel'},
  ],
  c3: [
        {country: 'australia', feature: 'Begin Viettel'}, 
        {country: 'vietnam', feature: 'Fresh Viettel'},
        {country: 'japan', feature: 'Pro Viettel'},
        {country: 'korea', feature: 'Master Viettel'},
  ],
}, 

{
  key: '3',
  features: 'Mobiphone',
  c1: [
        {country: 'australia', feature: 'Begin Mobiphone'}, 
        {country: 'vietnam', feature: 'Fresh Mobiphone'},
        {country: 'japan', feature: 'Pro Mobiphone'},
        {country: 'korea', feature: 'Master Mobiphone'},
  ],
  c2: [
        {country: 'australia', feature: 'Begin Mobiphone'}, 
        {country: 'vietnam', feature: 'Fresh Mobiphone'},
        {country: 'japan', feature: 'Pro Mobiphone'},
        {country: 'korea', feature: 'Master Mobiphone'},
  ],
  c3: [
        {country: 'australia', feature: 'Begin Mobiphone'}, 
        {country: 'vietnam', feature: 'Fresh Mobiphone'},
        {country: 'japan', feature: 'Pro Mobiphone'},
        {country: 'korea', feature: 'Master Mobiphone'},
  ],
},
];
</script>
