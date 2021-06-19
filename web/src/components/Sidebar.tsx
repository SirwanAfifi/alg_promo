import Logo from "../assets/logo.svg";

export const Sidebar: React.FC = () => {
  return (
    <section className="p-5 bg-black flex flex-col">
      <div className="mb-10">
        <img className="h-8" src={Logo} alt="Logo" />
      </div>
      <div className="h-2/3 flex flex-col justify-around items-center">
        {Array.from({ length: 8 }).map((_, i: number) => (
          <span
            key={i}
            className="w-6 h-6 border-darkGray border-4 rounded-full"
          ></span>
        ))}
      </div>
    </section>
  );
};
