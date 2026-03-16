// Centered loading spinner for async pages
export default function LoadingSpinner() {
  return (
    <div
      className="flex justify-center items-center min-h-[300px]"
      role="status"
      aria-label="Loading"
    >
      <div
        className="animate-spin w-10 h-10 border-4 border-primary-500 border-t-transparent rounded-full"
        aria-hidden
      />
    </div>
  );
}
