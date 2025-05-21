import { Link } from "@inertiajs/react";

function PollRoom({ id, name, is_active }) {
    return (
        <Link
            href={is_active ? route("join.room", id) : route("dashboard")}
            className="block rounded-xl border-2 border-gray-100 dark:border-gray-400 bg-white dark:bg-slate-800 hover:shadow-md transition"
        >
            <div className="flex items-start flex-col sm:flex-row gap-4 p-4 sm:p-6 lg:p-8">
                <div>
                    <div className="font-medium sm:text-lg dark:text-gray-200">
                        {name}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                        Status:{" "}
                        <span
                            className={`font-semibold ${
                                is_active ? "text-green-600" : "text-red-600"
                            }`}
                        >
                            {is_active ? "Active" : "Inactive"}
                        </span>
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                        {is_active
                            ? "Click here to join now !"
                            : "Please wait for the admin to make the election active"}
                    </p>
                </div>
            </div>
        </Link>
    );
}

export default PollRoom;
