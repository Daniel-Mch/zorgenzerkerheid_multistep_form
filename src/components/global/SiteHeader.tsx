export function SiteHeader() {
  return (
    <header className="border-b border-slate-200">
      <div className="mx-auto flex w-full max-w-2xl items-center px-4 py-4">
        <a
          href="https://www.zorgenzekerheid.nl/home"
          className="inline-flex rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <img
            src={`${import.meta.env.BASE_URL}ZZ logo.svg`}
            alt="Zorg en Zekerheid"
            className="h-10 w-auto"
          />
        </a>
      </div>
    </header>
  )
}
