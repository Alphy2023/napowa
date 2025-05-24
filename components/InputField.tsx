import React from "react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FIELDTYPES,FieldType } from "@/lib/utils";
import { Button } from "@/components/ui/button";
// import { PhoneInput } from "@/components/custom/PhoneInput";
import { BookOpen, Eye, EyeOff } from "lucide-react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { cn } from "@/lib/utils";
import { ControllerRenderProps, FieldValues, Path, UseFormReturn } from "react-hook-form";
// import { Switch } from "@/coponents/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";


type OptionItem = {
  label: string
  value: string
}

type OptionGroup = {
  label?: string
  items: OptionItem[]
}

type InputFieldProps<T extends FieldValues> = {
  form: UseFormReturn<T>
  name: Path<T>
  fieldType: FieldType
  type?: string
  label?: string;
  checkboxLabel?:string | React.ReactNode;
  description?: string
  placeholder?: string
  options?: OptionGroup[] | OptionItem[];
  [key: string]: any
}


export const InputField = <T extends FieldValues>({
  form,
  ...props
}: InputFieldProps<T>) => {
    const {name}=props;
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <RenderField
          {...props}
          form={form}
          field={field}
        />
      )}
    />
  )
}
type RenderFieldProps<T extends FieldValues> = InputFieldProps<T> & {
  field: ControllerRenderProps<T, any>
}


const RenderField = <T extends FieldValues>({
  fieldType,
  field,
  form,
  placeholder,
  label,
  checkboxLabel,
  description,
  type,
  options = [],
  ...rest
}: RenderFieldProps<T>) => {
  const [showPassword, setShowPassword] = React.useState<boolean>(false)
  const [inputType, setInputType] = React.useState<string>(type || "text")

  let FieldComponent: React.ReactNode = null

  switch (fieldType) {
    case FIELDTYPES.INPUT:
      FieldComponent = (
        <div className="relative">
          <Input
            placeholder={placeholder}
            className="text-[14px]"
            type={inputType}
            {...field}
            {...rest}
          />
          {type === "password" && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
              onClick={() => {
                setShowPassword(!showPassword)
                setInputType((prev) => (prev === "password" ? "text" : "password"))
              }}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4 text-muted-foreground" />
              ) : (
                <Eye className="h-4 w-4 text-muted-foreground" />
              )}
              <span className="sr-only">
                {showPassword ? "Hide password" : "Show password"}
              </span>
            </Button>
          )}
        </div>
      )
      break

    case FIELDTYPES.TEXTAREA:
      FieldComponent = (
        <Textarea
          placeholder={placeholder}
          rows={6}
          className="resize-none"
          {...field}
          {...rest}
        />
      )
      break

   case FIELDTYPES.SELECT:
    FieldComponent = (
      <Select onValueChange={field.onChange} defaultValue={field.value}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {(options || []).map((groupOrItem, index) => {
            // Check if this is a group (has 'items') or a flat option
            if ("items" in groupOrItem) {
              // It's a group
              return (
                <SelectGroup key={index}>
                  {groupOrItem.label && <SelectLabel>{groupOrItem.label}</SelectLabel>}
                  {groupOrItem.items.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              );
            } else {
              // It's a flat option
              return (
                <SelectItem key={groupOrItem.value} value={groupOrItem.value}>
                  {groupOrItem.label}
                </SelectItem>
              );
            }
          })}
        </SelectContent>
      </Select>
    );
    break;

  //  case FIELDTYPES.SWITCH:
  //   FieldComponent = (
  //     <div className="flex items-center space-x-2">
  //       <Switch
  //         checked={field.value}
  //         onCheckedChange={field.onChange}
  //         {...rest}
  //       />
  //       <span className="text-sm text-muted-foreground">{label}</span>
  //     </div>
  //   )
  //   break
    case FIELDTYPES.CHECKBOX:
    FieldComponent = (
      <div className="flex items-center space-x-2">
        <Checkbox
          checked={field.value}
          onCheckedChange={field.onChange}
          id={field.name}
          {...rest}
        />
       <FormLabel htmlFor={field.name}>{checkboxLabel}</FormLabel>
      </div>
    )
    break


    case FIELDTYPES.OTP:
      FieldComponent = (
        <InputOTP maxLength={6} {...field} {...rest}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      )
      break

    case FIELDTYPES.COMBOBOX:
      FieldComponent = (
        <Popover>
          <PopoverTrigger asChild>
            <FormControl>
              <Button
                variant="outline"
                role="combobox"
                className={cn(
                  "w-full justify-between",
                  !field.value && "text-muted-foreground"
                )}
              >
                {field.value
                  ? options
                      .flatMap((group) => group.items)
                      .find((item) => item.value === field.value)?.label
                  : placeholder || "Select"}
                <ChevronsUpDown className="opacity-50" />
              </Button>
            </FormControl>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0">
            <Command>
              <CommandInput
                placeholder={`Search ${placeholder || ""}...`}
                className="h-9"
              />
              <CommandList>
                <CommandEmpty>No options found.</CommandEmpty>
                <CommandGroup>
                  {options.flatMap((group) =>
                    group?.items?.map((item) => (
                      <CommandItem
                        key={item.value}
                        value={item.label}
                        onSelect={() => {
                          form.setValue(field.name, item.value as any)
                        }}
                      >
                        {item.label}
                        <Check
                          className={cn(
                            "ml-auto",
                            item.value === field.value
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    ))
                  )}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      )
      break

    default:
      return null
  }

  return (
    <FormItem>
      {label && !checkboxLabel && <FormLabel>{label}</FormLabel>}
      <FormControl>{FieldComponent}</FormControl>
      {description && <FormDescription>{description}</FormDescription>}
      <FormMessage />
    </FormItem>
  )
}


