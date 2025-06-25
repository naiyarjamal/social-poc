import type { UseFormRegister, FieldErrors } from "react-hook-form";
import { useTranslation } from "react-i18next";
import type { FormData } from "../App";

interface Step3Props {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
  handleHelpMeWrite: (field: string) => void;
}

const Step3: React.FC<Step3Props> = ({
  register,
  errors,
  handleHelpMeWrite,
}) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium">
          {t("financialSituation")}
        </label>
        <div className="flex gap-2">
          <textarea
            {...register("financialSituation", { required: t("required") })}
            className="w-full p-2 border rounded"
            rows={4}
            aria-required="true"
          />
          <button
            type="button"
            onClick={() => handleHelpMeWrite("financialSituation")}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            {t("helpMeWrite")}
          </button>
        </div>
        {errors.financialSituation && (
          <p className="text-red-600 text-sm">
            {errors.financialSituation.message}
          </p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium">
          {t("employmentCircumstances")}
        </label>
        <div className="flex gap-2">
          <textarea
            {...register("employmentCircumstances", {
              required: t("required"),
            })}
            className="w-full p-2 border rounded"
            rows={4}
            aria-required="true"
          />
          <button
            type="button"
            onClick={() => handleHelpMeWrite("employmentCircumstances")}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            {t("helpMeWrite")}
          </button>
        </div>
        {errors.employmentCircumstances && (
          <p className="text-red-600 text-sm">
            {errors.employmentCircumstances.message}
          </p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium">
          {t("reasonForApplying")}
        </label>
        <div className="flex gap-2">
          <textarea
            {...register("reasonForApplying", { required: t("required") })}
            className="w-full p-2 border rounded"
            rows={4}
            aria-required="true"
          />
          <button
            type="button"
            onClick={() => handleHelpMeWrite("reasonForApplying")}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            {t("helpMeWrite")}
          </button>
        </div>
        {errors.reasonForApplying && (
          <p className="text-red-600 text-sm">
            {errors.reasonForApplying.message}
          </p>
        )}
      </div>
    </div>
  );
};

export default Step3;
