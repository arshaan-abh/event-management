import { ColumnDef, RowData } from "@tanstack/react-table";
import { formatDateAndTime } from "./format-date-and-time";
import { DateAndTimeCell } from "@/components/date-and-time-cell";
import { DateAndTimePicker } from "@/components/shadcn/date-and-time-picker";
import { UpdateDataProps } from "./get-select-column";

export interface DateAndTime {
  date: string;
  time: string;
  day: string;
}

interface EditableDateAndTimeColumnProps<TData extends RowData> {
  editable: true;
  accessorKey: keyof TData;
}

interface UneditableDateAndTimeColumnProps<TData extends RowData> {
  editable?: false;
}

type GetDateAndTimeColumnProps = <TData extends RowData>(
  props: {
    generateDateAndTime: (props: TData) => string;
  } & (
    | EditableDateAndTimeColumnProps<TData>
    | UneditableDateAndTimeColumnProps<TData>
  ) &
    ColumnDef<TData>,
) => ColumnDef<TData>;

export const getDateAndTimeColumn: GetDateAndTimeColumnProps = ({
  generateDateAndTime,
  editable,
  ...columnDef
}) => ({
  cell: ({ row, column, table }) => {
    const dateAndTime = generateDateAndTime(row.original);
    const meta = table.options.meta as {
      updateData: (props: UpdateDataProps) => void;
    };
    if (editable)
      return (
        <DateAndTimePicker
          field={DateAndTimeCell}
          value={dateAndTime}
          onChange={(value) =>
            meta.updateData({
              rowIndex: row.index,
              columnId: column.id,
              value,
            })
          }
        />
      );
    else return <DateAndTimeCell {...formatDateAndTime(dateAndTime)} />;
  },
  ...columnDef,
});
