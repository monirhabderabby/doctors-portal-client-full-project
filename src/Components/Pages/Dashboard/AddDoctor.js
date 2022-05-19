import React from 'react';
import { useForm } from 'react-hook-form';

const AddDoctor = () => {
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();

    const onSubmit = async (data) => {
        console.log(data);
    };
    return (
        <div>
            <h1 className='text-2xl text-secondary text-center'>Add a Doctor</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="mx-auto sm:max-w-sm md:max-w-md lg:max-w-lg">
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
                                <span class="label-text">Speciality</span>
                            </label>
                            <input
                                type="text"
                                placeholder='Speciality'
                                class="input input-bordered w-full"
                                {...register("speciality", {
                                    required: {
                                        value: true,
                                        message: "Speciality is required",
                                    }
                                })}
                            />
                            <label class="label">
                                {errors.speciality?.type === "required" && (
                                    <span class="label-text-alt text-red-600">
                                        {errors.speciality.message}
                                    </span>
                                )}
                            </label>
                        </div>
                        <input
                            type="submit"
                            value="ADD DOCTOR"
                            className="btn text-white w-full"
                        />
                    </form>
        </div>
    );
};

export default AddDoctor;