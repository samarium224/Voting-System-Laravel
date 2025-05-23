import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import VoterCard from "@/Components/VoterCard";
import { Link } from "@inertiajs/react";
import React, { useEffect, useState } from "react";

export default function DataTable() {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    let search_value;
    const [levelFilter, setLevelFilter] = useState(""); // For level filter input

    useEffect(() => {
        fetch("/users") // Replace with your Laravel backend API route
            .then((response) => response.json())
            .then((data) => {
                setUsers(data);
                setFilteredUsers(data); // Initialize with all users
            })
            .catch((error) => console.error("Error fetching users:", error));
    }, []);

    // Function to truncate text
    const truncateText = (text, maxLength) => {
        return text.length > maxLength
            ? text.substring(0, maxLength) + "..."
            : text;
    };

    // ✅ Remove deleted user from UI
    const handleDeleteUser = (userId) => {
        setUsers(users.filter((user) => user.id !== userId));
        setFilteredUsers(filteredUsers.filter((user) => user.id !== userId)); // Also filter from the displayed list
    };

    // Search filter functionality
    const handleSearchChange = (event) => {
        // setSearchTerm(event.target.value);
        search_value = event.target.value;
        console.log(search_value);
        handleFilter(search_value);
    };

    // Level filter functionality (real-time with buttons)
    const handleLevelFilter = (level) => {
        setLevelFilter(level);
        handleFilter(level);
    };

    // Apply filters and search
    const handleFilter = (value_) => {
        let filtered = users;

        // Apply search filter
        if (value_ != "") {
            filtered = filtered.filter((user) =>
                user.name.toLowerCase().includes(value_.toLowerCase())
            );
        }

        setFilteredUsers(filtered);
    };

    return (
        <div className="mt-3">
            <div className="pt-10 mt-5 mb-4 flex items-center justify-between gap-4">
                {/* Search Input */}
                <div className="px-2 pt-3 text-md text-left text-gray-900 dark:text-gray-100">
                    Currrent Active Users
                </div>
                <div className="flex gap-4">
                    <Link href={route('activate.alluser.vote')}>
                    <PrimaryButton children={"Activate All"} />
                    </Link>
                    <Link href={route('deactivate.alluser.vote')}>
                    <SecondaryButton children={"disable all"} />
                    </Link>

                    <input
                        type="text"
                        placeholder="Search by name or email"
                        value={search_value}
                        onChange={handleSearchChange}
                        className="border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm "
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-2">
                {filteredUsers.map((user) => (
                    <VoterCard
                        key={user.id}
                        id={user.id}
                        name={user.name}
                        email={user.email}
                        student_id={user.student_id}
                        level = {user.level}
                        canvote={user.can_vote}
                        onDelete={handleDeleteUser}
                    />
                ))}
            </div>
        </div>
    );
}
