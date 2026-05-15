import Image from 'next/image';
import {
  MaterialIcon,
  pageContainerClass,
  pageShellClass,
} from './ContactArtistShared';
import { useContactStatusData } from '@/hooks/booking/useContactStatusData';

export default function ContactStatus() {
  const {
    timeline,
    artistImageSrc,
    userProfileImageSrc,
    currentArtistIndex,
    totalArtists,
    isLoading,
    error,
  } = useContactStatusData();

  return (
    <div className={`${pageShellClass} md:flex md:flex-col`}>
      <nav className="sticky top-0 z-50 flex h-20 items-center justify-between border-b border-primary-100 bg-white/80 px-6 shadow-[0_4px_20px_-10px_rgba(107,30,71,0.08)] backdrop-blur-md dark:border-neutral-800 dark:bg-neutral-900/80">
        <div className="text-2xl font-semibold tracking-tight text-primary-700 dark:text-primary-300">
          LuxeGloss
        </div>
        <div className="flex items-center gap-4">
          <button
            type="button"
            className="rounded-lg p-2 transition-all hover:bg-primary-100/50 dark:hover:bg-neutral-800"
          >
            <MaterialIcon className="text-foreground">
              notifications
            </MaterialIcon>
          </button>
          <button
            type="button"
            className="rounded-lg p-2 transition-all hover:bg-primary-100/50 dark:hover:bg-neutral-800"
          >
            <MaterialIcon className="text-foreground">
              shopping_bag
            </MaterialIcon>
          </button>
          <div className="h-10 w-10 overflow-hidden rounded-full border-2 border-primary-100">
            {userProfileImageSrc && (
              <Image
                alt="User profile"
                className="h-full w-full object-cover"
                height={40}
                src={userProfileImageSrc}
                width={40}
              />
            )}
          </div>
        </div>
      </nav>

      <main className="py-16 md:px-8 md:py-12">
        <div className={pageContainerClass}>
          <header className="mb-16 text-center">
            <h1 className="h3 !mb-4 !font-semibold tracking-tight text-primary-900 md:!mb-5">
              Contact progress
            </h1>
            <p className="medium-text !mb-0 text-muted-foreground">
              Track the live status while we wait for the selected artist to
              confirm.
            </p>
          </header>

          <section className="mx-auto max-w-md md:mx-auto md:max-w-5xl md:rounded-[40px] md:border md:border-primary-100 md:bg-card md:px-10 md:py-10 md:shadow-[0_20px_60px_rgba(107,30,71,0.08)] md:max-w-none md:grid md:grid-cols-[0.9fr_1.1fr] md:items-start md:gap-12">
            <div className="mb-10 flex flex-col items-center text-center md:mb-0">
              <div className="relative mb-8 flex h-48 w-48 items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-primary-100 opacity-20" />
                <div className="absolute inset-0 rounded-full bg-primary-200 opacity-30" />
                <div className="relative h-40 w-40 overflow-hidden rounded-full border-4 border-white shadow-xl shadow-primary-900/10">
                  {artistImageSrc && (
                    <Image
                      alt="Artist studio visual"
                      className="h-full w-full object-cover"
                      height={160}
                      src={artistImageSrc}
                      width={160}
                    />
                  )}
                </div>
                <div className="absolute bottom-4 right-4 h-6 w-6 rounded-full border-4 border-white bg-primary-700" />
              </div>

              <h2 className="h4 !mb-2 !text-center !font-semibold text-primary-800">
                {currentArtistIndex > 0 && totalArtists > 0
                  ? `Trying Artist ${currentArtistIndex} of ${totalArtists}`
                  : null}
              </h2>
              <div className="inline-flex items-center gap-2 rounded-full bg-primary-100 px-4 py-1.5">
                <MaterialIcon className="text-sm text-primary-600">
                  schedule
                </MaterialIcon>
                <span className="label !mb-0 font-semibold text-primary-700">
                  10:00
                </span>
              </div>
            </div>

            <div className="space-y-4 md:pt-4">
              {timeline.map(item => (
                <div
                  key={item.title}
                  className={`flex items-center gap-4 rounded-2xl border p-5 ${
                    item.state === 'active'
                      ? 'border-primary-100 bg-white shadow-sm ring-2 ring-primary-200/50'
                      : item.state === 'complete'
                        ? 'border-primary-100 bg-white/60'
                        : 'bg-white/40 opacity-60'
                  }`}
                >
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full ${item.state === 'complete' ? 'bg-emerald-50' : item.state === 'active' ? 'bg-primary-100' : 'bg-zinc-100'}`}
                  >
                    {item.state === 'complete' ? (
                      <MaterialIcon className="text-emerald-600" filled>
                        check_circle
                      </MaterialIcon>
                    ) : item.state === 'active' ? (
                      <MaterialIcon
                        className="animate-spin text-primary-600"
                        filled
                      >
                        progress_activity
                      </MaterialIcon>
                    ) : (
                      <MaterialIcon className="text-zinc-400">
                        event_available
                      </MaterialIcon>
                    )}
                  </div>

                  <div className="flex-1">
                    <p
                      className={`label !mb-0 font-semibold ${item.state === 'pending' ? 'text-zinc-600' : 'text-primary-900'}`}
                    >
                      {item.title}
                    </p>
                    {item.detail ? (
                      <p
                        className={`small-text !mb-0 ${item.state === 'complete' ? 'text-emerald-600' : 'text-primary-400'}`}
                      >
                        {item.detail}
                      </p>
                    ) : null}
                  </div>

                  {item.state === 'active' ? (
                    <MaterialIcon className="text-primary-300">
                      chevron_right
                    </MaterialIcon>
                  ) : null}
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      <div className="fixed bottom-0 left-0 z-50 w-full md:static md:mx-auto md:mt-10 md:max-w-5xl md:px-8 md:pb-0">
        <div className="bg-gradient-to-t from-white via-white to-transparent px-6 pb-6 pt-4 md:bg-none md:px-0 md:pb-0 md:pt-0">
          <button
            type="button"
            className="label !mb-0 flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-primary-700 font-semibold text-white shadow-lg shadow-primary-900/20 transition-transform active:scale-[0.98] md:mx-auto md:max-w-md"
          >
            <MaterialIcon className="text-lg" filled>
              bolt
            </MaterialIcon>
            Switch to faster search
          </button>
        </div>

        <nav className="flex items-center justify-around rounded-t-[32px] border-t border-primary-100/20 bg-white/95 px-4 pb-8 pt-3 shadow-[0_-4px_20px_0_rgba(107,30,71,0.05)] backdrop-blur-xl dark:border-primary-100/20 dark:bg-zinc-950/95 md:mx-auto md:mt-4 md:max-w-5xl md:rounded-[28px] md:border md:border-primary-100 md:px-6 md:py-4 md:shadow-[0_20px_60px_rgba(107,30,71,0.08)]">
          <button
            type="button"
            className="flex flex-col items-center justify-center px-4 py-2 text-zinc-400 transition-all duration-200 hover:bg-primary-100/30 active:scale-95 dark:text-zinc-500 dark:hover:bg-primary-900/10 md:flex-1"
          >
            <MaterialIcon className="mb-1">search</MaterialIcon>
            <span className="micro !mb-0 font-semibold">Discover</span>
          </button>
          <button
            type="button"
            className="flex flex-col items-center justify-center rounded-2xl bg-primary-100/50 px-4 py-2 text-primary-700 transition-all duration-200 active:scale-95 dark:bg-primary-900/20 dark:text-primary-300 md:flex-1"
          >
            <MaterialIcon className="mb-1" filled>
              calendar_month
            </MaterialIcon>
            <span className="micro !mb-0 font-semibold">Bookings</span>
          </button>
          <button
            type="button"
            className="flex flex-col items-center justify-center px-4 py-2 text-zinc-400 transition-all duration-200 hover:bg-primary-100/30 active:scale-95 dark:text-zinc-500 dark:hover:bg-primary-900/10 md:flex-1"
          >
            <MaterialIcon className="mb-1">favorite</MaterialIcon>
            <span className="micro !mb-0 font-semibold">Favorites</span>
          </button>
          <button
            type="button"
            className="flex flex-col items-center justify-center px-4 py-2 text-zinc-400 transition-all duration-200 hover:bg-primary-100/30 active:scale-95 dark:text-zinc-500 dark:hover:bg-primary-900/10 md:flex-1"
          >
            <MaterialIcon className="mb-1">person</MaterialIcon>
            <span className="micro !mb-0 font-semibold">Profile</span>
          </button>
        </nav>
      </div>
    </div>
  );
}
