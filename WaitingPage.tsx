import Image from 'next/image';
import { useEffect } from 'react';
import { useWaitingPageData } from '@/hooks/booking/useWaitingPageData';
import { MaterialIcon, pageShellClass } from './ContactArtistShared';

export default function WaitingPage() {
  const {
    loadWaitingPageData,
    steps,
    artistImageSrc,
    isLoading,
    error,
  } = useWaitingPageData();

  useEffect(() => {
    loadWaitingPageData();
  }, [loadWaitingPageData]);

  return (
    <div className={pageShellClass}>
      <main className="mx-auto flex w-full max-w-md flex-1 flex-col bg-[radial-gradient(at_0%_0%,rgba(255,228,230,0.4)_0px,transparent_50%),radial-gradient(at_100%_0%,rgba(254,242,242,0.4)_0px,transparent_50%),radial-gradient(at_100%_100%,rgba(255,228,230,0.4)_0px,transparent_50%),radial-gradient(at_0%_100%,rgba(254,242,242,0.4)_0px,transparent_50%)] px-6 pb-32 pt-24 md:mt-10 md:max-w-5xl md:rounded-[40px] md:border md:border-primary-100 md:bg-card md:px-10 md:pb-24 md:pt-12 md:shadow-[0_20px_60px_rgba(107,30,71,0.08)]">
        <section className="mb-10 flex flex-col items-center text-center">
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
            Waiting for artist confirmation
          </h2>
          <div className="inline-flex items-center gap-2 rounded-full bg-primary-100 px-4 py-1.5">
            <MaterialIcon className="text-sm text-primary-600">
              schedule
            </MaterialIcon>
            <span className="label !mb-0 font-semibold text-primary-700">
              10:00
            </span>
          </div>
        </section>

        <section className="space-y-4">
          {steps.map(step => (
            <div
              key={step.title}
              className={`rounded-2xl border p-5 ${
                step.state === 'done'
                  ? 'flex items-center gap-4 border-primary-100 bg-white/60'
                  : step.state === 'active'
                    ? 'flex items-center gap-4 border-primary-100 bg-white shadow-sm ring-2 ring-primary-200/50'
                    : 'flex items-center gap-4 bg-white/40 opacity-60'
              }`}
            >
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full ${step.state === 'done' ? 'bg-emerald-50' : step.state === 'active' ? 'bg-primary-100' : 'bg-zinc-100'}`}
              >
                {step.state === 'done' ? (
                  <MaterialIcon className="text-emerald-600" filled>
                    check_circle
                  </MaterialIcon>
                ) : step.state === 'active' ? (
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
                  className={`label !mb-0 font-semibold ${step.state === 'pending' ? 'text-zinc-600' : 'text-primary-900'}`}
                >
                  {step.title}
                </p>
                {step.detail ? (
                  <p
                    className={`small-text !mb-0 ${step.state === 'done' ? 'text-emerald-600' : 'text-primary-400'}`}
                  >
                    {step.detail}
                  </p>
                ) : null}
              </div>

              {step.state === 'active' ? (
                <MaterialIcon className="text-primary-300">
                  chevron_right
                </MaterialIcon>
              ) : null}
            </div>
          ))}
        </section>
      </main>

      <div className="fixed bottom-24 left-0 z-50 w-full md:bottom-6 md:left-1/2 md:w-full md:max-w-5xl md:-translate-x-1/2 md:px-10">
        <div className="bg-gradient-to-t from-white via-white to-transparent px-6 pb-6 pt-4 md:flex md:justify-center md:bg-none md:px-0 md:pb-0 md:pt-0">
          <button
            type="button"
            className="label !mb-0 flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-primary-700 font-semibold !text-white shadow-lg shadow-primary-900/20 transition-transform active:scale-[0.98] md:w-full md:max-w-sm md:px-8"
          >
            <MaterialIcon className="text-lg" filled>
              bolt
            </MaterialIcon>
            Switch to faster search
          </button>
        </div>
      </div>
    </div>
  );
}
