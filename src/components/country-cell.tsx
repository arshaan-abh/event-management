import Flag from "react-flagpack";

interface CountryCellProps {
  countryName: string;
  countryCode: string;
}

export const CountryCell = ({ countryName, countryCode }: CountryCellProps) => {
  return (
    <div className="flex items-center gap-1">
      <div>{countryName}</div>
      <Flag
        code={countryCode}
        hasBorderRadius={false}
        hasDropShadow={false}
        hasBorder={false}
        gradient=""
        size="S"
        className="rounded-xs"
      />
    </div>
  );
};
