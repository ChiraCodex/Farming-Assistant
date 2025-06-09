import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z, ZodType } from "zod";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  contacts: string;
  password: string;
  confirmPassword: string;
};

function SignUp() {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const schema: ZodType<FormData> = z
    .object({
      firstName: z
        .string()
        .min(2, "First name must be at least 2 characters")
        .max(30),
      lastName: z
        .string()
        .min(2, "Last name must be at least 2 characters")
        .max(30),
      email: z.string().email("Please enter a valid email"),
      contacts: z
        .string()
        .regex(/^\d{10,15}$/, "Invalid phone number (10-15 digits)"),
      password: z
        .string()
        .min(5, "Password must be at least 5 characters")
        .max(15),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  function getUsernameFromEmail(email: string): string {
    return email.split('@')[0];
  }

  const submitData = async (data: FormData) => {
    setError(null);
    try {
      const { confirmPassword, ...userData } = data;
      const username = getUsernameFromEmail(userData.email);
      console.log("Username from email:", username);
      // Optionally, you can add username to userData if your backend expects it:
      await axios.post("http://localhost:5000/api/register", { ...userData, username }, {
        timeout: 5000,
        headers: {"Content-Type": "application/json"}
      });
      reset();
      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error);

      if (axios.isAxiosError(error)) {
        if (error.code === "ERR_NETWORK") {
          setError("Cannot connect to server. Please try again later.");
        } else if (error.response) {
          setError(error.response.data?.message || "Registration failed.");
        } else {
          setError("An unknown error occurred.");
        }
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <>
    <div className="flex justify-center px-4 sm:px-8">
      <form
        onSubmit={handleSubmit(submitData)}
        className="w-full max-w-4xl sm:w-2/3 lg:w-1/2 border-4 py-8 px-6 rounded-3xl"
      >
        <h2 className="text-center text-2xl">Sign Up Form</h2>
        <p className="text-center text-xs mb-8">
          Please fill in all details correctly.
        </p>

        {error && (
          <div className="mb-4 p-2 text-xs text-[red] rounded text-center">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label>First Name</label>
            <input
              {...register("firstName")}
              className="bg-springBeige text-black rounded-xl px-2 py-2"
              type="text"
            />
            {errors.firstName && (
              <span className="text-[red] text-xs">
                {errors.firstName.message}
              </span>
            )}
          </div>

          <div className="flex flex-col">
            <label>Last Name</label>
            <input
              {...register("lastName")}
              className="bg-springBeige text-black rounded-xl px-2 py-2"
              type="text"
            />
            {errors.lastName && (
              <span className="text-[red] text-xs">
                {errors.lastName.message}
              </span>
            )}
          </div>

          <div className="flex flex-col">
            <label>Email</label>
            <input
              {...register("email")}
              className="bg-springBeige text-black rounded-xl px-2 py-2"
              type="email"
            />
            {errors.email && (
              <span className="text-[red] text-xs">
                {errors.email.message}
              </span>
            )}
          </div>

          <div className="flex flex-col">
            <label>Enter Phone Number</label>
            <input
              {...register("contacts")}
              className="bg-springBeige text-black rounded-xl px-2 py-2"
              type="text"
            />
            {errors.contacts && (
              <span className="text-[red] text-xs">
                {errors.contacts.message}
              </span>
            )}
          </div>

          <div className="flex flex-col">
            <label>Create Password</label>
            <input
              {...register("password")}
              className="bg-springBeige text-black rounded-xl px-2 py-2"
              type="password"
            />
            {errors.password && (
              <span className="text-[red] text-xs">
                {errors.password.message}
              </span>
            )}
          </div>

          <div className="flex flex-col">
            <label>Confirm Password</label>
            <input
              {...register("confirmPassword")}
              className="bg-springBeige text-black rounded-xl px-2 py-2"
              type="password"
            />
            {errors.confirmPassword && (
              <span className="text-[red] text-xs">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>
        </div>

        <div className="flex justify-center mt-16 ">
          <button
            type="submit"
            className="bg-someBrown px-4 py-4 rounded-xl text-lg font-semibold w-full hover:bg-neonGreen hover:text-jungleGreen"
          >
            Sign Up
          </button>
        </div>

        <p className="text-center text-sm mt-10">
          Already have an account?{" "}
          <Link to="/login" className="text-neonGreen hover:underline">
            Login
          </Link>
        </p>
      </form>
      
    </div>
    
    </>
  );
}

export default SignUp;
