import { useCallback, useEffect, useState } from "react";
import useSWR from "swr";
import { useHistory } from "react-router-dom";
import { useNotifications } from "reapop";
import { Layout } from "../components/Layout";
import { Input } from "../components/Input";
import { Service } from "../components/Service";
import { ServiceItem, ServicePaginatedResult } from "../types/_index";
import { privateFetch } from "../utils/_index";
import { useDebounce } from "../hooks/useDebounce";

export const MainPage: React.FC = () => {
  const history = useHistory();
  const [page, setPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const { notify } = useNotifications();

  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const [services, setServices] = useState<ServicePaginatedResult>({
    rows: [],
    count: 0,
  });
  const { data, error, isValidating, mutate } = useSWR<ServicePaginatedResult>(
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
    setPage((prevPage) => prevPage + 5);
  };

  const onResetClicked = () => {
    mutate();
    setSearchTerm("");
  };

  const activateBounceHandler = useCallback(
    async (service: ServiceItem, bounce: string) => {
      if (!bounce) {
        notify({
          title: "Error",
          message: `Please Enter A Valid Promo Code`,
          status: "error",
        });
        return;
      }

      const activateBounceResult = await privateFetch.post(
        `/promoCode/activateBounce`,
        {
          serviceId: service.id,
          promoCode: bounce,
        }
      );

      if (activateBounceResult && !activateBounceResult.data.ok) {
        const { error } = activateBounceResult.data;
        notify({
          title: "Error",
          message: error,
          status: "error",
        });
        return;
      }

      setServices({ rows: [], count: 0 } as ServicePaginatedResult);
      mutate();

      notify({
        title: "Success",
        message: `Service ${service.title} Has Been Activated For You`,
        status: "info",
      });
    },
    []
  );

  useEffect(
    () => {
      if (!debouncedSearchTerm) {
        return;
      }
      setServices({ rows: [], count: 0 } as ServicePaginatedResult);
      privateFetch.get(`/service?q=${searchTerm}`).then((d) => {
        setServices(d.data);
      });
    },
    [debouncedSearchTerm] // Only call effect if debounced search term changes
  );

  return (
    <Layout>
      <h1 className="text-3xl">Services</h1>
      <section className="mt-3">
        <Input
          label="Filter"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className="ml-3 w-40 h-10 border border-lightGray rounded"
          onClick={onResetClicked}
        >
          Reset
        </button>
      </section>
      <section className="mt-6">
        {isValidating && <span>Loading...</span>}
        {error && <span>{error}</span>}
        {services &&
          services.rows.map((service: ServiceItem) => (
            <Service
              key={`${service.id}-${service.title}`}
              item={service}
              onBounceActivatedClicked={activateBounceHandler}
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
