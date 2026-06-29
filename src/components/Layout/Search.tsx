import { useNavigate, useSearchParams } from "react-router";
import { useEffect, useId, useState } from "react";
import { mainPath } from "../../data/constant.tsx";
import { SEARCH_PARAMS } from "../../data/searchParams";
import { FaSearch } from "react-icons/fa";

export default function SearchComponent() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = useId();
  const urlQuery = searchParams.get(SEARCH_PARAMS.query) ?? "";
  const [search, setSearch] = useState<string>(urlQuery);

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
        className="w-full h-10 pl-4 pr-12 rounded-lg outline-none transition-all duration-200 text-sm
          bg-blue-50/80 border border-transparent text-slate-700 placeholder:text-slate-400
          focus:bg-white focus:border-[#00A8E8] focus:ring-2 focus:ring-[#00A8E8]/20"
      />
      <button
        type="submit"
        form={id}
        className="absolute cursor-pointer right-2 p-2 rounded-lg text-slate-500 hover:text-[#00A8E8] hover:bg-blue-100 transition-colors duration-200"
      >
        <FaSearch className="w-4 h-4" />
      </button>
    </form>
  );
}
