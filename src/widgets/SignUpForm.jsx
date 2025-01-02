import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import PasswordInput from "@components/PasswordInput";
import Spring from "@components/Spring";
import { Fragment } from "react";
import { toast } from "react-toastify";
import classNames from "classnames";
import { useRegisterMutation } from 'api/auth/authApi';
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import { setUser } from '../api/user/userSlice'; 
import { useDispatch } from 'react-redux';

const SignUpSchema = z.object({
  name: z.string().min(1, "Name is required"),
  user_name: z.string().min(1, "Username is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  passwordConfirm: z.string().min(8, "Password confirmation is required"),
}).refine(data => data.password === data.passwordConfirm, {
  message: "Passwords do not match",
  path: ["passwordConfirm"],
});

const SignUpForm = ({ standalone = true }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      name: "",
      user_name: "",
      email: "",
      password: "",
      passwordConfirm: "",
    },
  });

  const [registerMutation, { isLoading }] = useRegisterMutation();
  const Wrapper = standalone ? Fragment : Spring;
  const wrapperProps = standalone ? {} : { className: "card card-padded" };
 
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    try {
      const userData = await registerMutation(data).unwrap();
      dispatch(setUser(userData.data)); 
      toast.success(
        `Account created! Please check your email ${data.email} to confirm your account.`
      );
      navigate("/groups");
    } catch (error) {
      toast.error(`Registration failed: ${error.message}`);
    }
  };
  
  return (
    <Wrapper {...wrapperProps}>
      <div className="d-flex flex-column g-4">
        <h3>Create new account</h3>
        <p className="text-12">
          Fill out the form below to create a new account
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div
          className="d-flex flex-column g-20"
          style={{ margin: "20px 0 30px" }}
        >
          <input
            className={classNames("field", { "field--error": errors.name })}
            type="text"
            placeholder="Name"
            {...register("name")}
          />
          {errors.name && <span>{errors.name.message}</span>}

          <input
            className={classNames("field", { "field--error": errors.user_name })}
            type="text"
            placeholder="Username"
            {...register("user_name")}
          />
          {errors.user_name && <span>{errors.user_name.message}</span>}

          <input
            className={classNames("field", { "field--error": errors.email })}
            type="text"
            placeholder="E-mail"
            {...register("email")}
          />
          {errors.email && <span>{errors.email.message}</span>}

          <Controller
            control={control}
            name="password"
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
          {errors.password && <span>{errors.password.message}</span>}

          <Controller
            control={control}
            name="passwordConfirm"
            render={({ field: { ref, onChange, value }, fieldState: { error } }) => (
              <PasswordInput
                className={classNames("field", { "field--error": error })}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Confirm password"
                innerRef={ref}
              />
            )}
          />
          {errors.passwordConfirm && <span>{errors.passwordConfirm.message}</span>}
        </div>
        <button type="submit" className="btn btn--sm" disabled={isLoading}>
          {isLoading ? 'Creating...' : 'Create account'}
        </button>
      </form>
      <div style={{ marginTop: "20px" }}>
        <p className="text-12">
          Already have an account? <Link to="/sign-in">Sign in</Link>
        </p>
      </div>
    </Wrapper>
  );
};

export default SignUpForm;
