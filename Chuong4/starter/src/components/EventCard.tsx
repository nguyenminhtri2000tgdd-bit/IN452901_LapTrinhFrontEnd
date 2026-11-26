import type { EventItem } from '../types'
import { Link } from 'react-router'
import { findClub, getClubImage } from '../data'
import { formatEventTime } from '../lib/format'
import { isAlmostFull, seatsLeft } from '../lib/events'

type EventCardProps = {
  event: EventItem
  past?: boolean // sự kiện đã diễn ra → làm mờ, không hiện số chỗ
}

export function EventCard({ event, past = false }: EventCardProps) {
  const club = findClub(event.clubId)
  const remaining = seatsLeft(event)

  return (
    <article
      className={`group relative flex h-full flex-col rounded-md border border-line bg-surface p-6 transition hover:-translate-y-1 hover:shadow-lg ${
        past ? 'opacity-60' : ''
      }`}
    >
      {/* Thông tin câu lạc bộ */}
      <div className="mb-4 flex items-center gap-3">
        <img
          src={getClubImage(event.clubId)}
          alt={`Biểu tượng ${club?.name ?? 'CLB'}`}
          className="h-12 w-12 rounded-md object-cover"
        />

        <div className="flex-1">
          <p className="text-sm font-semibold text-primary">
            {club?.name ?? 'CLB'}
          </p>

          {/* Nhãn trạng thái */}
          {past ? (
            <span className="text-xs font-semibold text-ink-muted">
              Đã diễn ra
            </span>
          ) : remaining === 0 ? (
            <span className="text-xs font-semibold text-danger">
              Hết chỗ
            </span>
          ) : isAlmostFull(event) ? (
            <span className="text-xs font-semibold text-warning">
              Sắp hết chỗ
            </span>
          ) : null}
        </div>
      </div>

      {/* Tên sự kiện */}
      <h3 className="mb-3 text-lg font-bold text-ink">
        <Link
          to={`/events/${event.id}`}
          className="after:absolute after:inset-0 after:content-['']"
        >
          {event.name}
        </Link>
      </h3>

      {/* Thời gian */}
      <p className="mb-2 text-sm text-ink-muted">
        <time dateTime={event.startTime}>
          {formatEventTime(event.startTime)}
        </time>
      </p>

      {/* Địa điểm */}
      <p className="mb-3 text-sm text-ink-muted">
        Địa điểm: {event.location}
      </p>

      {/* Mô tả */}
      <p className="mb-4 flex-1 text-sm text-ink-muted">
        {event.description}
      </p>

      {/* Số chỗ còn lại */}
      {!past && (
        <div className="border-t border-line pt-3 text-sm font-semibold">
          {remaining > 0 ? (
            <span className="text-success">
              Còn {remaining}/{event.capacity} chỗ
            </span>
          ) : (
            <span className="text-danger">Đã hết chỗ</span>
          )}
        </div>
      )}
    </article>
  )
}
