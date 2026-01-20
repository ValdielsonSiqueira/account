import { useState } from "react";
import { saveUserProfile } from "@FIAP/util";
import { navigateToUrl } from "single-spa";
import { Button, LoginForm } from "@valoro/ui";

export default function SignUpForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = "Nome é obrigatório";
    if (!email.trim()) {
      newErrors.email = "E-mail é obrigatório";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "E-mail inválido";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    try {
      // Simula delay de rede
      await new Promise((resolve) => setTimeout(resolve, 600));

      const newUser = {
        name,
        email,
        avatar: "https://github.com/shadcn.png", // Avatar padrão
      };

      saveUserProfile(newUser);

      // Despacha evento para atualizar outros microfrontends
      window.dispatchEvent(
        new CustomEvent("userProfileUpdated", { detail: newUser })
      );

      // Redireciona para o dashboard
      navigateToUrl("/dashboard");
    } catch (error) {
      console.error("Erro ao criar conta:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    // Redireciona para login ou limpa o form
    navigateToUrl("/login");
  };

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center md:justify-start">
          <a href="/" className="flex items-center font-medium">
            <img
              src="https://raw.githubusercontent.com/ValdielsonSiqueira/login/21086310dc02009808f6d9f58f8f154fe8493bcd/src/assets/logo-light.svg"
              alt="Logo"
              width={50}
              height={50}
            />
            <span className="text-xl font-bold">Valoro</span>
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm
              title="Crie sua conta"
              subtitle="Comece a gerenciar suas finanças hoje"
              nameLabel="Nome"
              namePlaceholder="Seu nome completo"
              emailLabel="E-mail"
              emailPlaceholder="seu@email.com"
              submitButtonText={isLoading ? "Criando..." : "Criar Conta"}
              isLoading={isLoading}
              errors={errors}
              onSubmit={handleSubmit}
              onChange={(e) => {
                const { id, name: inputName, value } = e.target;
                if (id === "email" || inputName === "email") {
                  setEmail(value);
                  if (errors.email) setErrors({ ...errors, email: null });
                } else if (id === "name" || inputName === "name") {
                  setName(value);
                  if (errors.name) setErrors({ ...errors, name: null });
                }
              }}
            />
            <div className="mt-4 text-center">
              <Button
                variant="outline"
                className="w-full"
                onClick={handleCancel}
                disabled={isLoading}
              >
                Cancelar
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:!block overflow-hidden min-h-full">
        <img
          src="https://raw.githubusercontent.com/ValdielsonSiqueira/login/21086310dc02009808f6d9f58f8f154fe8493bcd/src/assets/placeholder.svg"
          alt="Imagem de login"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    </div>
  );
}
