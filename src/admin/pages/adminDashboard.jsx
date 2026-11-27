
import { useAuth } from "../context/authContext";

export default function AdminDashboard() {
  const { admin } = useAuth();

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-bold text-[#104735]">
        Welcome to Admin Dashboard
      </h2>

      <p className="mt-3 text-gray-600">
        {admin?.name
          ? `Welcome, ${admin.name}`
          : "You have successfully authenticated."}
      </p>

      <p className="mt-2 text-sm text-gray-500">
        Manage your Specterra website content from here.
      </p>
    </div>
  );
}
