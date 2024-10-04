import { useNavigate } from "react-router-dom";

const Error404 = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex justify-center items-center bg-error">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-error-content">404</h1>
        <h2 className="text-3xl font-bold text-white mb-4">Page Not Found!</h2>
        <p className="text-lg text-white mb-8">
          The page you're looking for doesn't exist.
        </p>
        <button className="btn btn-primary btn-lg" onClick={() => navigate(-1)}>
          Go Back
        </button>
      </div>
    </div>
  );
};

export default Error404;
