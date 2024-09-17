import NotificationMsg from "@/Components/NotificationMsg";
import PrimaryButton from "@/Components/PrimaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, usePage } from "@inertiajs/react";

export default function WaitingRoom({ auth }) {

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Vote Result
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-20">
                    <div className="px-2 py-2 uppercase text-xl text-center text-gray-900 dark:text-gray-100">
                        Wait for host to publish the Result
                    </div>
                    <NotificationMsg/>
                    <div className="flex justify-center p-4">
                        <Link href={route("poll.results")}>
                            <PrimaryButton children={"show results"} />
                        </Link>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
