import VoteControlCard from "@/Components/VoteControlCard";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, usePage, useForm } from "@inertiajs/react";
import { useState, useEffect } from "react";

export default function AdminCreateCandidates({ auth }) {
    const { isAdmin } = usePage().props;
    const [globaldata, setGlobaldata] = useState([]);
    const [loading, setLoading] = useState(true);

    // ✅ Remove deleted user from UI
    const DeleteVoteController = (voteControllerId) => {
        setGlobaldata(globaldata.filter((globaldata) => globaldata.id !== voteControllerId));
    };

    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("create.control.vote"), {
            onSuccess: () => {
                reset();
                fetchGlobalData(); // refresh the UI
            },
        });
    };

    const fetchGlobalData = () => {
        setLoading(true);
        fetch("/loadglobalstats")
            .then((response) => response.json())
            .then((data) => {
                setGlobaldata(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchGlobalData();
    }, []);

    return (
        <AuthenticatedLayout
            user={auth.user}
            isAdmin={isAdmin}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Admin Dashboard
                </h2>
            }
        >
            <Head title="Admin Dashboard" />

            <div className="py-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow sm:rounded-lg p-6">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                            Voting Control Management
                        </h3>

                        {loading ? (
                            <p className="text-gray-500 dark:text-gray-300">
                                Loading...
                            </p>
                        ) : globaldata.length === 0 ? (
                            <div>
                                <p className="text-center text-gray-600 dark:text-gray-300 mb-4">
                                    No voting controller is active.
                                </p>
                                <form onSubmit={submit}>
                                    <div>
                                        <InputLabel
                                            htmlFor="name"
                                            value="Election Name"
                                        />

                                        <TextInput
                                            id="name"
                                            name="name"
                                            value={data.name}
                                            className="mt-1 block w-full"
                                            autoComplete="name"
                                            isFocused={true}
                                            onChange={(e) =>
                                                setData("name", e.target.value)
                                            }
                                            required
                                        />

                                        <InputError
                                            message={errors.name}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div className="flex items-center justify-end mt-4">
                                        <PrimaryButton
                                            className="ms-4"
                                            disabled={processing}
                                        >
                                            Activate Voting Controller
                                        </PrimaryButton>
                                    </div>
                                </form>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-4">
                                {globaldata.map((data) => (
                                    <VoteControlCard
                                        id={data.id}
                                        name={data.election_name}
                                        total_votes={data.total_votes}
                                        is_active={data.is_active}
                                        onDelete = {DeleteVoteController}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
