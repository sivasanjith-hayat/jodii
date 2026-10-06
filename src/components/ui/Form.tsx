import * as React from 'react'
import { useFormContext, Controller } from 'react-hook-form'
import { cn } from '../../lib/utils'
import { FieldError, FieldValues } from 'react-hook-form'

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  children: React.ReactNode
}

const Form = React.forwardRef<HTMLFormElement, FormProps>(({ className, ...props }, ref) => (
  <form ref={ref} className={cn('space-y-8', className)} {...props} />
))
Form.displayName = 'Form'

interface FormFieldProps<TFieldValues extends FieldValues> {
  control: any
  name: keyof TFieldValues
  render: ({ field, fieldState }: { field: any; fieldState: { error?: FieldError } }) => React.ReactNode
}

function FormField<TFieldValues extends FieldValues>({ control, name, render }: FormFieldProps<TFieldValues>) {
  const { field, fieldState } = control.getField(name)
  return <>{render({ field, fieldState })}</>
}

interface FormItemProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const FormItem = React.forwardRef<HTMLDivElement, FormItemProps>(({ className, children, ...props }, ref) => (
  <div ref={ref} className={cn('space-y-2', className)} {...props}>
    {children}
  </div>
))
FormItem.displayName = 'FormItem'

interface FormLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}

const FormLabel = React.forwardRef<HTMLLabelElement, FormLabelProps>(({ className, ...props }, ref) => (
  <label ref={ref} className={cn('text-sm font-medium leading-none', className)} {...props} />
))
FormLabel.displayName = 'FormLabel'

interface FormControlProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const FormControl = React.forwardRef<HTMLDivElement, FormControlProps>(({ children, className, ...props }, ref) => (
  <div ref={ref} className={cn('pt-1.5', className)} {...props}>
    {children}
  </div>
))
FormControl.displayName = 'FormControl'

interface ErrorMessageProps {
  children?: React.ReactNode
}

const ErrorMessage = ({ children }: ErrorMessageProps) => {
  if (!children) return null
  return <div className="text-xs text-destructive">{children}</div>
}

export { Form, FormField, FormItem, FormLabel, FormControl, ErrorMessage }