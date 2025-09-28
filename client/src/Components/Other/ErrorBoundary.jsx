import React from "react";


class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("EaseHome Error:", error, errorInfo);
  }

  handleReload = () => {
    window.location.reload(); // refresh page
  };

  handleNavigateHome = () => {
    window.location.href = "/"; // navigate to home
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="h-screen w-screen flex flex-col justify-center items-center bg-red-50 px-5">
          <div className="bg-white rounded-2xl shadow-lg max-w-md w-full p-8 text-center">
            
            {/* Error Icon */}
            <div className="flex justify-center mb-4">
              <i className="ri-error-warning-line h-16 w-16 text-red-600"></i>
            </div>

            {/* Heading */}
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Oops! Something went wrong
            </h1>
            
            {/* Message */}
            <p className="text-gray-600 mb-6">
              We’re sorry, but this page couldn’t load properly.  
              Please try refreshing the page or go back to the homepage.
            </p>

            {/* Buttons */}
            <div className="flex justify-center gap-4">
              <button
                onClick={this.handleReload}
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
              >
                Refresh Page
              </button>
              <button
                onClick={this.handleNavigateHome}
                className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
              >
                Go Home
              </button>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
