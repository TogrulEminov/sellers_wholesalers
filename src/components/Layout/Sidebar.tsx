import { Menu, Drawer, Button, Spin } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import type { MenuItemType } from "antd/es/menu/interface";
import { useSearchParams } from "react-router";
import { ALL_CATEGORIES, formatUnitLabel, SEARCH_PARAMS } from "../../data/searchParams";
import { useProductCountsByUnit, useUnits } from "../../hooks/useUnits";
import { useSidebar } from "../../context/SidebarContext";

function CategoryLabel({ name, count }: { name: string; count: number | string }) {
  return (
    <div className="flex items-center justify-between w-full gap-2">
      <span className="font-medium text-sm text-[#003459] truncate">{name}</span>
      <span className="text-xs text-gray-400 tabular-nums shrink-0">{count}</span>
    </div>
  );
}

function SidebarPanel({ isMobile = false }: { isMobile?: boolean }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const { closeMobile } = useSidebar();
  const units = useUnits();
  const counts = useProductCountsByUnit();

  const selectedCategory = searchParams.get(SEARCH_PARAMS.category) ?? ALL_CATEGORIES;

  const setCategory = (category: string) => {
    const next = new URLSearchParams(searchParams);
    if (category === ALL_CATEGORIES) {
      next.delete(SEARCH_PARAMS.category);
    } else {
      next.set(SEARCH_PARAMS.category, category);
    }
    next.delete(SEARCH_PARAMS.page);
    setSearchParams(next, { replace: true });
    closeMobile();
  };

  const menuItems: MenuItemType[] = [
    {
      key: ALL_CATEGORIES,
      label: (
        <CategoryLabel name="Bütün məhsullar" count={counts?.[ALL_CATEGORIES] ?? "—"} />
      ),
    },
    ...(units ?? []).map((unit) => ({
      key: unit.name,
      label: (
        <CategoryLabel
          name={formatUnitLabel(unit.name)}
          count={counts?.[unit.name] ?? 0}
        />
      ),
    })),
  ];

  return (
    <div className="flex flex-col h-full bg-white">
      {isMobile && (
        <div className="flex items-center justify-between px-4 h-14 border-b border-gray-100 shrink-0">
          <span className="font-semibold text-[#003459]">Kateqoriyalar</span>
          <Button
            type="text"
            shape="circle"
            icon={<CloseOutlined className="text-gray-400" />}
            onClick={closeMobile}
          />
        </div>
      )}

      {!isMobile && (
        <div className="px-4 py-4 border-b border-gray-100">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
            Ölçü vahidləri
          </p>
        </div>
      )}

      <div className="flex-1 overflow-y-auto py-3 sidebar-scroll">
        {units === undefined ? (
          <div className="flex justify-center py-12">
            <Spin />
          </div>
        ) : (
          <Menu
            mode="inline"
            items={menuItems}
            selectedKeys={[selectedCategory]}
            onClick={({ key }) => setCategory(String(key))}
            className="border-r-0 bg-transparent sidebar-menu"
          />
        )}
      </div>
    </div>
  );
}

export default function Sidebar() {
  const { mobileOpen, closeMobile } = useSidebar();

  return (
    <>
      <aside className="hidden lg:block w-64 shrink-0 border-r border-gray-100 bg-white min-h-[calc(100vh-4.5rem)] sticky top-[4.5rem] self-start">
        <SidebarPanel />
      </aside>

      <Drawer
        placement="left"
        closable={false}
        onClose={closeMobile}
        open={mobileOpen}
        size={280}
        styles={{ body: { padding: 0 } }}
        className="lg:hidden"
      >
        <SidebarPanel isMobile />
      </Drawer>
    </>
  );
}
