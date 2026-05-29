import Link from "next/link";

type Props = {
  title: string;
  description: string;
  href: string;
  icon?: string;
};

export default function ToolCard({
  title,
  description,
  href,
  icon = "⚡",
}: Props) {
  return (
    <Link href={href} className="block">
      <div className="bg-[#121933] border border-[#26304f] rounded-3xl p-6 card-hover transition-all duration-300 h-full">
        
        {/* ICON */}
        <div className="text-4xl mb-4">{icon}</div>

        {/* TITLE */}
        <h3 className="text-xl font-semibold mb-2">
          {title}
        </h3>

        {/* DESCRIPTION */}
        <p className="text-gray-400 text-sm leading-6">
          {description}
        </p>

        {/* CTA */}
        <div className="mt-5 text-blue-500 text-sm font-medium">
          Use Tool →
        </div>
      </div>
    </Link>
  );
}
