import NavBar from "../components/NavBar";

export default function AdminPage() {
  return (
    <>
      {/* Main content for the admin page */}
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-4xl font-bold">B2C Admin Portal</h1>
        <p className="mt-3 text-lg">Manage your products and orders here.</p>
      </div>
    </>
  );
}
