import axios from 'axios';

const API_URL = "http://localhost:4000/api";

// Crear instancia de axios
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor para agregar token a las peticiones
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Funciones de autenticación
export const register = async (username, password) => {
  try {
    const response = await api.post('/auth/register', { username, password });
    if (response.data.success) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error al registrar' };
  }
};

export const login = async (username, password) => {
  try {
    const response = await api.post('/auth/login', { username, password });
    if (response.data.success) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error al iniciar sesión' };
  }
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

// Funciones de Todos
export const getTodos = async () => {
  try {
    const response = await api.get('/tasks');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error al obtener tareas' };
  }
};

export const createTodo = async (todoData) => {
  try {
    const response = await api.post('/tasks', todoData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error al crear tarea' };
  }
};

export const updateTodo = async (id, updates) => {
  try {
    const response = await api.put(`/tasks/${id}`, updates);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error al actualizar tarea' };
  }
};

export const deleteTodo = async (id) => {
  try {
    const response = await api.delete(`/tasks/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error al eliminar tarea' };
  }
};

export default api;