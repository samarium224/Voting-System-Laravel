export default function InputLabel({ value, className = '', children, ...props }) {
    return (
        <label {...props} className={`block font-medium text-sm text-gray-800 dark:text-gray-300 ` + className}>
            {value ? value : children}
        </label>
    );
}
