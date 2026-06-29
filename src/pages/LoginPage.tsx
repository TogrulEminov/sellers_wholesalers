import React from "react";
import { Link, useNavigate } from "react-router";
import { ArrowLeftOutlined } from "@ant-design/icons";
import LoginForm from "../components/Auth/LoginForm";

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col">
      <div className="px-6 py-5 flex items-center justify-between">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-[#003459] transition-colors group"
        >
          <span className="w-8 h-8 rounded-lg bg-white shadow-sm border border-gray-100 flex items-center justify-center group-hover:border-[#00A8E8] transition-colors">
            <ArrowLeftOutlined className="text-xs" />
          </span>
          <span className="text-sm font-medium hidden sm:inline">Ana səhifə</span>
        </Link>

        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-[#00A8E8] rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">B</span>
          </div>
          <span className="font-bold text-[#003459] text-sm hidden sm:inline">BulkTrade</span>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <LoginForm variant="page" onSuccess={() => navigate("/")} />
      </div>

      <p className="text-center text-gray-400 text-xs pb-8 leading-relaxed">
        Daxil olmaqla{" "}
        <a href="#" className="text-[#00A8E8] hover:underline font-medium">
          istifadə şərtlərini
        </a>{" "}
        qəbul etmiş olursunuz.
      </p>
    </div>
  );
};
