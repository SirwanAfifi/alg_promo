import { useEffect, useState } from "react";
import useSWR from "swr";
import { useHistory } from "react-router-dom";
import { Layout } from "../components/Layout";
import { Input } from "../components/Input";
import { Service } from "../components/Service";
import { ServiceItem } from "../types/_index";
import { privateFetch } from "../utils/_index";

export const MainPage: React.FC = () => {
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) history.push("/signin");
  }, []);
  const history = useHistory();
  const [services, setServices] = useState<ServiceItem[]>();
  const { error, isValidating } = useSWR<ServiceItem[]>(
    "services",
    () => privateFetch.get("/service").then((d) => d.data),
    {
      onSuccess: (data) => setServices(data),
      onError: () => history.push("/signin"),
    }
  );
  return (
    <Layout>
      <h1 className="text-3xl">Services</h1>
      <section className="mt-3">
        <Input label="Filter" />
        <button className="ml-3 w-40 h-10 border border-lightGray rounded">
          Reset
        </button>
      </section>
      <section className="mt-6">
        {isValidating && <span>Loading...</span>}
        {error && <span>{error}</span>}
        {services &&
          services.map((service: ServiceItem) => (
            <Service
              key={service.id}
              title={service.title}
              description={service.description}
            />
          ))}
      </section>
    </Layout>
  );
};
