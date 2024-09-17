import React, { useEffect, useState } from "react";

export default function DataTable() {
    // Step 1: Set up state to hold user data
    const [users, setUsers] = useState([]);

    // Step 2: Fetch users from backend using useEffect
    useEffect(() => {
        fetch("/users") // Replace with the correct route for your Laravel backend
            .then((response) => response.json())
            .then((data) => setUsers(data))
            .catch((error) =>
                console.error("Error fetching users:", error)
            );

        return () => {
            // Optional cleanup if needed
        };
    }, []);

    return (
        <div className="mt-3 overflow-x-auto rounded-lg border dark:text-white border-gray-200 dark:border-gray-800">
            <table className="min-w-full divide-y-2 divide-gray-200 dark:text-white dark:divide-gray-600 bg-white dark:bg-slate-800 text-sm">
                <thead>
                    <tr>
                        <th className="px-4 py-2 font-medium text-gray-900 dark:text-gray-300">Name</th>
                        <th className="px-4 py-2 font-medium text-gray-900 dark:text-gray-300">Student ID</th>
                        <th className="px-4 py-2 font-medium text-gray-900 dark:text-gray-300">Email</th>
                        <th className="px-4 py-2 font-medium text-gray-900 dark:text-gray-300">Can Vote</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 text-center">
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td className="px-4 py-2">{user.name}</td>
                            <td className="px-4 py-2">{user.student_id}</td>
                            <td className="px-4 py-2">{user.email}</td>
                            <td className="px-4 py-2">{user.can_vote ? "Yes" : "No"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
