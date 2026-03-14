import {useNavigate} from "react-router";
import {useId, useState} from "react";
import {mainPath} from "../../data/constant.tsx";
import {FaSearch} from "react-icons/fa";

export default function SearchComponent() {
    const navigate = useNavigate()
    const id = useId()
    const [search, setSearch] = useState<string>("")
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value
        setSearch(value)
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (search.trim()) {
            navigate({pathname: mainPath.searchPage.main, search: `query=${encodeURIComponent(search.trim())}`})
            setSearch("")
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            id={id}
            className="max-w-xl w-full flex items-center relative group"
        >
            <input
                value={search}
                onChange={handleChange}
                placeholder="Axtarış..."
                className="w-full h-11 pl-5 pr-12 bg-blue-50/80 hover:bg-blue-50
                         focus:bg-white focus:ring-2 focus:ring-[#00A8E8]
                         border border-transparent
                         rounded-xl outline-none transition-all duration-200
                         text-slate-700 placeholder:text-slate-400"
            />
            <button
                type="submit"
                form={id}
                className="absolute cursor-pointer right-3 p-2 text-slate-500 hover:text-[#00A8E8]
                         hover:bg-blue-100 rounded-lg transition-colors duration-200"
            >
                <FaSearch className="w-4 h-4"/>
            </button>
        </form>
    );
}