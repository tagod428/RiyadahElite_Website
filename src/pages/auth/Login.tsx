import { useEffect } from 'react';

const Login = () => {
  useEffect(() => {
    document.title = 'Login | Riyadah Elite';
  }, []);

  return (
    <div className="min-h-screen py-32 bg-background">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-6">
          <span className="gradient-text">Login</span>
        </h1>
        <p className="text-neutral-300">
          Login functionality coming soon. Please check back later.
        </p>
      </div>
    </div>
  );
};

export default Login;