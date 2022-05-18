import React, { useEffect } from "react";
import {
    useSignInWithEmailAndPassword,
    useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import auth from "../../../firebase.init";
import { useForm } from "react-hook-form";
import Loading from "../../Shared/Loading";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useToken from "../../../Hooks/useToken";

const Login = () => {
    const [signInWithGoogle, GUser, GLoading, GError] =
        useSignInWithGoogle(auth);
    const [signInWithEmailAndPassword, user, loading, error] =
        useSignInWithEmailAndPassword(auth);
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();
    const [token] = useToken(user || GUser);
    let signInError;

    let navigate = useNavigate();
    let location = useLocation();
    let from = location.state?.from?.pathname || "/";

    if (loading || GLoading) {
        return <Loading></Loading>;
    }
    if (error || GError) {
        signInError = <p>{error?.message || GError?.message}</p>;
    }
    if (token) {
        navigate(from, { replace: true });
    }

    const handleGoogleLogin = async () => {
        await signInWithGoogle();
    };
    const onSubmit = (data) => {
        signInWithEmailAndPassword(data.email, data.password);
    };
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="card w-96 sm:max-w-sm bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="text-2xl">Login</h2>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div class="form-control w-full">
                            <label class="label">
                                <span class="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                class="input input-bordered w-full"
                                {...register("email", {
                                    required: {
                                        value: true,
                                        message: "Email is required",
                                    },
                                    pattern: {
                                        value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                                        message: "error message", // JS only: <p>error message</p> TS only support string
                                    },
                                })}
                            />
                            <label class="label">
                                {errors.email?.type === "required" && (
                                    <span class="label-text-alt text-red-600">
                                        {errors.email.message}
                                    </span>
                                )}
                                {errors.email?.type === "pattern" && (
                                    <span class="label-text-alt text-red-600">
                                        {errors.email.message}
                                    </span>
                                )}
                            </label>
                        </div>
                        <div class="form-control w-full">
                            <label class="label">
                                <span class="label-text">Password</span>
                            </label>
                            <input
                                type="password"
                                class="input input-bordered w-full"
                                {...register("password", {
                                    required: {
                                        value: true,
                                        message: "Password is required",
                                    },
                                    minLength: {
                                        value: 6,
                                        message:
                                            "Must be 6 characters or longer",
                                    },
                                })}
                            />
                            <label class="label">
                                {errors.password?.type === "required" && (
                                    <span class="label-text-alt text-red-600">
                                        {errors.password.message}
                                    </span>
                                )}
                                {errors.password?.type === "minLength" && (
                                    <span class="label-text-alt text-red-600">
                                        {errors.password.message}
                                    </span>
                                )}
                            </label>
                        </div>
                        <small className="text-red-600">{signInError}</small>
                        <input
                            type="submit"
                            value="LOGIN"
                            className="btn text-white w-full"
                        />
                    </form>
                    <p>
                        New to doctors portal?{" "}
                        <Link to="/signup" className="text-secondary">
                            Create new account
                        </Link>
                    </p>

                    <div className="divider">OR</div>
                    <button
                        onClick={handleGoogleLogin}
                        className="btn btn-outline"
                    >
                        Continue with Google
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;
