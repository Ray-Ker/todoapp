import { Fragment, useState, useEffect } from "react";
import "./todoapp.css";

function Todoapp() {

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [priority, setPriority] = useState("Nula");

  // Cargar tareas desde el backend
  useEffect(() => {
    fetch("http://localhost:4000/tasks")
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.error("Error al cargar tareas:", err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return alert("Escribe una tarea primero");

    const newTask = { title, description: "", dueDate: date, priority };

    const res = await fetch("http://localhost:4000/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTask),
    });

    const data = await res.json();
    setTasks((prevTasks) => [...prevTasks, data]); // Agregar la nueva tarea a la lista
    setTitle("");
    setDate("");
    setPriority("Nula");
  };

  const handleDelete = async (id) =>{
    if (!confirm("¿Seguro que deseas eliminar esta tarea?"))return;
    try {
        const res = await fetch(`http://localhost:4000/tasks/${id}`,{
            method: "DELETE",
        });

        if(res.ok){
            setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
        }else{
            console.error("Error al eliminar la tarea");
        }
    } catch (err) {
        console.error("Error de conexion al eliminar:", err);
    }
  };

  return (
    <Fragment>
    <header>
        <section className="headerSection withSection">
            <h1>To-do App</h1>
            <button id="blancoBoton">Cerrar Sesion</button>
        </section>
    </header>
    <main className="bodyArticle withSection">
        <article className="mainBody">
            <form className="formSection" onSubmit={handleSubmit}>
                <input
                    id="inputMayor"
                    type="text"
                    placeholder="Escribe tu tarea..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <div className="formGrid">
                    <label htmlFor="date"> <span className="icon">📅</span> Fecha Límite </label>
                    <input
                        type="date"
                        id="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                    <label htmlFor="priority"> <span className="icon">⚠</span> Prioridad </label>
                    <select
                        id="priority"
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                    >
                    <option value="Nula">--Sin especificar--</option>
                    <option value="Alta">Alta</option>
                    <option value="Media">Media</option>
                    <option value="Baja">Baja</option>
                    </select>
                </div>
                <button type="submit" id="inputMayor"> + Agregar </button>
        </form>

        <section className="TaskSection">
        <div className="containtHead">
            <h2>Task List</h2>
        </div>
        <div className="taskContain">
            {tasks.map((task) => (
            <div key={task._id} className="taskItem">
                <div className="formCompleteTask">
                    <p><strong>{task.title}</strong></p>
                    <p className="classGray">Prioridad: {task.priority}</p>
                    <p className="classGray">Fecha límite: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "Sin fecha"}</p>
                </div>
                <button onClick={() => handleDelete(task._id)}>X</button>
            </div>
            ))}
        </div>
        </section>
        </article>
    </main>
    <footer>
        <section className="footerSection withSection"></section>
    </footer>
    </Fragment>
)
  
}

export default Todoapp;