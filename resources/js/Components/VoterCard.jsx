import { useState } from "react";
import { useForm } from "@inertiajs/react";

export default function VoterCard({
    id,
    name,
    email,
    student_id,
    level,
    canvote,
    onDelete,
}) {
    const [isEligible, setIsEligible] = useState(canvote);

    const { post, delete: destroy, processing } = useForm({});

    // ✅ Toggle voting status
    const handleToggle = (e) => {
        e.preventDefault();

        post(route("user.toggle", { id }), {
            preserveScroll: true,
            onSuccess: () => setIsEligible(!isEligible), // ✅ Update UI on success
        });
    };

    // ✅ Delete voter
    const handleDelete = () => {
        if (!confirm(`Are you sure you want to delete ${name}?`)) return;

        destroy(route("user.delete", { id }), {
            preserveScroll: true,
            onSuccess: () => onDelete(id), // ✅ Remove voter from UI
        });
    };

    return (
        <div className="rounded-xl border-2 border-gray-100 dark:border-gray-400 bg-white dark:bg-slate-800">
            <div className="flex justify-between items-center">
                <div className="flex items-start flex-col sm:flex-row gap-4 p-4 sm:p-6 lg:p-8">
                    <a href="#" className="block shrink-0">
                        <img
                            alt=""
                            src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60"
                            className="size-14 rounded-lg object-cover"
                        />
                    </a>

                    <div>
                        <div className="font-medium sm:text-lg dark:text-gray-200">
                            {name}
                        </div>
                        <p className="text-md text-gray-700 dark:text-gray-300">
                            {student_id}
                        </p>
                        <p className="text-md text-gray-700 dark:text-gray-300">
                            Level: {level}
                        </p>
                        <p
                            className="text-sm text-gray-700 dark:text-gray-300 sm:max-w-[150px] md:truncate"
                            title={email}
                        >
                            {email}
                        </p>

                        <p
                            onClick={handleDelete}
                            className="text-sm text-red-500 underline pt-1 cursor-pointer"
                        >
                            Delete Voter
                        </p>
                    </div>
                </div>

                {/* Toggle Button */}
                <form onSubmit={handleToggle}>
                    <div className="px-6">
                        <label
                            htmlFor={`canvote-${id}`}
                            className={`relative inline-block h-8 w-14 cursor-pointer rounded-full transition ${
                                isEligible ? "bg-green-500" : "bg-red-700"
                            }`}
                        >
                            <input
                                type="checkbox"
                                id={`canvote-${id}`}
                                className="peer sr-only"
                                checked={isEligible}
                                onChange={handleToggle}
                                disabled={processing} // Disable during request
                            />

                            <span className="absolute inset-y-0 start-0 z-10 m-1 inline-flex size-6 items-center justify-center rounded-full bg-white transition-all peer-checked:start-6">
                                {isEligible ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="size-4 text-green-600"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="size-4 text-red-800"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                )}
                            </span>
                        </label>
                    </div>
                </form>
            </div>
        </div>
    );
}
