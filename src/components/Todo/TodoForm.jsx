import { useState } from 'react';
import { Plus, Calendar, AlertCircle } from 'lucide-react';
import './TodoForm.css';

const TodoForm = () => {
    return (
        <div className="todo-form-container">
            <input 
                type="text" 
                className="form-input" 
                placeholder="¿Qué necesitas hacer?"
            />

        <div className="form-row">
            <div className="form-field">
            <label className="field-label">
                <span className="icon">📅</span>
                Fecha límite
            </label>
            <input type="date" className="date-input" />
            </div>

            <div className="form-field">
            <label className="field-label">
                <span className="icon">⚠️</span>
                Prioridad
            </label>
            <select className="priority-select">
                <option value="baja">Baja</option>
                <option value="media">Media</option>
                <option value="alta">Alta</option>
            </select>
            </div>
        </div>

        <button className="btn-add-todo">
            Agregar Pendiente
        </button>
        </div>
    );
};

export default TodoForm;