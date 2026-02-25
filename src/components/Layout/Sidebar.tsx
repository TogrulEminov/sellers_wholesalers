import { Menu, Drawer, Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import type { MenuItemType } from "antd/es/menu/interface";

const categories = ["Electronics", "Tools", "Furniture", "Office Supplies"];

export function SidebarContent({
  menuItems,
  onClose,
  isMobile = false,
}: {
  menuItems: MenuItemType[];
  onClose?: () => void;
  isMobile?: boolean;
}) {
  return (
    <div className="flex flex-col h-full bg-white">
      {isMobile && (
        <div className="flex items-center justify-between px-5 h-14 border-b border-gray-100 shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-[#00A8E8] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">B</span>
            </div>
            <span className="font-bold text-[#003459] text-base">
              Kateqoriyalar
            </span>
          </div>
          <Button
            type="text"
            shape="circle"
            icon={<CloseOutlined className="text-gray-400" />}
            onClick={onClose}
            className="hover:bg-gray-100 flex items-center justify-center"
          />
        </div>
      )}

      <div className="flex-1 overflow-y-auto py-4 custom-scrollbar">
        {!isMobile && (
          <div className="px-6 mb-3">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[2px]">
              Kateqoriyalar
            </p>
          </div>
        )}
        <Menu
          mode="inline"
          items={menuItems}
          className="border-r-0 bg-transparent"
          selectable={false}
        />
      </div>

      <style>{`
        .ant-menu-item { 
          margin-inline: 12px !important; 
          width: calc(100% - 24px) !important; 
        }
        .ant-menu-title-content { margin-left: 0 !important; }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #E2E8F0; border-radius: 2px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #CBD5E1; }
      `}</style>
    </div>
  );
}

interface SidebarProps {
  isMobileMenuOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isMobileMenuOpen, onClose }: SidebarProps) {
  const menuItems = categories.map((cat) => ({
    key: cat,
    label: <span className="font-semibold text-sm text-[#003459]">{cat}</span>,
    className:
      "group mb-1 !h-12 !flex !items-center !px-6 !rounded-xl !mx-2 transition-all hover:!bg-[#F8FAFC]",
  }));

  return (
    <>
      <Drawer
        placement="left"
        closable={false}
        onClose={onClose}
        open={isMobileMenuOpen}
        size={280}
        styles={{ body: { padding: 0 } }}
        className="lg:hidden"
      >
        <SidebarContent menuItems={menuItems} isMobile onClose={onClose} />
      </Drawer>
    </>
  );
}
