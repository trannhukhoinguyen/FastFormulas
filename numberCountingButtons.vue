<template>
<div style="font-weight: 900">
  <span style="margin: 0 12px 12px 0">
      <a-button @click="count">++</a-button>
  </span>
  <span style="margin: 0 0 12px 0">
      <a-input :value="countValue" @pressEnter="pressEnter" style="width: 50%"></a-input>
  </span>
</div>
<div>{{ num }}</div>
<div>
  <a-button @click="subtract">--</a-button>
  <a-button @click="reset">Reset</a-button>
</div>
</template>  
<script setup>
const num = ref(0);
const countValue = ref();
const pressEnter = (e) => {
    console.log('e', e.target.value)
    num.value = e.target.value
    countValue.value = 0
}
const count = () => {
    num.value++
}
const subtract = () => {
    num.value--
}
const reset = () => {
    num.value = 0
}
</script>
