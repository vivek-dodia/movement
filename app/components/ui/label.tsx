type LabelProps = {
  children: React.ReactNode
} & React.LabelHTMLAttributes<HTMLLabelElement>

export default function Label({ children, ...rest }: LabelProps) {
  return (
    <label
      className="flex items-center gap-2 text-sm font-medium leading-6"
      {...rest}
    >
      {children}
    </label>
  )
}
