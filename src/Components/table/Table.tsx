import React, { type JSX } from "react";

export interface TableColumn<T = any> {
  header: string;
  accessor: keyof T | ((item: T) => React.ReactNode);
  render?: (value: any, item: T) => React.ReactNode;
  className?: string;
}

interface TableProps<T> {
  columns: Array<TableColumn<T>>;
  data: T[];
  renderRow?: (item: T, index: number) => React.ReactNode;
  onRowClick?: (item: T) => void;
  rowClassName?: string | ((item: T, index: number) => string);
}

function Table<T>({
  columns,
  data = [],
  renderRow,
  onRowClick,
  rowClassName,
}: TableProps<T>): JSX.Element {
  const normalizedColumns = React.useMemo(() => columns, [columns]);

  const renderDefaultRow = React.useCallback(
    (item: T, rowIndex: number) => {
      const className =
        typeof rowClassName === "function"
          ? rowClassName(item, rowIndex)
          : rowClassName || "";

      return (
        <tr
          key={rowIndex}
          className={`${onRowClick ? "hover:bg-gray-50 cursor-pointer" : ""} ${className}`}
          onClick={() => onRowClick?.(item)}
        >
          {normalizedColumns.map((col, colIndex) => {
            let cellContent: React.ReactNode = null;

            try {
              const value =
                typeof col.accessor === "function"
                  ? col.accessor(item)
                  : item[col.accessor as keyof T];

              const renderedValue = col.render ? col.render(value, item) : value;

              cellContent = React.isValidElement(renderedValue)
                ? renderedValue
                : renderedValue !== undefined && renderedValue !== null
                ? String(renderedValue)
                : null;
            } catch {
              cellContent = null;
            }

            return (
              <td
                key={colIndex}
                className={`py-2 text-xs font-light text-black ${
                  col.className || ""
                } ${colIndex === 0 ? "pl-4" : ""} ${colIndex === normalizedColumns.length - 1 ? "pr-4" : ""}`}
              >
                {cellContent}
              </td>
            );
          })}
        </tr>
      );
    },
    [normalizedColumns, onRowClick, rowClassName]
  );

  return (
    <div className="w-full">
  <div className="overflow-x-auto w-full pl-4 pr-4">
    <table className="w-full border-collapse table-fixed">
      <colgroup>
        <col style={{ width: "5%" }} />
        <col style={{ width: "3%" }} />
        <col style={{ width: "3%" }} />
        <col style={{ width: "3%" }} />
        <col style={{ width: "3%" }} />
        <col style={{ width: "2.5%" }} />
        <col style={{ width: "2%" }} />
      </colgroup>

      <thead>
        <tr className="border-b border-gray-200">
          {normalizedColumns.map((col, index) => (
            <th
              key={index}
              className={`py-2 text-left text-xs font-medium text-gray-400 uppercase whitespace-nowrap tracking-wider 
                ${index === 0 ? "pl-4" : ""} 
                ${index === normalizedColumns.length - 1 ? "pr-2" : ""}`}
            >
              {col.header}
            </th>
          ))}
        </tr>
      </thead>

      <tbody className="bg-white border-b border-gray-200">
        {data.length > 0
          ? data.map((item, i) => (renderRow ? renderRow(item, i) : renderDefaultRow(item, i)))
          : (
            <tr>
              <td colSpan={normalizedColumns.length} className="px-1 py-2 text-center text-xs text-gray-500">
                No data available
              </td>
            </tr>
          )}
      </tbody>
    </table>
  </div>
</div>

  );
}

export default Table;
