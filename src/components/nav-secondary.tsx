import { Link } from "react-router-dom";

export function NavSecondary({
  items,
  className,
}: {
  items: any[];
  className?: string;
}) {
  return (
    <div className={`space-y-1 p-2 ${className}`}>

      {items.map((item) => {
        const Icon = item.icon;

        return (
          <Link
            key={item.title}
            to={item.url}
            className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 transition"
          >
            <Icon size={18} />

            <span>{item.title}</span>
          </Link>
        );
      })}

    </div>
  );
}