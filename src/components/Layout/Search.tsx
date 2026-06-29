import { useNavigate, useSearchParams } from "react-router";
import { useEffect, useId, useState } from "react";
import { mainPath } from "../../data/constant.tsx";
import { SEARCH_PARAMS } from "../../data/searchParams";
import { FaSearch } from "react-icons/fa";

interface Props {
  variant?: "light" | "dark";
}

export default function SearchComponent({ variant = "light" }: Props) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = useId();
  const urlQuery = searchParams.get(SEARCH_PARAMS.query) ?? "";
  const [search, setSearch] = useState<string>(urlQuery);
  const isDark = variant === "dark";

  useEffect(() => {
    setSearch(urlQuery);
  }, [urlQuery]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = search.trim();
    if (trimmed) {
      navigate({
        pathname: mainPath.searchPage.main,
        search: `${SEARCH_PARAMS.query}=${encodeURIComponent(trimmed)}`,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} id={id} className="w-full flex items-center relative group">
      <input
        value={search}
        onChange={(e) => setSearch(e.currentTarget.value)}
        placeholder="Məhsul, kod və ya brend axtar..."
        className={`w-full h-10 pl-4 pr-12 rounded-lg outline-none transition-all duration-200 text-sm border
          ${
            isDark
              ? "bg-white/10 border-transparent text-white placeholder:text-gray-400 focus:bg-white/15 focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20"
              : "bg-brand-sand/80 border-transparent text-brand-dark placeholder:text-gray-400 focus:bg-white focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20"
          }`}
      />
      <button
        type="submit"
        form={id}
        className={`absolute cursor-pointer right-2 p-2 rounded-lg transition-colors duration-200
          ${
            isDark
              ? "text-gray-400 hover:text-brand-gold hover:bg-white/10"
              : "text-gray-500 hover:text-brand-gold hover:bg-brand-sand"
          }`}
      >
        <FaSearch className="w-4 h-4" />
      </button>
    </form>
  );
}
