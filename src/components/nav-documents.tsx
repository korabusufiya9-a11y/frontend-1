import { Link } from "react-router-dom";

export function NavDocuments({
  items,
}: {
  items: any[];
}) {
  return (
    <div className="space-y-1 p-2 mt-4">

      <p className="px-3 text-xs font-semibold text-gray-400 uppercase">
        Documents
      </p>

      {items.map((item) => {
        const Icon = item.icon;

        return (
          <Link
            key={item.name}
            to={item.url}
            className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 transition"
          >
            <Icon size={18} />

            <span>{item.name}</span>
          </Link>
        );
      })}

    </div>
  );
}