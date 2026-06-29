interface Props {
  itemCount: number;
}

export default function WishlistTitle({ itemCount }: Props) {
  return (
    <div className="pb-4 border-b border-gray-200 lg:border-0 lg:pb-0">
      <h1 className="text-2xl md:text-3xl font-bold text-[#003459]">Seçilmişlər</h1>
      <p className="text-gray-500 text-sm mt-1">
        {itemCount > 0 ? `${itemCount} məhsul siyahıdadır` : "İstək siyahınız boşdur"}
      </p>
    </div>
  );
}
