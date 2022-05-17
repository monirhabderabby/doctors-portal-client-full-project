import React from "react";
import { useForm } from "react-hook-form";
import Loading from "../../Shared/Loading";
import { Link, useNavigate, useLocation } from "react-router-dom";
import auth from "../../../firebase.init";
import {
    useCreateUserWithEmailAndPassword,
    useSignInWithGoogle,
    useUpdateProfile,
} from "react-firebase-hooks/auth";

const Signup = () => {
    const [signInWithGoogle, GUser, GLoading, GError] =
        useSignInWithGoogle(auth);
    const [createUserWithEmailAndPassword, user, loading, error] =
        useCreateUserWithEmailAndPassword(auth);

    const [updateProfile, updating, updateError] = useUpdateProfile(auth);
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();

    let signInError;
    let navigate = useNavigate();
    let location = useLocation();
    let from = location.state?.from?.pathname || "/appoinment";

    if (loading || GLoading || updating) {
        return <Loading></Loading>;
    }
    if (error || GError || updateError) {
        signInError = (
            <p>{error?.message || GError?.message || updateError?.message}</p>
        );
    }

    if (GUser || user) {
        navigate(from, { replace: true });
    }
    const handleGoogleLogin = async () => {
        await signInWithGoogle();
    };
    const onSubmit = async (data) => {
        await createUserWithEmailAndPassword(data.email, data.password);
        await updateProfile({ displayName: data.name });
    };
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="card w-96 sm:max-w-sm bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="text-2xl">SignUp</h2>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div class="form-control w-full">
                            <label class="label">
                                <span class="label-text">Name</span>
                            </label>
                            <input
                                type="text"
                                class="input input-bordered w-full"
                                {...register("name", {
                                    required: {
                                        value: true,
                                        message: "Name is required",
                                    },
                                })}
                            />
                            <label class="label">
                                {errors.name?.type === "required" && (
                                    <span class="label-text-alt text-red-600">
                                        {errors.name.message}
                                    </span>
                                )}
                            </label>
                        </div>

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
                            value="SIGNUP"
                            className="btn text-white w-full"
                        />
                    </form>
                    <p>
                        Already have an account??{" "}
                        <Link to="/login" className="text-secondary">
                            Login
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

export default Signup;
