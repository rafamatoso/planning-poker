import { useState } from "react";

const API_URL = "http://localhost:3001/auth";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleAuth = async () => {
    setError("");

    const endpoint = isLogin ? "/login" : "/register";

    const res = await fetch(`${API_URL}${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (!res.ok) return setError(data.message);

    if (isLogin) {
      localStorage.setItem("token", data.token);
      window.location.href = "/poker";
    } else {
      setIsLogin(true); // Após registro, troca para login
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-2xl">
        <h2 className="text-xl font-bold mb-4 text-center">
          {isLogin ? "Login" : "Registro"}
        </h2>
        {error && <p className="text-red-500 text-center mb-3">{error}</p>}
        <input
          type="text"
          placeholder="Usuário"
          className="w-full p-2 mb-2 border rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          className="w-full p-2 mb-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={handleAuth}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          {isLogin ? "Entrar" : "Registrar"}
        </button>
        <p className="mt-3 text-center text-sm">
          {isLogin ? "Não tem uma conta?" : "Já tem uma conta?"}{" "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-500"
          >
            {isLogin ? "Registre-se" : "Faça login"}
          </button>
        </p>
      </div>
    </div>
  );
}
