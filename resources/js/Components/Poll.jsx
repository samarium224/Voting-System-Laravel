import React, { useEffect } from "react";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Poll() {
    // Step 1: Initialize form state using useForm
    const { data, setData, post, processing, errors, reset } = useForm({
        candidate: "", // Form field to hold the selected candidate ID
    });

    const [candidates, setCandidates] = React.useState([]);

    // Step 2: Fetch candidates from backend using useEffect
    useEffect(() => {
        fetch("/candidates") // Replace with your Laravel backend URL
            .then((response) => response.json())
            .then((data) => setCandidates(data))
            .catch((error) =>
                console.error("Error fetching candidates:", error)
            );

        return () => {
            reset("candidate");
        };
    }, []);

    // Step 3: Handle form submission
    const submit = (e) => {
        e.preventDefault();
        if(data.candidate != ""){
            post(route("poll.submit")); // Replace with your actual backend route for submitting the poll
        }
    };

    return (
        <form onSubmit={submit}>
            <fieldset className="space-y-4">
                <legend className="sr-only">Choose a Candidate</legend>

                {candidates.map((candidate) => (
                    <div key={candidate.id}>
                        <label
                            htmlFor={`candidate-${candidate.id}`}
                            className="flex cursor-pointer py-6 justify-between gap-4 rounded-lg border border-gray-100 dark:text-gray-100 dark:border-stale-400 bg-white dark:bg-gray-800 p-4 text-md font-medium shadow-md hover:border-gray-200 has-[:checked]:border-blue-500 has-[:checked]:bg-blue-600 has-[:checked]:ring-1 has-[:checked]:ring-blue-500"
                        >
                            <div>
                                <p className="text-gray-900 dark:text-gray-200">
                                    {candidate.name}{" "}
                                    {/* Adjust according to your data structure */}
                                </p>
                            </div>

                            <input
                                type="radio"
                                name="candidate"
                                value={candidate.id}
                                id={`candidate-${candidate.id}`}
                                className="size-5 text-blue-400"
                                checked={data.candidate == candidate.id}
                                onChange={(e) =>
                                    setData("candidate", e.target.value)
                                }
                            />
                        </label>
                    </div>
                ))}
            </fieldset>

            {errors.candidate && (
                <div className="text-red-500">{errors.candidate}</div>
            )}

            <div className="flex justify-center">
                <button
                    type="submit"
                    className="mt-4 px-6 py-2 bg-blue-500 text-white rounded"
                    disabled={processing}
                >
                    {processing ? "Submitting..." : "Submit Your Vote"}
                </button>
            </div>
        </form>
    );
}
