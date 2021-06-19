import { DuplicateIcon } from "@heroicons/react/solid";
import { Input } from "./Input";

interface ServiceProps {
  title: string;
  description: string;
}
export const Service = (props: ServiceProps) => (
  <div className="bg-white shadow sm:rounded-lg flex items-center px-4 py-5 sm:p-6 justify-between">
    <div>
      <h3 className="text-3xl">Delete your account</h3>
      <div className="mt-3 max-w-xl text-sm text-textGray truncate">
        <p>
          Once you delete your account, you will lose all data associated with
          it.
        </p>
      </div>
    </div>
    <div className="space-x-4 hidden lg:block">
      <Input
        label="Promocode"
        icon={<DuplicateIcon className="h-5 w-5 text-blue" />}
      />
      <button className="w-60 h-10 rounded bg-blue text-white">
        Activate bonus
      </button>
    </div>
  </div>
);
