interface InputProps {
  label: string;
  icon?: JSX.Element;
}
export const Input = ({ label, icon }: InputProps) => {
  return (
    <div className="w-60 h-10 inline-block">
      <label className="block text-sm uppercase text-textGray">{label}</label>
      <div className="mt-2 relative">
        {icon && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer">
            {icon}
          </div>
        )}
        <input
          type="text"
          className="mr-3 w-full h-10 pl-2 pr-10 sm:text-sm border border-lightGray rounded-md"
        />
      </div>
    </div>
  );
};
