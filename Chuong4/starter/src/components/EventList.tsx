
import type { EventItem } from '../types'
import { EventCard } from './EventCard'
import { isPast } from '../lib/events'

type EventListProps = {
  events: EventItem[]
  now: Date
}

export function EventList({ events, now }: EventListProps) {
  // Kiểm tra danh sách rỗng
  if (events.length === 0) {
    return (
      <p className="rounded-md border border-dashed border-line bg-surface p-8 text-center text-ink-muted">
        Không có sự kiện nào phù hợp…
      </p>
    )
  }

  // Hiển thị danh sách sự kiện
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(min(16rem,100%),1fr))] gap-6">
      {events.map((event) => (
        <EventCard
          key={event.id}
          event={event}
          past={isPast(event, now)}
        />
      ))}
    </div>
  )
}
