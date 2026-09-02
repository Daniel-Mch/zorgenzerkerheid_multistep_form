import { useFormContext } from "react-hook-form"
import type { RegistrationFormValues } from "../../../types/registration/registration_schemas"

const inputClassName =
  "w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
const labelClassName = "mb-1 block text-sm font-medium text-slate-700"
const errorClassName = "mt-1 text-sm text-red-600"

export function PersonalInfoStep() {
  const {
    register,
    formState: { errors },
  } = useFormContext<RegistrationFormValues>()

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-slate-900">
        Persoonlijke informatie
      </h2>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="firstName" className={labelClassName}>
            Voornaam
          </label>
          <input
            id="firstName"
            type="text"
            className={inputClassName}
            {...register("personal.firstName")}
          />
          {errors.personal?.firstName && (
            <p className={errorClassName}>
              {errors.personal.firstName.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="lastName" className={labelClassName}>
            Achternaam
          </label>
          <input
            id="lastName"
            type="text"
            className={inputClassName}
            {...register("personal.lastName")}
          />
          {errors.personal?.lastName && (
            <p className={errorClassName}>
              {errors.personal.lastName.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="dateOfBirth" className={labelClassName}>
            Geboortedatum
          </label>
          <input
            id="dateOfBirth"
            type="date"
            className={inputClassName}
            {...register("personal.dateOfBirth")}
          />
          {errors.personal?.dateOfBirth && (
            <p className={errorClassName}>
              {errors.personal.dateOfBirth.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="email" className={labelClassName}>
            E-mailadres
          </label>
          <input
            id="email"
            type="email"
            className={inputClassName}
            {...register("personal.email")}
          />
          {errors.personal?.email && (
            <p className={errorClassName}>{errors.personal.email.message}</p>
          )}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="address" className={labelClassName}>
            Adres
          </label>
          <input
            id="address"
            type="text"
            className={inputClassName}
            {...register("personal.address")}
          />
          {errors.personal?.address && (
            <p className={errorClassName}>
              {errors.personal.address.message}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
