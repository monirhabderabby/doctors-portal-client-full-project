import React from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import Loading from "../../Shared/Loading";

const AddDoctor = () => {
    const {
        register,
        formState: { errors },
        handleSubmit,
        reset,
    } = useForm();

    const { data: service, isLoading } = useQuery("servicename", () =>
        fetch("https://desolate-castle-78820.herokuapp.com/services").then((res) => res.json())
    );

    const imgStorageKey = "0181b42a74a0dc0638d21ac92219f0c6";

    const onSubmit = async (data) => {
        const img = data.image[0];
        const formData = new FormData();
        formData.append("image", img);
        fetch(`https://api.imgbb.com/1/upload?key=${imgStorageKey}`, {
            method: "POST",
            body: formData,
        })
            .then((res) => res.json())
            .then((result) => {
                if (result.success) {
                    const img = result?.data?.url;
                    const doctor = {
                        name: data.name,
                        email: data.email,
                        speciality: data.speciality,
                        img: img,
                    };

                    //send to Database

                    fetch("https://desolate-castle-78820.herokuapp.com/doctor", {
                        method: "put",
                        headers: {
                            "content-type": "application/json",
                            authorization: `Bearer ${localStorage.getItem("accessToken")}`
                        },
                        body: JSON.stringify(doctor),
                    })
                        .then((res) => res.json())
                        .then((dbResult) => {
                            console.log(dbResult);
                            if (dbResult.acknowledged) {
                                toast.success("added a doctor successfully!");
                                reset();
                            } else {
                                toast.error(
                                    "Already listed this doctor in server"
                                );
                                reset();
                            }
                        });
                }
            });
    };

    if (isLoading) {
        return <Loading></Loading>;
    }
    return (
        <div>
            <h1 className="text-2xl text-secondary text-center">
                Add a Doctor
            </h1>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="mx-auto sm:max-w-sm md:max-w-md lg:max-w-lg"
            >
                <div class="form-control w-full">
                    <input
                        type="text"
                        class="input input-bordered w-full"
                        placeholder="Enter doctor name"
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
                    <input
                        type="email"
                        class="input input-bordered w-full"
                        placeholder="Enter doctor email"
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
                <select
                    {...register("speciality")}
                    className="select select-bordered input-bordered w-full"
                >
                    {service?.map((name) => (
                        <option value={name.name}>{name.name}</option>
                    ))}
                </select>

                <div class="form-control w-full">
                    <label class="label">
                        <span class="label-text">Photo</span>
                    </label>
                    <input
                        type="file"
                        class="input-bordered w-full"
                        {...register("image", {
                            required: {
                                value: true,
                                message: "Image is required",
                            },
                        })}
                    />
                    <label class="label">
                        {errors.image?.type === "required" && (
                            <span class="label-text-alt text-red-600">
                                {errors.image.message}
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
