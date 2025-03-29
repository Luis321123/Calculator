export function Input({ className, ...props }) {
    return (
      <input
        className={`p-2 rounded border ${className}`}
        {...props}
      />
    );
  }