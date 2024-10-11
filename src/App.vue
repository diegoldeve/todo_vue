<script setup>
import { ref } from 'vue';
import Task from './components/Task.vue';
import { useLocalStorage } from './helpers/storage.js';

const { tareas } = useLocalStorage();

const newTaskTitle = ref('');
const newTaskDescription = ref('');
const newTaskImportance = ref(null);
const newTaskColor = ref('');
const newTaskCompleted = ref(false);
const showModal = ref(false);

const addTask = () => {
  if (newTaskTitle.value.trim() !== '') {
    tareas.value.push({
      titulo: newTaskTitle.value,
      descripcion: newTaskDescription.value,
      importancia: newTaskImportance.value,
      // color: newTaskColor.value,
      completada: newTaskCompleted.value,
    });
    newTaskTitle.value = '';
    newTaskDescription.value = '';
    newTaskImportance.value = null;
    // newTaskColor.value = '';
    newTaskCompleted.value = false;
    showModal.value = false;
  }
};

const updateCompletada = (index, completada) => {
  tareas.value[index].completada = completada;
};

const deleteTask = (index) => {
  tareas.value.splice(index, 1);
};

</script>

<template>
  <div :class="{ contenedor: true }">
    <div v-if="tareas.length === 0">
      <p class="text-white-italic">No hay tareas</p>
    </div>
    <div v-else>
      <b class="text-white">TOTAL DE TAREAS: {{ tareas.length }}</b>
      <br>
      <b class="text-white-italic">Filtrar por:</b>
      <div class="task-container" >
        <div v-for="(task, index) in tareas" :key="index" >
          <Task 
            :task="task" 
            @update-completada="updateCompletada(index, $event)" 
            @delete-task="deleteTask(index)" 
          />
        </div>
      </div>
    </div>
  </div>
  <!-- imagen para mostrar el modal -->
  <div class="white-circle add" @click="showModal = !showModal">
    <img src="./assets/plus2.png" alt="Agregar tarea" width="50" height="50">
  </div>
  <!-- Modal -->
  <div v-if="showModal" class="modal">
    <div class="modal-content">
      <button @click="showModal = !showModal" class="close">X</button>
      <h2>Agregar tarea</h2>
      <input type="text" v-model="newTaskTitle" placeholder="Nombre de la tarea *" class="input">
      <input type="text" v-model="newTaskDescription" placeholder="Descripción (opcional)" class="input">
      <h3 style="color:black; font-weight: 300;">Selecciona la importancia (opcional)</h3>
      <select v-model="newTaskImportance" id="importancia" class="select">
        <option value="" selected disabled>--Selecciona</option>
        <option value="baja">No es muy importante</option>
        <option value="media">Medio importante</option>
        <option value="alta">Muy importante</option>
      </select>
      <!-- <input type="color" v-model="newTaskColor" placeholder="Color" class="input"> -->
      <button @click="addTask" class="button">Añadir</button>
    </div>
  </div>
</template>

<style scoped>
.task-container{
  /* border:1px solid black; */
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  border-radius: 5px; 
  padding: 20px;
  margin: 10px;
  
}
.white-circle {
  width: 75px;
  height: 75px;
  background-color: white;
  border-radius: 50%;
  position: fixed;
  bottom: 0;
  right: 0;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}
.add {
  cursor: pointer;
}

.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  display: flex;
  gap: 20px;
  flex-direction: column;
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  width: 300px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  position: relative; /* Asegura que los elementos posicionados absolutamente estén dentro de este contenedor */
}
.text-white {
  color: white;
}
.text-white-italic {
  font-family: "Poppins", sans-serif;
  font-weight: 300;
  font-style: italic;
  color: white;
}
.close {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  color: black;
}
.modal-content input {
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
}
</style>