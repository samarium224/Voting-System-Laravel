import { useState } from "react";
import { useForm } from "@inertiajs/react";

function VoteControlCard({ id, name, total_votes, is_active, onDelete }) {
    const [isActive, setIsActive] = useState(is_active);

    const { post, delete: destroy, processing } = useForm({});

    // ✅ Toggle voting status
    const handleToggle = (e) => {
        e.preventDefault();

        post(route("vote.toggle", { id }), {
            preserveScroll: true,
            onSuccess: () => setIsActive(!isActive), // ✅ Update UI on success
        });
    };

    // ✅ Delete voter
    const handleDelete = () => {
        if (
            !confirm(`Are you sure you want to delete voting controller ${id}?`)
        )
            return;

        destroy(route("vote.delete", { id }), {
            preserveScroll: true,
            onSuccess: () => onDelete(id), // ✅ Remove voter from UI
        });
    };

    return (
        <div className="flex justify-between items-center bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow">
            <div key={id}>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                    Controller Name:{" "}
                    <span className="font-semibold text-gray-800 dark:text-white">
                        {name}
                    </span>
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                    Controller ID:{" "}
                    <span className="font-semibold text-gray-800 dark:text-white">
                        {id}
                    </span>
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                    Total Votes:{" "}
                    <span className="font-semibold text-gray-800 dark:text-white">
                        {total_votes}
                    </span>
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                    Status:{" "}
                    <span
                        className={`font-semibold ${
                            isActive ? "text-green-600" : "text-red-600"
                        }`}
                    >
                        {isActive ? "Active" : "Inactive"}
                    </span>
                </p>

                <p
                    onClick={handleDelete}
                    className="text-sm text-red-500 my-3 underline pt-1 cursor-pointer"
                >
                    Delete Vote Controller
                </p>
            </div>

            {/* Toggle Button */}
            <form onSubmit={handleToggle}>
                <div className="px-6">
                    <label
                        htmlFor={`canvote-${id}`}
                        className={`relative inline-block h-8 w-14 cursor-pointer rounded-full transition ${
                            isActive ? "bg-green-500" : "bg-red-700"
                        }`}
                    >
                        <input
                            type="checkbox"
                            id={`canvote-${id}`}
                            className="peer sr-only"
                            checked={isActive}
                            onChange={handleToggle}
                            disabled={processing} // Disable during request
                        />

                        <span className="absolute inset-y-0 start-0 z-10 m-1 inline-flex size-6 items-center justify-center rounded-full bg-white transition-all peer-checked:start-6">
                            {isActive ? (
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
    );
}

export default VoteControlCard;
