import Image from "next/image";

interface CountryCellProps {
  countryName: string;
  countryCode: string;
}

export const CountryCell = ({ countryName, countryCode }: CountryCellProps) => {
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
