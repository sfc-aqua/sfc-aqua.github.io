import type { Metadata } from "next"
import Image from "next/image"
import { studentActivities, type StudentActivity } from "./activities-data"

export const metadata: Metadata = {
  title: "Student Activities | AQUA",
  description:
    "News and achievements from students in the AQUA research group.",
}

const dateFormatter = new Intl.DateTimeFormat("en", {
  year: "numeric",
  month: "long",
  day: "numeric",
  timeZone: "UTC",
})

function formatDate(date: string) {
  const parsedDate = new Date(`${date}T00:00:00Z`)
  return Number.isNaN(parsedDate.getTime())
    ? date
    : dateFormatter.format(parsedDate)
}

function ActivityCard({ activity }: { activity: StudentActivity }) {
  return (
    <article className="grid overflow-hidden rounded-2xl border border-base-content/10 bg-base-200 shadow-sm transition-shadow hover:shadow-md md:grid-cols-[minmax(0,1.35fr)_minmax(16rem,0.65fr)]">
      <div className="flex flex-col p-6 md:p-8">
        <time
          className="mb-3 font-mono text-sm font-semibold tracking-wide text-[rgb(var(--aqua-particle-rgb))]"
          dateTime={activity.date}
        >
          {formatDate(activity.date)}
        </time>

        <h2 className="mb-3 text-2xl font-bold leading-tight md:text-3xl">
          {activity.title}
        </h2>
        <p className="mb-6 max-w-3xl leading-7 text-base-content/80">
          {activity.description}
        </p>

        <div className="mt-auto space-y-5">
          <div>
            <h3 className="mb-2 text-xs font-bold uppercase tracking-widest text-base-content/60">
              {activity.students.length === 1 ? "Student" : "Students"}
            </h3>
            <div className="flex flex-wrap gap-2">
              {activity.students.map((student) => (
                <span
                  className="badge h-auto rounded-full border-transparent bg-[rgb(var(--aqua-particle-rgb))] px-3 py-2 font-semibold text-base-100"
                  key={student}
                >
                  {student}
                </span>
              ))}
            </div>
          </div>

          {activity.links.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {activity.links.map((link) => (
                <a
                  className="btn btn-outline btn-sm rounded-full border-[rgb(var(--aqua-particle-rgb))] text-[rgb(var(--aqua-particle-rgb))] hover:border-[rgb(var(--aqua-particle-rgb))] hover:bg-[rgb(var(--aqua-particle-rgb))] hover:text-base-100"
                  href={link.url}
                  key={`${link.label}-${link.url}`}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {link.label}
                  <span aria-hidden="true">↗</span>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="relative min-h-64 border-t border-base-content/10 bg-base-300 md:min-h-full md:border-l md:border-t-0">
        {activity.photo ? (
          <Image
            alt={activity.photo.alt}
            className="object-cover"
            fill
            sizes="(max-width: 768px) 100vw, 35vw"
            src={activity.photo.src}
            unoptimized
          />
        ) : activity.photoStatus === "pending" ? (
          <div className="achievement-accent absolute inset-0 grid place-items-center bg-gradient-to-br from-[rgba(var(--achievement-accent-rgb),0.28)] via-base-300 to-[rgba(var(--achievement-accent-rgb),0.08)]">
            <div className="text-center text-base-content/70">
              <div className="mb-3 text-4xl" aria-hidden="true">
                ◇
              </div>
              <p className="font-medium">Photo will be added soon</p>
            </div>
          </div>
        ) : (
          <div className="absolute inset-0 grid place-items-center bg-gradient-to-br from-[rgba(var(--aqua-particle-rgb),0.18)] via-base-300 to-base-200">
            <div className="px-6 text-center">
              <p className="font-mono text-sm font-bold uppercase tracking-[0.2em] text-[rgb(var(--aqua-particle-rgb))]">
                AQUA Student Achievement
              </p>
              <p className="mt-3 text-xl font-bold">{activity.title}</p>
            </div>
          </div>
        )}
      </div>
    </article>
  )
}

export default function StudentActivitiesPage() {
  const activities = [...studentActivities].sort((first, second) =>
    second.date.localeCompare(first.date)
  )

  return (
    <main className="mx-auto min-h-screen w-full max-w-6xl px-4 py-12 md:px-8 md:py-20">
      <header className="mb-12 max-w-3xl">
        <p className="mb-3 font-mono text-sm font-semibold uppercase tracking-[0.2em] text-[rgb(var(--aqua-particle-rgb))]">
          AQUA student news
        </p>
        <h1 className="mb-5 text-4xl font-bold tracking-tight md:text-6xl">
          Student Activities
        </h1>
        <p className="text-lg leading-8 text-base-content/70">
          Celebrating our students&apos; research, awards, presentations,
          projects, and contributions to the quantum community.
        </p>
      </header>

      {activities.length > 0 ? (
        <section className="space-y-8" aria-label="Student achievements">
          {activities.map((activity) => (
            <ActivityCard
              activity={activity}
              key={`${activity.date}-${activity.title}`}
            />
          ))}
        </section>
      ) : (
        <section className="rounded-2xl border border-dashed border-base-content/20 bg-base-200/60 px-6 py-16 text-center">
          <h2 className="mb-2 text-xl font-bold">News coming soon</h2>
          <p className="text-base-content/65">
            Student achievements and activities will appear here.
          </p>
        </section>
      )}
    </main>
  )
}
