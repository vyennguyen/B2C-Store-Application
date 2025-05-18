"use  client";

const categories = [
  { name: "Shop", path: "/products" },
  { name: "Philosophy", path: "/philosophy" },
  { name: "Contact Us", path: "/contact" },
];

function MiddleMenu() {
  const [selected, setSelected] = useState(false);
  return (
    <nav aria-label="Middle Menu">
      <div className="flex justify-center items-center p-2 w-auto">
        {categories.map((category) => (
          <Link key={category.name} href={category.path}>
            {category.name}{" "}
          </Link>
        ))}
      </div>
    </nav>
  );
}

export default MiddleMenu;
