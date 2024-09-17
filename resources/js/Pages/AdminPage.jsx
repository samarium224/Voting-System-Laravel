import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import DataTable from "./Admin/DataTable";
import CreateVoter from "./Admin/CreateVoter";
import CandidateDataTable from "./Admin/CandidateDataTable";

export default function AdminPage({ auth }) {
    const { isAdmin } = usePage().props;
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

            <div className="py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-20">
                    <div className="px-2 py-2 uppercase text-xl text-center text-gray-900 dark:text-gray-100">
                        welcome admin
                    </div>
                    <div className="container">
                        <div className="px-2 pt-3 text-md text-left text-gray-900 dark:text-gray-100">
                            currrent candidates
                        </div>
                        <CandidateDataTable />
                    </div>
                    <div className="container">
                        <div className="px-2 pt-3 text-md text-left text-gray-900 dark:text-gray-100">
                            currrent active users
                        </div>
                        <DataTable />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
