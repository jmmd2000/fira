import type { Route } from "./+types/signup";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useForm, type SubmitHandler } from "react-hook-form";
import { authClient } from "@/app/lib/auth-client";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Signup page" },
    { name: "description", content: "This is a test signup page" },
  ];
}

type SignUpFormInputs = {
  name: string;
  email: string;
  password: string;
  image?: string;
};

const SignUpPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormInputs>();
  const [authError, setAuthError] = useState<string | null>(null);
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<SignUpFormInputs> = async ({
    name,
    email,
    password,
    image,
  }) => {
    setAuthError(null);
    await authClient.signUp.email(
      {
        name,
        email,
        password,
        image,
        callbackURL: "/",
      },
      {
        onRequest: () => {
          // optional: show loading state
        },
        onSuccess: () => {
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
        <h1 className="text-2xl font-bold mb-6 text-center">Sign Up</h1>

        {authError && (
          <div className="mb-4 text-red-600 bg-red-100 p-2 rounded">
            {authError}
          </div>
        )}

        <div className="mb-4">
          <label htmlFor="name" className="block mb-1 font-medium">
            Name
          </label>
          <input
            id="name"
            type="text"
            {...register("name", { required: "Name is required" })}
            disabled={isSubmitting}
            className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring ${
              errors.name ? "border-red-500" : ""
            }`}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

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

        <div className="mb-6">
          <label htmlFor="image" className="block mb-1 font-medium">
            Image URL (optional)
          </label>
          <input
            id="image"
            type="url"
            {...register("image")}
            disabled={isSubmitting}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-2 font-semibold rounded bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50"
        >
          {isSubmitting ? "Signing up…" : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default SignUpPage;
