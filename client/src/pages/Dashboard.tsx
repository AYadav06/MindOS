import { useAuth } from "../hooks/AuthContext";

export  const Dashboard=()=> {
  const { user, logout } = useAuth();
  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Dashboard</h2>
      <p>Welcome -{user.name}</p>
      <button
        onClick={logout}
        className="bg-red-500 text-white px-4 py-2 rounded mt-4"
      >
        Logout
      </button>
    </div>
  );
}
