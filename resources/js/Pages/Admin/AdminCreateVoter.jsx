import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import CreateVoter from "./CreateVoter";

export default function AdminCreateVoter({auth}) {
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
            <div className="py-3">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-20">
                    <CreateVoter/>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
