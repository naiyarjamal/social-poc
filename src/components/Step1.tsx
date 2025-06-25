import type { UseFormRegister, FieldErrors } from "react-hook-form";
import { useTranslation } from "react-i18next";
import type { FormData } from "../App";

interface Step1Props {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
}

const Step1: React.FC<Step1Props> = ({ register, errors }) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium">{t("name")}</label>
        <input
          {...register("name", { required: t("required") })}
          className="w-full p-2 border rounded"
          aria-required="true"
        />
        {errors.name && (
          <p className="text-red-600 text-sm">{errors.name.message}</p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium">{t("nationalId")}</label>
        <input
          {...register("nationalId", { required: t("required") })}
          className="w-full p-2 border rounded"
          aria-required="true"
        />
        {errors.nationalId && (
          <p className="text-red-600 text-sm">{errors.nationalId.message}</p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium">{t("dob")}</label>
        <input
          type="date"
          {...register("dob", { required: t("required") })}
          className="w-full p-2 border rounded"
          aria-required="true"
        />
        {errors.dob && (
          <p className="text-red-600 text-sm">{errors.dob.message}</p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium">{t("gender")}</label>
        <select
          {...register("gender", { required: t("required") })}
          className="w-full p-2 border rounded"
          aria-required="true"
        >
          <option value="">{t("select")}</option>
          <option value="male">{t("male")}</option>
          <option value="female">{t("female")}</option>
          <option value="other">{t("other")}</option>
        </select>
        {errors.gender && (
          <p className="text-red-600 text-sm">{errors.gender.message}</p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium">{t("address")}</label>
        <input
          {...register("address", { required: t("required") })}
          className="w-full p-2 border rounded"
          aria-required="true"
        />
        {errors.address && (
          <p className="text-red-600 text-sm">{errors.address.message}</p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium">{t("city")}</label>
        <input
          {...register("city", { required: t("required") })}
          className="w-full p-2 border rounded"
          aria-required="true"
        />
        {errors.city && (
          <p className="text-red-600 text-sm">{errors.city.message}</p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium">{t("state")}</label>
        <input
          {...register("state", { required: t("required") })}
          className="w-full p-2 border rounded"
          aria-required="true"
        />
        {errors.state && (
          <p className="text-red-600 text-sm">{errors.state.message}</p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium">{t("country")}</label>
        <input
          {...register("country", { required: t("required") })}
          className="w-full p-2 border rounded"
          aria-required="true"
        />
        {errors.country && (
          <p className="text-red-600 text-sm">{errors.country.message}</p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium">{t("phone")}</label>
        <input
          {...register("phone", {
            required: t("required"),
            pattern: { value: /^\+?\d{10,}$/, message: t("invalidPhone") },
          })}
          className="w-full p-2 border rounded"
          aria-required="true"
        />
        {errors.phone && (
          <p className="text-red-600 text-sm">{errors.phone.message}</p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium">{t("email")}</label>
        <input
          type="email"
          {...register("email", {
            required: t("required"),
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: t("invalidEmail"),
            },
          })}
          className="w-full p-2 border rounded"
          aria-required="true"
        />
        {errors.email && (
          <p className="text-red-600 text-sm">{errors.email.message}</p>
        )}
      </div>
    </div>
  );
};

export default Step1;
