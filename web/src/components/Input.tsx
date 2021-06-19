interface InputProps {
  label: string;
  icon?: JSX.Element;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  name?: string;
  type?: "text" | "password";
  fullWidth?: boolean;
}
export const Input = ({
  label,
  icon,
  value,
  onChange,
  name,
  type,
  fullWidth,
}: InputProps) => {
  return (
    <div className={`${fullWidth ? "w-full" : "w-60"}  h-10 inline-block`}>
      <label className="block text-sm uppercase text-textGray">{label}</label>
      <div className="mt-2 relative">
        {icon && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer">
            {icon}
          </div>
        )}
        <input
          value={value}
          onChange={onChange}
          name={name}
          type={type || "text"}
          className="mr-3 w-full h-10 pl-2 pr-10 sm:text-sm border border-lightGray rounded-md"
        />
      </div>
    </div>
  );
};
