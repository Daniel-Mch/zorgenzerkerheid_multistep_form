import type { PropsWithChildren } from "react"

export function FormContainer({ children }: PropsWithChildren) {
  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-8 sm:px-6 sm:py-12 lg:py-16">
      <div className="bg-white sm:rounded-2xl sm:p-8 sm:shadow-sm sm:ring-1 sm:ring-slate-200 lg:p-10">
        {children}
      </div>
    </div>
  )
}
