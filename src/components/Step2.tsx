import type { UseFormRegister, FieldErrors } from "react-hook-form";
import { useTranslation } from "react-i18next";
import type { FormData } from "../App";

interface Step2Props {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
}

const Step2: React.FC<Step2Props> = ({ register, errors }) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium">
          {t("maritalStatus")}
        </label>
        <select
          {...register("maritalStatus", { required: t("required") })}
          className="w-full p-2 border rounded"
          aria-required="true"
        >
          <option value="">{t("select")}</option>
          <option value="single">{t("single")}</option>
          <option value="married">{t("married")}</option>
          <option value="divorced">{t("divorced")}</option>
          <option value="widowed">{t("widowed")}</option>
        </select>
        {errors.maritalStatus && (
          <p className="text-red-600 text-sm">{errors.maritalStatus.message}</p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium">{t("dependents")}</label>
        <input
          type="number"
          {...register("dependents", { required: t("required"), min: 0 })}
          className="w-full p-2 border rounded"
          aria-required="true"
        />
        {errors.dependents && (
          <p className="text-red-600 text-sm">{errors.dependents.message}</p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium">
          {t("employmentStatus")}
        </label>
        <select
          {...register("employmentStatus", { required: t("required") })}
          className="w-full p-2 border rounded"
          aria-required="true"
        >
          <option value="">{t("select")}</option>
          <option value="employed">{t("employed")}</option>
          <option value="unemployed">{t("unemployed")}</option>
          <option value="selfEmployed">{t("selfEmployed")}</option>
          <option value="retired">{t("retired")}</option>
        </select>
        {errors.employmentStatus && (
          <p className="text-red-600 text-sm">
            {errors.employmentStatus.message}
          </p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium">
          {t("monthlyIncome")}
        </label>
        <input
          type="number"
          {...register("monthlyIncome", { required: t("required"), min: 0 })}
          className="w-full p-2 border rounded"
          aria-required="true"
        />
        {errors.monthlyIncome && (
          <p className="text-red-600 text-sm">{errors.monthlyIncome.message}</p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium">
          {t("housingStatus")}
        </label>
        <select
          {...register("housingStatus", { required: t("required") })}
          className="w-full p-2 border rounded"
          aria-required="true"
        >
          <option value="">{t("select")}</option>
          <option value="owned">{t("owned")}</option>
          <option value="rented">{t("rented")}</option>
          <option value="other">{t("otherHousing")}</option>
        </select>
        {errors.housingStatus && (
          <p className="text-red-600 text-sm">{errors.housingStatus.message}</p>
        )}
      </div>
    </div>
  );
};

export default Step2;
