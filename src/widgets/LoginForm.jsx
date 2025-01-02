import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate, NavLink } from "react-router-dom";
import PasswordInput from "@components/PasswordInput";
import BasicCheckbox from "@ui/BasicCheckbox";
import ResetPasswordPopup from "@components/ResetPasswordPopup";
import classNames from "classnames";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useLoginMutation } from 'api/auth/authApi';
import { useDispatch } from 'react-redux';
import { setUser } from '../api/user/userSlice'; 

const LoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

const LoginForm = () => {
  const [open, setOpen] = useState(false);
  const [loginMutation, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors }, control } = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const userData = await loginMutation(data).unwrap();
      dispatch(setUser(userData.data)); 
      toast.success(`Logged in successfully! Welcome back, ${userData?.data?.name}.`, {
        position: "top-right",
        autoClose: 3000,
      });
      navigate("/groups");
    } catch (error) {
      toast.error(`Login failed: ${error.message}`, {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    setOpen(true);
  };

  return (
    <>
      <h1>Account login</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="d-flex flex-column g-10" style={{ margin: "20px 0 30px" }}>
          <div className="d-flex flex-column g-20">
            <input
              className={classNames("field", { "field--error": errors.email })}
              type="text"
              placeholder="Login"
              {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
            />
            <Controller
              control={control}
              name="password"
              rules={{ required: true }}
              render={({ field: { ref, onChange, value }, fieldState: { error } }) => (
                <PasswordInput
                  className={classNames("field", { "field--error": error })}
                  value={value}
                  onChange={(e) => onChange(e.target.value)}
                  placeholder="Password"
                  innerRef={ref}
                />
              )}
            />
          </div>
          <div className="d-flex align-items-center g-10">
            <Controller
              control={control}
              name="rememberMe"
              render={({ field: { ref, onChange, value } }) => (
                <BasicCheckbox
                  id="rememberMe"
                  checked={value}
                  onChange={(e) => onChange(e.target.checked)}
                  innerRef={ref}
                />
              )}
            />
            <label htmlFor="rememberMe">Remember me</label>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <button className="btn btn--sm" type="submit">
            Submit
          </button>
          <button className="text-button text-button--sm" onClick={handleResetPassword}>
            Reset password
          </button>
        </div>
      </form>
      <div className="d-flex justify-content-center" style={{ marginTop: "10px" }}>
        <p className="text-12">
          Don't have an account?{" "}
          <NavLink to="/sign-up" className="text-link text-decoration-underline">
            Create an account
          </NavLink>
        </p>
      </div>
      <ResetPasswordPopup open={open} onClose={() => setOpen(false)} />
      <ToastContainer />
    </>
  );
};

export default LoginForm;
