import { HTMLAttributes, forwardRef } from "react";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "@/libs/utils";

const HeadingVariants = cva(
  'text-black dark:text-white text-center lg:text-left font-extrabold leading-tight tracking-tighter',
  {
    variants: {
      size: {
        default: 'text-4xl md:text-5xl lg:text-6xl',
        lg: 'text-5xl md:text-6xl lg:text-7xl',
        sm: 'text-2xl md:text-3xl lg:text-4xl',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
)


interface HeadingProps
  extends HTMLAttributes<HTMLHeadingElement>,
  VariantProps<typeof HeadingVariants>{}

const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(({
  className, size, children, ...props
}, ref) => {
  return(
    <h1 ref={ref} {...props} className={cn(HeadingVariants({ size, className}))}>
      {children}
    </h1>
  )
})

Heading.displayName = 'Heading'

export default Heading