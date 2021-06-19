import { Layout } from "../components/Layout";
import { DuplicateIcon } from "@heroicons/react/solid";
import { Input } from "../components/Input";
import { Service } from "../components/Service";

export const MainPage: React.FC = () => (
  <Layout>
    <h1 className="text-3xl">Services</h1>
    <section className="mt-3">
      <Input
        label="Filter"
        // icon={<DuplicateIcon className="h-5 w-5 text-blue" />}
      />
      <button className="ml-3 w-40 h-10 border border-lightGray rounded">
        Reset
      </button>
    </section>
    <section className="mt-6">
      <Service title="" description="" />
    </section>
  </Layout>
);
