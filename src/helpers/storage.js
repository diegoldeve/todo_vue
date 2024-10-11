import { useStorage } from '@vueuse/core';

export function useLocalStorage() {
  const tareas = useStorage('tareas', []);
  
  return {
    tareas
  };
}