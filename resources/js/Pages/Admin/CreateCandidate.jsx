import { useEffect } from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";

export default function CreateCandidate() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        details: "",
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("store.candidate"));
    };

    return (
        <>
            <p className="py-5 text-center uppercase dark:text-white mt-5">
                create new candidate
            </p>
            <div className="px-3 sm:px-3 md:px-6 lg:px-10 py-5 border rounded-md dark:bg-slate-800 dark:border-slate-800">
                <form onSubmit={submit}>
                    <div>
                        <InputLabel htmlFor="name" value="Name" />

                        <TextInput
                            id="name"
                            name="name"
                            value={data.name}
                            className="mt-1 block w-full"
                            autoComplete="name"
                            isFocused={true}
                            onChange={(e) => setData("name", e.target.value)}
                            required
                        />

                        <InputError message={errors.name} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="details" value="Details" />

                        <TextInput
                            id="details"
                            type="text"
                            name="details"
                            value={data.details}
                            className="mt-1 block w-full"
                            autoComplete="details"
                            onChange={(e) =>
                                setData("details", e.target.value)
                            }
                            required
                        />

                        <InputError
                            message={errors.details}
                            className="mt-2"
                        />
                    </div>

                    <div className="flex items-center justify-end mt-4">
                        <PrimaryButton className="ms-4" disabled={processing}>
                            Register
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </>
    );
}
