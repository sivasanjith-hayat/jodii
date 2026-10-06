import { cn } from '../../lib/utils'

interface DataTableProps<T> {
  data: T[]
  columns: Array<{
    key: keyof T
    header: string
    render?: (value: any, row: T) => React.ReactNode
    sortable?: boolean
  }>
  onRowClick?: (row: T) => void
  className?: string
}

export function DataTable<T>({ data, columns, onRowClick, className }: DataTableProps<T>) {
  return (
    <div className={cn('overflow-x-auto', className)}>
      <table className="w-full caption-bottom text-sm">
        <thead className="scrollable sticky top-0 bg-muted/40">
          <tr className="border-b transition-colors hover:bg-muted/50">
            {columns.map((column) => (
              <th
                key={String(column.key)}
                className="h-12 px-4 text-left align-middle text-muted-foreground font-medium"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="border-b bg-card">
          {data.map((row, i) => (
            <tr
              key={String(i)}
              className={cn(
                'border-b transition-colors hover:bg-muted/50',
                onRowClick && 'cursor-pointer'
              )}
              onClick={() => onRowClick?.(row)}
            >
              {columns.map((column) => (
                <td key={String(column.key)} className="p-4 align-middle">
                  {column.render 
                    ? column.render(row[column.key], row)
                    : String(row[column.key] ?? '-')
                  }
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}