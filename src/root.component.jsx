import { useEffect, useState } from "react";
import "./index.css";
import { getUserProfile } from "@FIAP/util";
import SignUpForm from "./components/SignUpForm";

export default function Root(props) {
  const [user, setUser] = useState(() => getUserProfile());

  useEffect(() => {
    const handler = (event) => {
      setUser(event.detail);
    };

    window.addEventListener("userProfileUpdated", handler);
    return () => window.removeEventListener("userProfileUpdated", handler);
  }, []);

  if (!user) {
    return <SignUpForm />;
  }

  // Se já tem usuário, mostra detalhes da conta (placeholder)
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50/50 p-4">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-sm border text-center space-y-4">
        <h2 className="text-2xl font-bold">Minha Conta</h2>
        <div className="flex justify-center">
          <img
            src={user.avatar}
            alt={user.name}
            className="h-24 w-24 rounded-full border-4 border-gray-100"
          />
        </div>
        <div>
          <h3 className="text-xl font-medium">{user.name}</h3>
          <p className="text-gray-500">{user.email}</p>
        </div>
        <div className="pt-4 border-t">
          <p className="text-sm text-gray-500">Você já está logado.</p>
        </div>
      </div>
    </div>
  );
}
