import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z, ZodType } from "zod";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import Footer from "../footer/Footer";
import { useUser } from "@clerk/clerk-react";

type LoginFormData = {
  email: string;
  password: string;
};

function Login() {
  const { user } = useUser();
  
  const [serverError, setServerError] = useState("");

  const schema: ZodType<LoginFormData> = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(5, { message: "Password must be at least 5 characters" }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(schema),
  });

  const submitData = async (data: LoginFormData) => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth", data);
      localStorage.setItem("token", res.data.token);
      window.location.href = "/";
    } catch (error: any) {
      console.error("Login error:", error);
      if (error.response && error.response.data?.error) {
        setServerError(error.response.data.error);
      } else {
        setServerError("Something went wrong. Please try again.");
      }
    }
  };

  function getUsernameFromEmail(email: string): string {
    return email.split('@')[0];
  }

  return (
    <>
    <div className="flex justify-center">
      <form
        onSubmit={handleSubmit(submitData)}
        className="w-full max-w-sm border-4 py-8 px-6 rounded-3xl"
      >
        
        <p className="text-center text-2xl  text-someBrown  capitalize">
          Welcome Back, 
          <span className="text-neonGreen/50 font-bold">{" "}{user?.emailAddresses[0]?.emailAddress && getUsernameFromEmail(user.emailAddresses[0].emailAddress)}</span>
        </p>
        <p className="text-center text-sm mb-6"> Login to Continue</p>

        {serverError && (
          <div className="bg-red-100 text-red-700 text-sm p-2 rounded mb-4 text-center">
            {serverError}
          </div>
        )}

        <div className="flex flex-col mb-4">
          <label className="font-medium mb-1">Email</label>
          <input
            {...register("email")}
            type="email"
            className="bg-springBeige text-black rounded-xl px-3 py-2 border focus:outline-none focus:ring"
          />
          {errors.email && (
            <span className="text-[red] text-sm mt-1">{errors.email.message}</span>
          )}
        </div>

        <div className="flex flex-col mb-6">
          <label className="font-medium mb-1">Password</label>
          <input
            {...register("password")}
            type="password"
            className="bg-springBeige text-black rounded-xl px-3 py-2"
          />
          {errors.password && (
            <span className="text-[red] text-sm mt-1">{errors.password.message}</span>
          )}
        </div>

        <button
          type="submit"
          className=" bg-someBrown py-2 rounded-xl font-semibold w-full hover:bg-neonGreen hover:text-jungleGreen"
        >
          Login
        </button>

        <p className="text-center text-sm mt-6">
          Don’t have an account?{" "}
          <Link to="/sign-up" className="text-neonGreen hover:underline">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
    <Footer/>
    </>
  );
}

export default Login;

