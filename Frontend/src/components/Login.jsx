import { useState } from 'react';
import { Check } from 'lucide-react';
import { login, register } from '../services/api-service';
import './Login.css';

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setError('');
    const { username, password } = formData;

    if (!username || !password) {
      setError('Por favor completa todos los campos');
      return;
    }

    if (username.length < 3) {
      setError('El usuario debe tener al menos 3 caracteres');
      return;
    }

    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    setLoading(true);

    try {
      let response;
      
      if (isRegistering) {
        response = await register(username, password);
      } else {
        response = await login(username, password);
      }

      if (response.success) {
        onLogin(response.user);
        setFormData({ username: '', password: '' });
      }
    } catch (err) {
      setError(err.message || 'Ocurrió un error');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !loading) {
      handleSubmit();
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="login-icon">
            <Check size={32} />
          </div>
          <h1 className="login-title">Todo List</h1>
          <p className="login-subtitle">Organiza tus pendientes fácilmente</p>
        </div>

        <div className="login-form">
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <div className="form-group">
            <label className="form-label">Usuario</label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              onKeyPress={handleKeyPress}
              className="form-input"
              placeholder="Ingresa tu usuario"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Contraseña</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              onKeyPress={handleKeyPress}
              className="form-input"
              placeholder="Ingresa tu contraseña"
              disabled={loading}
            />
          </div>

          <button 
            onClick={handleSubmit} 
            className="btn-primary"
            disabled={loading}
          >
            {loading ? 'Cargando...' : (isRegistering ? 'Registrarse' : 'Iniciar Sesión')}
          </button>
        </div>

        <button
          onClick={() => {
            setIsRegistering(!isRegistering);
            setError('');
          }}
          className="btn-toggle"
          disabled={loading}
        >
          {isRegistering ? '¿Ya tienes cuenta? Inicia sesión' : '¿No tienes cuenta? Regístrate'}
        </button>
      </div>
    </div>
  );
};

export default Login;