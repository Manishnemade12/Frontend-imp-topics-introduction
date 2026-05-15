import Image from 'next/image';
import { useEffect } from 'react';
import { useBookingChooseData } from '@/hooks/booking/useBookingChooseData';
import {
  MaterialIcon,
  cardClass,
  pageContainerClass,
  pageShellClass,
} from './ContactArtistShared';

export default function BookingChoose() {
  const {
    loadBookingChooseData,
    avatars,
    statuses,
    isLoading,
    error,
  } = useBookingChooseData();

  useEffect(() => {
    loadBookingChooseData();
  }, [loadBookingChooseData]);

  return (
    <div className={`${pageShellClass} !bg-background !text-foreground`}>
      <main className="py-16">
        <div className={pageContainerClass}>
          <header className="mb-16 text-center">
            <h1 className="h3 !mb-4 !font-semibold tracking-tight text-primary-900 md:!mb-5">
              Choose your booking style
            </h1>
            <p className="medium-text !mb-0 text-muted-foreground">
              Select how you&apos;d like us to find the perfect professional for
              your beauty session.
            </p>
          </header>

          <div className="grid gap-8 lg:grid-cols-2">
            <article
              className={`${cardClass} group relative flex flex-col p-6 !border-primary-100 !shadow-[0_10px_40px_rgba(107,30,71,0.06)] transition-all duration-300 hover:-translate-y-1 hover:!shadow-[0_20px_40px_-10px_rgba(107,30,71,0.1)] sm:p-10`}
            >
              <div className="absolute right-8 top-8">
                <span className="label !mb-0 rounded-full bg-primary-100 px-4 py-1 font-semibold text-primary-700">
                  Recommended
                </span>
              </div>
              <div className="mb-8">
                <div className="mb-2 flex items-center gap-2">
                  <MaterialIcon className="text-primary-700" filled>
                    bolt
                  </MaterialIcon>
                  <span className="label !mb-0 uppercase tracking-widest text-primary-700">
                    Fastest
                  </span>
                </div>
                <h2 className="h4 !mb-6 !text-left !font-semibold tracking-tight text-primary-900">
                  Find fastest
                </h2>
                <div className="mb-6 rounded-2xl border border-primary-100/60 bg-card p-6">
                  <div className="relative mb-6 flex items-center justify-around">
                    <div className="absolute left-0 top-1/2 z-0 h-px w-full -translate-y-1/2 bg-primary-100" />
                    {avatars.map((src, index) => (
                      <div
                        key={src}
                        className={`relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-white p-1 ${
                          index === 1
                            ? 'scale-110 border-4 border-primary-400 shadow-lg shadow-primary-100'
                            : index === 2
                              ? 'opacity-40 border-2 border-stone-200'
                              : 'border-2 border-primary-200'
                        }`}
                      >
                        <Image
                          alt={`Artist ${index + 1}`}
                          className="h-full w-full rounded-full object-cover"
                          height={64}
                          src={src}
                          width={64}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="mb-4 flex items-center justify-center gap-1">
                    {statuses.map((status, index) => (
                      <span
                        key={status}
                        className={`small-text !mb-0 ${index === 0 ? 'font-semibold text-primary-700' : 'text-muted-foreground'}`}
                      >
                        {status}
                      </span>
                    ))}
                  </div>
                  <p className="micro !mb-0 text-center italic text-muted-foreground">
                    &quot;All artists are being contacted simultaneously&quot;
                  </p>
                </div>
              </div>
              <div className="mt-auto">
                <button
                  type="button"
                  className="w-full rounded-2xl bg-primary-700 py-5 font-semibold !text-white transition-all hover:bg-primary-800 active:scale-[0.98]"
                >
                  Find fastest
                </button>
              </div>
            </article>

            <article
              className={`${cardClass} group flex flex-col p-6 !border-primary-100 !shadow-[0_10px_40px_rgba(107,30,71,0.06)] transition-all duration-300 hover:-translate-y-1 hover:!shadow-[0_20px_40px_-10px_rgba(107,30,71,0.05)] sm:p-10`}
            >
              <div className="mb-8">
                <div className="mb-2 flex items-center gap-2">
                  <MaterialIcon className="text-primary-700">
                    verified
                  </MaterialIcon>
                  <span className="label !mb-0 uppercase tracking-widest text-primary-700">
                    Priority Select
                  </span>
                </div>
                <h2 className="h4 !mb-6 !text-left !font-semibold tracking-tight text-primary-900">
                  Follow priority
                </h2>
                <div className="relative mb-6 flex min-h-[160px] items-center gap-6 overflow-hidden rounded-2xl border border-primary-100/60 bg-card p-6">
                  <div className="relative z-10 flex flex-col gap-6">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-primary-100 bg-white shadow-sm">
                        <MaterialIcon className="text-primary-900">
                          looks_one
                        </MaterialIcon>
                      </div>
                      <div className="h-[2px] w-6 bg-primary-100" />
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-primary-100 bg-primary-100 shadow-sm">
                        <MaterialIcon className="text-primary-900">
                          looks_two
                        </MaterialIcon>
                      </div>
                    </div>
                    <p className="small-text !mb-0 max-w-[65%] leading-relaxed text-muted-foreground">
                      We&apos;ll try your selected artists one by one in order (10
                      minutes each)
                    </p>
                  </div>
                  <div className="pointer-events-none absolute -right-8 -top-4 h-40 w-40 rotate-12 opacity-80">
                    <Image
                      alt="Decorative swirl"
                      className="h-full w-full rounded-2xl object-cover shadow-xl shadow-primary-100/20"
                      height={160}
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuAE8aHSZ2-Ge5VybAqa1THIUSxUa0AoWkVz9BIlBwhl6Nvdr3jpIiyOIzZie6ODjxZbs06ya056it0MS3vrC74ZVpF_7EyO62eTUkoNUdRYKIO0B4tC2RwqEN5SOP4aQeTcFswAotwHWZn-FesJ--yJ5K61f3CMIcr4EAGZTZI-QXLjw7xqRKDMkVW0hSdnukukRk5sIkoclfo5Tr__q-eWRTEAz56vMxc3OSaXjCLVk7HEGc8heS_ygfGb6eF5SMidPUw_fIfbOB4"
                      width={160}
                    />
                  </div>
                </div>
              </div>
              <div className="mt-auto">
                <button
                  type="button"
                  className="w-full rounded-2xl bg-primary-700 py-5 font-semibold !text-white transition-all hover:bg-primary-800 active:scale-[0.98]"
                >
                  Follow my order
                </button>
              </div>
            </article>
          </div>

          <section className="mb-16 border-t border-primary-100 pt-16">
            <h3 className="h5 !mb-12 !font-semibold text-center text-primary-900">
              How this works
            </h3>
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
              <div>
                <h4 className="label !mb-6 !text-left uppercase tracking-widest text-primary-700">
                  Fastest Search
                </h4>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <MaterialIcon className="mt-0.5 text-primary-300" filled>
                      check_circle
                    </MaterialIcon>
                    <span className="small-text !mb-0 text-muted-foreground">
                      All chosen artists receive your request instantly.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <MaterialIcon className="mt-0.5 text-primary-300" filled>
                      check_circle
                    </MaterialIcon>
                    <span className="small-text !mb-0 text-muted-foreground">
                      The first artist to accept gets the booking.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <MaterialIcon className="mt-0.5 text-primary-300" filled>
                      check_circle
                    </MaterialIcon>
                    <span className="small-text !mb-0 text-muted-foreground">
                      Best for urgent needs or flexible preferences.
                    </span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="label !mb-6 !text-left uppercase tracking-widest text-primary-700">
                  Priority Order
                </h4>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <MaterialIcon className="mt-0.5 text-primary-300" filled>
                      check_circle
                    </MaterialIcon>
                    <span className="small-text !mb-0 text-muted-foreground">
                      Artist #1 has 10 minutes to respond.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <MaterialIcon className="mt-0.5 text-primary-300" filled>
                      check_circle
                    </MaterialIcon>
                    <span className="small-text !mb-0 text-muted-foreground">
                      If they decline or timeout, we move to Artist #2.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <MaterialIcon className="mt-0.5 text-primary-300" filled>
                      check_circle
                    </MaterialIcon>
                    <span className="small-text !mb-0 text-muted-foreground">
                      Ensures you get your absolute favorite artist if
                      available.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <p className="micro !mb-0 mx-auto max-w-md text-center italic text-muted-foreground">
            You can switch between these methods at any time during the search
            process from your active booking screen.
          </p>
        </div>
      </main>
    </div>
  );
}
