import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/** Buttons and button-styled links. 44px tall by default to stay comfortable on touch screens. */
export const actionVariants = cva(
  "group/action relative inline-flex shrink-0 items-center justify-center gap-2 rounded-[var(--button-radius)] border font-medium whitespace-nowrap transition-[background-color,border-color,color,box-shadow,translate] duration-200 ease-out select-none active:translate-y-px disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "border-transparent bg-primary text-primary-foreground shadow-[0_0_0_0_var(--signal)] hover:bg-[color-mix(in_oklab,var(--primary),white_14%)] hover:shadow-[0_8px_28px_-10px_var(--signal)]",
        outline:
          "border-border-strong bg-[color-mix(in_oklab,var(--background)_60%,transparent)] text-foreground backdrop-blur-sm hover:border-data hover:text-foreground",
        ghost: "border-transparent text-foreground hover:bg-[color-mix(in_oklab,var(--foreground)_7%,transparent)]",
      },
      size: {
        md: "h-11 px-5 text-[0.9375rem] [&_svg]:size-4",
        sm: "h-9 px-3.5 text-sm [&_svg]:size-4",
        icon: "size-10 [&_svg]:size-[18px]",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export type ActionVariantProps = VariantProps<typeof actionVariants>;

export function actionClass(props: ActionVariantProps & { className?: string }) {
  const { className, ...rest } = props;
  return cn(actionVariants(rest), className);
}
