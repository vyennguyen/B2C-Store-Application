// User management page for admins
// Add new admin users and manage existing users

"use client";

import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExclamation,
  faUserPlus,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
};

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [email, setAdminEmail] = useState("");
  const [name, setAdminName] = useState("");
  const [password, setPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState<{
    email?: string;
    password?: string;
    name?: string;
  }>({});
  const [success, setSuccess] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(faEyeSlash);

  // Fetch users on initial load
  useEffect(() => {
    fetchUsers();
  }, []);

  // Add user success message timeout
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  // Toggle password visibility
  const handlePasswordToggle = () => {
    setType((prev) => (prev === "password" ? "text" : "password"));
    setIcon((prev) => (prev === faEyeSlash ? faEye : faEyeSlash));
  };

  // Fetch all users
  async function fetchUsers() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/users");
      if (!res.ok) throw new Error("Failed to fetch users");
      const data = await res.json();
      setUsers(data);
    } catch (err: any) {
      setError(err.message || "Error loading users");
    }
    setLoading(false);
  }

  // Add new admin user
  async function handleAddAdmin(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      // Use register route, but change default role to ADMIN
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          role: "ADMIN",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.fields) {
          setFieldErrors(data.fields);
        }
        setError(data.error || "Failed to create user");
      } else {
        setSuccess("New admin user created!");
        setAdminName("");
        setAdminEmail("");
        setPassword("");
        setFieldErrors({});
        fetchUsers();
      }
    } catch (error) {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  }

  // Delete user by id
  async function handleDeleteUser(userId: string) {
    if (!confirm("Are you sure you want to delete this user?")) return;

    try {
      const res = await fetch(`/api/users/${userId}`, { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to delete user");
      }
      fetchUsers();
    } catch (err: any) {
      setError(err.message);
    }
  }

  // Filter users based on search term
  const filteredUsers = users.filter(({ id, name, email, role }) => {
    const lowerSearch = searchTerm.toLowerCase();
    return (
      id.toString().includes(lowerSearch) ||
      name.toLowerCase().includes(lowerSearch) ||
      email.toLowerCase().includes(lowerSearch) ||
      role.toLowerCase().includes(lowerSearch)
    );
  });

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">User Management</h1>

      {/* USer Management */}
      <h2 className="text-xl font-semibold mb-4">All Users</h2>
      {loading && <p className="m-2">Loading users...</p>}
      <input
        type="text"
        placeholder="Search by ID, Name, or Email"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border p-2 rounded-lg w-full mb-4"
      />

      <table className="w-full border-collapse border border-gray-300 mb-10">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2 text-center">ID</th>
            <th className="border border-gray-300 p-2 text-center">Name</th>
            <th className="border border-gray-300 p-2 text-center">Email</th>
            <th className="border border-gray-300 p-2 text-center">Role</th>
            <th className="border border-gray-300 p-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map(({ id, name, email, role }) => (
            <tr key={id}>
              <td className="border border-gray-300 p-2 text-center">{id}</td>
              <td className="border border-gray-300 p-2 text-center">{name}</td>
              <td className="border border-gray-300 p-2 text-center">
                {email}
              </td>
              <td className="border border-gray-300 p-2 text-center">{role}</td>
              <td className="border border-gray-300 p-2 text-center">
                <button
                  onClick={() => handleDeleteUser(id)}
                  className="text-white bg-(--error) rounded-lg font-bold hover:bg-(--e-hover) py-1 px-2 cursor-pointer"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add Admin User Form */}
      <h2 className="text-xl font-semibold mb-3">Add Admin User</h2>
      <form onSubmit={handleAddAdmin} className="mb-6 w-[50%] mx-auto">
        <label className="block mb-2">
          Admin Name
          <input
            type="text"
            placeholder="Name"
            value={name}
            autoComplete="off"
            onChange={(e) => {
              setAdminName(e.target.value);
              setFieldErrors((prev) => ({ ...prev, name: undefined }));
            }}
            className="border p-2 rounded-lg w-full mb-2"
          />
          {fieldErrors.name && (
            <p className="text-(--error) mb-2 flex items-center gap-1">
              <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-(--error) text-white">
                <FontAwesomeIcon icon={faExclamation} size="xs" />
              </span>
              {fieldErrors.name}
            </p>
          )}
        </label>

        <label className="block mb-2">
          Admin Email
          <input
            type="email"
            placeholder="Email"
            value={email}
            autoComplete="off"
            onChange={(e) => {
              setAdminEmail(e.target.value);
              setFieldErrors((prev) => ({ ...prev, email: undefined }));
            }}
            className="border p-2 rounded-lg w-full mb-2"
          />
          {fieldErrors.email && (
            <p className="text-(--error) mb-2 flex items-center gap-1">
              <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-(--error) text-white">
                <FontAwesomeIcon icon={faExclamation} size="xs" />
              </span>
              {fieldErrors.email}
            </p>
          )}
        </label>

        <label className="block mb-2 relative">
          Admin Password
          <input
            type={type}
            placeholder="Password"
            value={password}
            autoComplete="off"
            onChange={(e) => {
              setPassword(e.target.value);
              setFieldErrors((prev) => ({ ...prev, password: undefined }));
            }}
            className="border p-2 rounded-lg w-full mb-2 pr-10"
          />
          <button
            type="button"
            onClick={handlePasswordToggle}
            className="absolute right-3 top-11.5 transform -translate-y-1/2 text-gray-600"
            aria-label={type === "password" ? "Show password" : "Hide password"}
          >
            <FontAwesomeIcon icon={icon} />
          </button>
          {fieldErrors.password && (
            <p className="text-(--error) mb-2 flex items-center gap-1">
              <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-(--error) text-white">
                <FontAwesomeIcon icon={faExclamation} size="xs" />
              </span>
              {fieldErrors.password}
            </p>
          )}
        </label>

        {error && (
          <p className="mt-2 text-(--error) mb-2 text-center">{error}</p>
        )}
        {success && (
          <p className="mt-2 text-(--success) mb-2 text-center">{success}</p>
        )}

        <div className="flex justify-center">
          {" "}
          <button
            type="submit"
            className="relative px-4 py-2 rounded-full overflow-hidden text-(--background) bg-(--foreground) cursor-pointer group"
            disabled={loading}
          >
            {/* Background Wave */}
            <span className="absolute inset-0 before:absolute before:left-[-100%] before:top-0 before:h-full before:w-full before:bg-gradient-to-r before:from-gray-800 before:to-(--background) before:z-0 group-hover:before:left-0 before:transition-all before:duration-500 before:ease-in-out before:rounded-full z-0" />

            {/* Button Text */}
            <span className="group-hover:text-white relative z-10 text-lg font-semibold">
              <FontAwesomeIcon icon={faUserPlus} className="mr-2" />
              Add New Admin
            </span>
          </button>
        </div>
      </form>
    </div>
  );
}
