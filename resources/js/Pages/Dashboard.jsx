import Poll from "@/Components/Poll";
import PrimaryButton from "@/Components/PrimaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function Dashboard({ auth }) {
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
                    <div className="px-2 py-2 uppercase text-xl text-center text-gray-900 dark:text-gray-100">
                        vote your candidate
                    </div>
                    {auth.user.can_vote ? (
                        <Poll />
                    ) : (
                        <>
                            <h1 className="dark:text-white text-center lowercase py-10">
                                You have already submitted your vote
                            </h1>
                            <Link
                                href={route("poll.results")}
                                className="flex justify-center ms-4 font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                            >
                                <PrimaryButton children={"show results"}/>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
