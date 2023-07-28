import {ref} from 'vue';

let checkedList = ref([]);
const itemsHateTogether = ['hateOthers1', 'hateOthers2', 'hateOthers3', ...];
export const removeItemBeHated = () => {
  if(checkedList.value.filter(item => itemsHateTogether.includes(item)).length >1) {      
    checkedList.value = checkedList.value.filter(item => !itemsHateTogether.includes(item)).concat(checkedList.value[checkedList.value.length-1])
  } else {
    return checkedList.value
  }
}
const handleChange = () => {
  removeItemBeHated();
}
