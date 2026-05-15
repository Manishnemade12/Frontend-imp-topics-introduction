import Image from 'next/image';
import { useEffect } from 'react';
import { useArtistConfirmationData } from '@/hooks/booking/useArtistConfirmationData';
import {
  MaterialIcon,
  pageContainerClass,
  pageShellClass,
} from './ContactArtistShared';

// Static nav — not driven by API
const bottomNavItems = [
  { label: 'Discover', icon: 'spa', active: false },
  { label: 'Bookings', icon: 'calendar_month', active: true },
  { label: 'Consult', icon: 'video_chat', active: false },
  { label: 'Profile', icon: 'person', active: false },
] as const;

export default function ArtistConfirmation() {
  const {
    loadArtistConfirmationData,
    artistName,
    artistRole,
    artistImageSrc,
    serviceName,
    bookingFacts,
    nextSteps,
  } = useArtistConfirmationData();

  useEffect(() => {
    loadArtistConfirmationData();
  }, [loadArtistConfirmationData]);

  return (
    <div className={`${pageShellClass} md:flex md:flex-col`}>
      <header className="fixed top-0 z-50 w-full border-b border-primary-100 bg-white/90 backdrop-blur-md dark:border-neutral-800 dark:bg-neutral-950/90">
        <div
          className={`${pageContainerClass} flex h-16 items-center justify-between`}
        >
          <button
            type="button"
            aria-label="Go back"
            className="rounded-full p-2 text-primary-700 transition-colors hover:bg-primary-100/50"
          >
            <MaterialIcon>arrow_back</MaterialIcon>
          </button>

          <h1 className="label !mb-0 font-bold uppercase tracking-widest text-primary-800 dark:text-primary-200">
            SERENE
          </h1>

          <button
            type="button"
            aria-label="More options"
            className="rounded-full p-2 text-primary-700 transition-colors hover:bg-primary-100/50"
          >
            <MaterialIcon>more_vert</MaterialIcon>
          </button>
        </div>
      </header>

      <main className="flex-1 px-4 pb-32 pt-24 md:px-8 md:pb-20 md:pt-28">
        <div className={`${pageContainerClass} max-w-md md:max-w-6xl`}>
          <div className="grid gap-6 md:grid-cols-[0.95fr_1.05fr] md:gap-10">

            {/* Left — confirmation hero */}
            <section className="space-y-6 text-center md:rounded-[40px] md:border md:border-primary-100 md:bg-card md:p-10 md:text-left md:shadow-[0_20px_60px_rgba(107,30,71,0.08)]">
              <div className="relative mx-auto mb-2 flex h-40 w-40 items-center justify-center md:mx-0 md:h-48 md:w-48">
                <div className="absolute inset-0 rounded-full bg-primary-100 opacity-20" />
                <div className="absolute inset-0 rounded-full bg-primary-200 opacity-30" />
                <div className="relative flex h-32 w-32 items-center justify-center rounded-full border-4 border-white bg-white shadow-xl shadow-primary-900/10 md:h-40 md:w-40">
                  <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary-700 md:h-28 md:w-28">
                    <MaterialIcon
                      className="text-4xl text-white md:text-5xl"
                      filled
                    >
                      check
                    </MaterialIcon>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h2 className="h3 !mb-0 !font-semibold text-primary-900 md:!text-left">
                  Artist confirmed!
                </h2>
                {artistName && serviceName ? (
                  <p className="medium-text !mb-0 mx-auto max-w-[280px] text-muted-foreground md:mx-0 md:max-w-none">
                    {artistName} is confirmed for your{' '}
                    <span className="font-semibold text-primary-700">
                      {serviceName}
                    </span>
                  </p>
                ) : null}
              </div>
            </section>

            <div className="space-y-6">
              {/* Artist Info + Booking Facts */}
              <section className="rounded-[2rem] border border-primary-100 bg-card p-6 text-left shadow-[0_10px_40px_rgba(107,30,71,0.05)] md:p-8">
                <div className="mb-6 flex items-center gap-4">
                  <div className="h-14 w-14 overflow-hidden rounded-full border-2 border-primary-200 p-0.5">
                    {artistImageSrc && (
                      <Image
                        alt={artistName}
                        className="h-full w-full rounded-full object-cover"
                        height={56}
                        src={artistImageSrc}
                        width={56}
                      />
                    )}
                  </div>
                  <div>
                    <h3 className="label !mb-1 font-semibold text-primary-800">
                      {artistName}
                    </h3>
                    <p className="small-text !mb-0 text-muted-foreground">
                      {artistRole}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 border-t border-primary-100 pt-4 sm:grid-cols-2">
                  {bookingFacts.map((fact, index) => (
                    <div
                      key={fact.label}
                      className={`${index === 2 ? 'sm:col-span-2' : ''} space-y-1 ${index === 1 ? 'sm:text-right' : ''}`}
                    >
                      <p className="micro !mb-0 uppercase tracking-widest text-primary-700/80">
                        {fact.label}
                      </p>
                      <div
                        className={`flex items-center gap-2 text-primary-900 ${index === 1 ? 'sm:justify-end' : ''}`}
                      >
                        <MaterialIcon className="text-sm text-primary-700">
                          {fact.icon}
                        </MaterialIcon>
                        <span className="small-text !mb-0 font-semibold text-primary-900">
                          {fact.value}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Consultation Call */}
              <section className="rounded-[2rem] border border-primary-100 bg-card p-6 text-left shadow-[0_10px_40px_rgba(107,30,71,0.05)] md:p-8">
                <div className="mb-6 flex items-start gap-5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary-100 text-primary-700">
                    <MaterialIcon>phone_callback</MaterialIcon>
                  </div>
                  <div className="flex-1">
                    <h4 className="h5 !mb-4 !text-left !font-semibold text-primary-900">
                      Consultation call will be scheduled
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <MaterialIcon
                          className="mt-0.5 text-primary-300"
                          filled
                        >
                          check_circle
                        </MaterialIcon>
                        <p className="small-text !mb-0 text-muted-foreground">
                          Our team will arrange a quick call with your artist
                        </p>
                      </div>
                      <div className="flex items-start gap-3">
                        <MaterialIcon
                          className="mt-0.5 text-primary-300"
                          filled
                        >
                          check_circle
                        </MaterialIcon>
                        <p className="small-text !mb-0 text-muted-foreground">
                          This helps finalize your look and preferences
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between rounded-2xl border border-primary-100 bg-primary-100/40 px-4 py-4">
                  <span className="micro !mb-0 uppercase tracking-widest text-primary-700/80">
                    Time
                  </span>
                  <span className="small-text !mb-0 font-semibold text-primary-900">
                    Within 15–30 minutes
                  </span>
                </div>

                <button
                  type="button"
                  className="small-text !mb-0 mt-4 w-full cursor-not-allowed rounded-full border border-primary-100 bg-primary-50 py-3.5 font-semibold text-primary-400"
                  disabled
                >
                  View call details
                </button>
                <p className="micro !mb-0 mt-2 text-center uppercase tracking-wider text-muted-foreground">
                  Available once call is scheduled
                </p>
              </section>

              {/* What happens next */}
              <details className="group rounded-[2rem] border border-primary-100 bg-card p-6 text-left shadow-[0_10px_40px_rgba(107,30,71,0.05)] md:p-8">
                <summary className="flex cursor-pointer list-none items-center justify-between py-1 focus:outline-none">
                  <h4 className="label !mb-0 uppercase tracking-widest text-primary-800">
                    What happens next
                  </h4>
                  <MaterialIcon className="text-primary-700 transition-transform group-open:rotate-180">
                    expand_more
                  </MaterialIcon>
                </summary>

                <div className="mt-4 space-y-5">
                  {nextSteps.map((step, index) => (
                    <div key={step} className="flex gap-4">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-700 text-[11px] font-bold text-white">
                        {index + 1}
                      </div>
                      <p className="small-text !mb-0 text-muted-foreground">
                        {step}
                      </p>
                    </div>
                  ))}
                </div>
              </details>

              {/* Support + CTA */}
              <section className="space-y-4 rounded-[2rem] border border-primary-100 bg-card p-6 text-left shadow-[0_10px_40px_rgba(107,30,71,0.05)] md:p-8">
                <div className="space-y-2">
                  <p className="medium-text !mb-0 text-primary-700">
                    Our team will coordinate everything for you
                  </p>
                  <p className="small-text !mb-0 text-muted-foreground">
                    No action needed from your side right now
                  </p>
                </div>

                <div className="flex items-center gap-3 rounded-2xl border border-primary-100 bg-primary-100/40 px-6 py-4">
                  <MaterialIcon className="text-xl text-primary-700">
                    headset_mic
                  </MaterialIcon>
                  <p className="small-text !mb-0 text-muted-foreground">
                    You can reach support anytime if needed
                  </p>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <button
                    type="button"
                    className="small-text !mb-0 w-full rounded-2xl bg-primary-700 py-5 font-semibold text-white shadow-lg shadow-primary-900/20 transition-all hover:bg-primary-800 active:scale-[0.98]"
                  >
                    View booking details
                  </button>
                  <button
                    type="button"
                    className="small-text !mb-0 w-full rounded-2xl border border-primary-200 bg-white py-5 font-semibold text-primary-700 transition-all hover:bg-primary-100 active:scale-[0.98]"
                  >
                    Add to calendar
                  </button>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>

      <div className="fixed bottom-0 left-0 z-50 w-full md:static md:mt-10">
        <div className="bg-gradient-to-t from-white via-white to-transparent px-4 pb-4 pt-6 md:bg-none md:px-0 md:pb-0 md:pt-0">
          <nav className="mx-auto flex max-w-md items-center justify-around rounded-t-[32px] border-t border-primary-100/20 bg-white/95 px-4 pb-8 pt-3 shadow-[0_-4px_20px_0_rgba(107,30,71,0.05)] backdrop-blur-xl md:max-w-6xl md:rounded-[28px] md:border md:border-primary-100 md:px-6 md:py-4 md:shadow-[0_20px_60px_rgba(107,30,71,0.08)]">
            {bottomNavItems.map(item => (
              <a
                key={item.label}
                className={`flex flex-col items-center justify-center px-4 py-2 transition-all duration-300 md:flex-1 ${item.active ? 'text-primary-700' : 'text-primary-700/70 hover:text-primary-800'}`}
                href="#"
              >
                <MaterialIcon className="mb-1" filled={item.active}>
                  {item.icon}
                </MaterialIcon>
                <span className="micro !mb-0 font-semibold">{item.label}</span>
              </a>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
