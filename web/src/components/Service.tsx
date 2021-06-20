import { DuplicateIcon } from "@heroicons/react/solid";
import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { ServiceItem } from "../types/service";
import { Input } from "./Input";

interface ServiceProps {
  item: ServiceItem;
  onBounceActivatedClicked: (service: ServiceItem, code: string) => void;
}
export const Service = ({
  item: { id, title, price, description, userServices },
  onBounceActivatedClicked,
}: ServiceProps) => {
  const [bounce, setBounce] = useState<string>("");
  const authContext = useContext(AuthContext);

  const handleBounceChanges = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setBounce(value);
  };

  const handleBounceActivatedClicked = () => {
    onBounceActivatedClicked({ id, title, price, description }, bounce);
  };
  return (
    <div className="bg-white shadow sm:rounded-lg flex items-center px-4 py-5 sm:p-6 justify-between mt-4 mb-4">
      <div>
        <h3 className="text-3xl">{title}</h3>
        <div className="mt-3 max-w-xl text-sm text-textGray ">
          <p className="truncate">{description}</p>
        </div>
      </div>
      <div className="space-x-4 hidden lg:block">
        {(userServices &&
          userServices?.some(
            (us) => us.userId === authContext.authState.userInfo.userId
          ) && (
            <h1 className="transform -rotate-12 text-2xl text-red">
              Already Activated
            </h1>
          )) || (
          <>
            <Input
              value={bounce}
              onChange={handleBounceChanges}
              label="Promocode"
              icon={<DuplicateIcon className="h-5 w-5 text-blue" />}
            />
            <button
              className="w-60 h-10 rounded bg-blue text-white"
              onClick={handleBounceActivatedClicked}
            >
              Activate bonus
            </button>
          </>
        )}
      </div>
    </div>
  );
};
