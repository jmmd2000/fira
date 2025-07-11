import type { Route } from "./+types/login";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useForm, type SubmitHandler } from "react-hook-form";
import { authClient } from "@/app/lib/auth-client";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Login page" },
    { name: "description", content: "User login page" },
  ];
}

type LoginFormInputs = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormInputs>();
  const [authError, setAuthError] = useState<string | null>(null);
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<LoginFormInputs> = async ({
    email,
    password,
  }) => {
    setAuthError(null);

    await authClient.signIn.email(
      { email, password, callbackURL: "/" },
      {
        onRequest: () => {
          // optional: show loading indicator
        },
        onSuccess: ctx => {
          console.log("Logged in user details:", ctx);
          navigate("/");
        },
        onError: ctx => {
          setAuthError(ctx.error.message);
        },
      }
    );
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md bg-neutral-800 p-8 rounded-lg shadow"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">Log In</h1>

        {authError && (
          <div className="mb-4 text-red-600 bg-red-100 p-2 rounded">
            {authError}
          </div>
        )}

        <div className="mb-4">
          <label htmlFor="email" className="block mb-1 font-medium">
            Email
          </label>
          <input
            id="email"
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email address",
              },
            })}
            disabled={isSubmitting}
            className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring ${
              errors.email ? "border-red-500" : ""
            }`}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block mb-1 font-medium">
            Password
          </label>
          <input
            id="password"
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: { value: 8, message: "Minimum 8 characters" },
            })}
            disabled={isSubmitting}
            className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring ${
              errors.password ? "border-red-500" : ""
            }`}
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-2 font-semibold rounded bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50"
        >
          {isSubmitting ? "Logging in…" : "Log In"}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
