export const Header: React.FC = () => {
  return (
    <header className="bg-white pl-4 flex space-x-6 sticky top-0 z-50">
      <div className="p-2 overflow-hidden">
        <span className="block text-sm text-textGray truncate">Balance</span>
        <span className="text-xl text-black">213 920 $</span>
      </div>
      <div className="p-2 overflow-hidden">
        <span className="block text-sm text-textGray truncate">Payout</span>
        <span className="text-xl text-black">213 920 $</span>
      </div>
    </header>
  );
};
