import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

export const Layout: React.FC = ({ children }) => {
  return (
    <div className="h-screen w-screen flex bg-bgGray">
      <Sidebar />
      <main className="bg-red-500 flex-1">
        <Header />
        <section className="p-6">{children}</section>
        <footer className="divide-y divide-fuchsia-300"></footer>
      </main>
    </div>
  );
};
