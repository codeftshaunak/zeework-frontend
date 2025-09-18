export const ErrorState = ({
  errorMessage = "Failed to load profile information.",
  buttonText = "Go Back to Dashboard",
  onRetry = null,
  onNavigate,
}) => {
  return (
    <section
      className={"w-full flex items-center justify-center min-h-[60vh] px-4"}
    >
      <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-8 max-w-md w-full text-center space-y-6">
        {/* Icon */}
        <div className="mx-auto h-14 w-14 flex items-center justify-center rounded-full bg-red-50">
          <svg
            className="h-7 w-7 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        {/* Headings */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            Something went wrong
          </h2>
          <p className="text-sm text-red-500 mt-1">{errorMessage}</p>
        </div>

        {/* Actions */}
        <div className="flex justify-center gap-4 mt-4">
          <button
            onClick={onNavigate}
            className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            {buttonText}
          </button>

          {onRetry && (
            <button
              onClick={onRetry}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
            >
              Try Again
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
