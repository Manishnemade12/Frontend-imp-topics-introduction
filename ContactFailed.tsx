import { useEffect } from 'react';
import { useContactFailedData } from '@/hooks/booking/useContactFailedData';
import { MaterialIcon, pageShellClass } from './ContactArtistShared';

export default function ContactFailed() {
  const {
    loadContactFailedData,
    currentAttempt,
    totalAttempts,
    currentArtistIndex,
    totalArtists,
    statusMessage,
    errorBadgeText,
  } = useContactFailedData();

  useEffect(() => {
    loadContactFailedData();
  }, [loadContactFailedData]);

  return (
    <div className={`${pageShellClass} md:flex md:flex-col`}>
      <header
        className="flex items-center justify-between border-b border-primary-100 px-4 py-4"
        data-purpose="app-header"
      >
        <button type="button" aria-label="Go back" className="p-2">
          <svg
            className="h-6 w-6 text-muted-foreground"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <h1 className="text-xl font-extrabold tracking-widest text-primary-800">
          LUXEBEAUTY
        </h1>
        <button type="button" aria-label="More options" className="p-2">
          <svg
            className="h-6 w-6 text-muted-foreground"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </header>

      <main className="flex flex-1 flex-col items-center px-6 pt-8 md:mx-auto md:w-full md:max-w-4xl md:px-8 md:pt-12">
        {/* Progress Bar */}
        <div className="mb-12 w-full" data-purpose="status-progress-bar">
          <div className="mb-2 flex justify-between text-xs font-semibold">
            <span className="text-muted-foreground">
              {currentAttempt > 0 && totalAttempts > 0
                ? `Attempt ${currentAttempt} of ${totalAttempts}`
                : null}
            </span>
            <span className="text-primary-700">Final Status</span>
          </div>
          <div className="flex h-1 gap-2">
            {totalAttempts > 0
              ? Array.from({ length: totalAttempts }).map((_, i) => (
                  <div
                    key={i}
                    className={`flex-1 rounded-full ${
                      i === totalAttempts - 1 ? 'bg-primary-700' : 'bg-gray-200'
                    }`}
                  />
                ))
              : null}
          </div>
        </div>

        {/* Central Graphic */}
        <div
          className="relative mb-8 flex items-center justify-center"
          data-purpose="central-graphic"
        >
          <div
            className="flex h-64 w-64 items-center justify-center overflow-hidden rounded-full bg-[linear-gradient(135deg,var(--color-primary-100)_0%,#fff1f3_25%,var(--color-primary-100)_50%,#fff1f3_75%,var(--color-primary-100)_100%)] shadow-inner animate-pulse"
            style={{ backgroundSize: '400% 400%' }}
          >
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white shadow-sm">
              <svg
                className="h-10 w-10"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                style={{ color: 'var(--color-primary-700)' }}
              >
                <path
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9.75 12.75l4.5 4.5m0-4.5l-4.5 4.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Feedback Message */}
        <div
          className="mb-6 space-y-3 text-center"
          data-purpose="feedback-message"
        >
          <h2 className="h4 !mb-0 !text-center !font-extrabold text-primary-900">
            {currentArtistIndex > 0 && totalArtists > 0
              ? `Trying Artist ${currentArtistIndex} of ${totalArtists}`
              : null}
          </h2>
          <p className="medium-text !mb-0 text-muted-foreground">
            {statusMessage}
          </p>
        </div>

        {/* Error Badge */}
        {errorBadgeText ? (
          <div
            className="label !mb-10 inline-flex items-center gap-2 rounded-full bg-primary-100 px-4 py-2 font-semibold text-primary-700"
            data-purpose="error-badge"
          >
            <MaterialIcon className="text-current" filled>
              error
            </MaterialIcon>
            {errorBadgeText}
          </div>
        ) : null}
      </main>

      <footer
        className="space-y-4 p-6 md:mx-auto md:flex md:w-full md:max-w-4xl md:items-center md:justify-center md:space-y-0 md:gap-4 md:px-8 md:pb-10 md:pt-6"
        data-purpose="footer-actions"
      >
        <button
          type="button"
          className="small-text !mb-0 w-full rounded-2xl bg-primary-700 py-4 font-bold text-white shadow-lg transition-transform active:scale-[0.98] md:w-auto md:flex-1"
        >
          Get help from support
        </button>
        <button
          type="button"
          className="small-text !mb-0 w-full rounded-2xl bg-primary-100 py-4 font-bold text-primary-700 transition-transform active:scale-[0.98] md:w-auto md:flex-1"
        >
          Back to home
        </button>
      </footer>
    </div>
  );
}
