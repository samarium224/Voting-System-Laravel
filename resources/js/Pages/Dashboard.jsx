import Poll from "@/Components/Poll";
import PollRoom from "@/Components/PollRoom";
import PrimaryButton from "@/Components/PrimaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { useState, useEffect } from "react";

export default function Dashboard({ auth }) {
    const [globaldata, setGlobaldata] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchGlobalData = () => {
        setLoading(true);
        fetch("/userEndloadglobalstats")
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
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-20">
                    {auth.user.poll_room == 0 ? (
                        <>
                            <div className="px-2 py-2 uppercase text-xl text-center text-gray-900 dark:text-gray-100">
                                Join Your Election Room
                            </div>

                            {loading ? (
                                <p className="text-gray-500 dark:text-gray-300">
                                    Loading...
                                </p>
                            ) : globaldata.length === 0 ? (
                                <div>
                                    <p className="text-center text-gray-600 dark:text-gray-300 mb-4">
                                        Please wait for the admin to setup
                                        election.
                                    </p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-4">
                                    {globaldata.map((data) => (
                                        <PollRoom
                                            key={data.id}
                                            id={data.id}
                                            name={data.election_name}
                                            is_active={data.is_active}
                                        />
                                    ))}
                                </div>
                            )}
                        </>
                    ) : auth.user.can_vote ? (
                        <>
                            <div className="px-2 py-2 uppercase text-xl text-center text-gray-900 dark:text-gray-100">
                                vote your candidate
                            </div>
                            <Poll />
                        </>
                    ) : (
                        <>
                            <h1 className="dark:text-white text-center lowercase py-10">
                                You have already submitted your vote
                            </h1>
                            <Link
                                href={route("poll.results")}
                                className="flex justify-center ms-4 font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                            >
                                <PrimaryButton children={"show results"} />
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
