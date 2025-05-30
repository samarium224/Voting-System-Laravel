import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import VoteResult from "@/Components/VoteResult";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, usePage } from "@inertiajs/react";

export default function VoteResultPage({ auth }) {
    const { candidates_info, app_status, error } = usePage().props;

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
                        Results
                    </div>

                    <InputError
                        message={error}
                        className="mt-2"
                    />

                    <VoteResult
                        candidates_info={candidates_info}
                        totalvotes={app_status.total_votes}
                    />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
