import React, { useEffect } from "react";

export default function NotificationMsg({ message }) {
    const [show, setShow] = React.useState(true);

    useEffect(() => {
        // Set a timeout to hide the message after 2 seconds
        const timer = setTimeout(() => {
            setShow(false);
        }, 5000);

        // Clear the timeout if the component is unmounted
        return () => clearTimeout(timer);
    }, []);

    return (
        <div
            role="alert"
            className={`rounded border-s-4 border-red-500 bg-red-50 p-4 transition-opacity duration-500 ${
               show ? "opacity-100" : "opacity-0"
               }`}
        >
            <strong className="block font-medium text-red-800">
                {" "}
                Please Wait and Click Again{" "}
            </strong>

            <p className="mt-2 text-sm text-red-700">
                Wait for the host to announce that vote is finished and result is now published. {message}
            </p>
        </div>
    );
}
