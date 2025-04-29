import { Country } from "@/utils/get-country-column";
import Image from "next/image";

export const CountryCell = ({
  name: countryName,
  code: countryCode,
}: Country) => {
  return (
    <div className="flex items-center gap-1">
      <div>{countryName}</div>
      <Image
        src={`https://country-flags.vercel.sh/s/${countryCode.toUpperCase()}.svg`}
        alt={countryCode}
        width={16}
        height={12}
        className="rounded-xs"
      />
    </div>
  );
};
