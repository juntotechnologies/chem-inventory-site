/** The three header and menu actions, shared so the labels and links live in one place. */
import { ArrowUpRight } from "lucide-react"

import { UI_LABELS } from "@/app/ui-labels"
import { Button } from "@/components/ui/button"

type ActionProps = { size?: "default" | "sm" }
type BookingProps = ActionProps & { variant?: "default" | "outline" }

export function DemoAction({ size = "default" }: ActionProps) {
  return (
    <Button asChild size={size} variant="outline">
      <a href={UI_LABELS.links.staticDemo}>
        {UI_LABELS.actions.staticDemo}
        <ArrowUpRight />
      </a>
    </Button>
  )
}

export function BookingAction({ size = "default", variant = "outline" }: BookingProps) {
  return (
    <Button asChild size={size} variant={variant}>
      <a href={UI_LABELS.links.booking} target="_blank" rel="noopener noreferrer">{UI_LABELS.actions.bookMeeting}</a>
    </Button>
  )
}

export function ContactAction({ size = "default" }: ActionProps) {
  return (
    <Button asChild size={size}>
      <a href={UI_LABELS.mailto.cimsQuery}>{UI_LABELS.actions.contactUs}</a>
    </Button>
  )
}
