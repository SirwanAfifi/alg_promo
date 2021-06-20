import { useState } from "react";
import useSWR from "swr";
import { useHistory } from "react-router-dom";
import { Layout } from "../components/Layout";
import { Input } from "../components/Input";
import { Service } from "../components/Service";
import { ServiceItem, ServicePaginatedResult } from "../types/_index";
import { privateFetch } from "../utils/_index";

export const MainPage: React.FC = () => {
  const history = useHistory();
  const [page, setPage] = useState(0);
  const [services, setServices] = useState<ServicePaginatedResult>({
    rows: [],
    count: 0,
  });
  const { data, error, isValidating } = useSWR<ServicePaginatedResult>(
    ["services", page],
    () =>
      privateFetch.get(`/service?offset=${page}&limit=5`).then((d) => d.data),
    {
      onSuccess: (data) =>
        setServices((prevData) => ({
          ...prevData,
          rows: prevData.rows.concat(data.rows),
        })),
      onError: () => history.push("/signin"),
    }
  );
  const onPageChanges = () => {
    setPage((prevPage) => prevPage + 1);
  };

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
          services.rows.map((service: ServiceItem) => (
            <Service
              key={service.id}
              title={service.title}
              description={service.description}
            />
          ))}
      </section>
      {data && page < data.count / 5 && (
        <button
          className="mt-6 w-60 h-10 text-white bg-blue block mx-auto"
          onClick={onPageChanges}
        >
          Load More...
        </button>
      )}
    </Layout>
  );
};
