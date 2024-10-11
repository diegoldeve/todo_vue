<script setup>
import { computed } from 'vue';

const props = defineProps({
  task: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['update-completada', 'delete-task']);

const truncatedDescription = computed(() => {
  return props.task.descripcion.length > 15
    ? props.task.descripcion.slice(0, 15) + '...'
    : props.task.descripcion;
});
</script>

<template>
  <div class="container" :class="{ container_terminada: task.completada }">
    <div class="left">
      <h3 :class="{ terminada: task.completada }" class="text-white">{{ task.titulo }}</h3>
      <!-- <p>{{ truncatedDescription }}</p> -->
    </div>
    <div class="right">
      <div :class=" task.importancia"></div>
      <button @click="emit('update-completada', !task.completada)">
        {{ task.completada ? 'Marcar como no completada' : 'Marcar como completada' }}
      </button>
        <button @click="emit('delete-task')" class="btn-eliminar">Eliminar</button>
    </div>
  </div>
</template>

<style scoped>
.text-white {
  color: white;
  transition: all ease 0.5s;

}
.container {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10px;
  margin-top: 10px;
  border-radius: 10px;
  gap:100px;
  max-width: 650px;
  border:none;
  background-color: rgba(245, 245, 245, 0.242);
  transition: all ease 0.5s;
}
.container_terminada{
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10px;
  margin-top: 10px;
  border-radius: 10px;
  gap:100px;
  max-width: 650px;
  border:none;
  background-color: rgba(0, 255, 0, 0.342);
  transition: all ease 0.5s;

}
.terminada {
  /* text-decoration: line-through; */
  color:black;
  transition: all ease 0.5s;

}
.right{
  display: flex;
  align-items: center;
  gap:10px;
}
.baja,.media,.alta{
  border-radius: 50%;
  width: 30px;
  height: 30px;
}
.baja{
  background-color: green;
}
.media{
  background-color: yellow;
}
.alta{
  background-color: red;
}
.btn-eliminar{
  background-color: rgba(239, 36, 36, 0.756);
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: all ease 0.5s;
}
.btn-eliminar:hover{
  background-color: rgb(255, 0, 0);
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
}
@media screen and (max-width: 600px) {
  .container {
    flex-direction: column;
    gap:50px;
  }
  
}
</style>