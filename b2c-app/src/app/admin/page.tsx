import NavBar from "../components/NavBar";

export default function AdminPage() {
  return (
    <>
      <NavBar />
      {/* Main content for the admin page */}
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="text-4xl font-bold">Admin Portal</h1>
        <p className="mt-4 text-lg">Manage your products and orders here.</p>
      </div>
    </>
  );
}
