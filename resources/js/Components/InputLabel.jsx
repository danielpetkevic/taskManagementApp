export default function InputLabel({
    value,
    className = '',
    children,
    ...props
}) {
    return (
        <label
            {...props}
            className={`text-sm font-medium text-gray-700 block ` + className}
        >
            {value ? value : children}
        </label>
    );
}
