import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import axios from "axios";
import ProgressBar from "./components/ProgressBar";
import HelpMeWritePopup from "./components/HelpMeWritePopup";
import Step1 from "./components/Step1";
import Step2 from "./components/Step2";
import Step3 from "./components/Step3";
import "./App.css";

export interface FormData {
  name: string;
  nationalId: string;
  dob: string;
  gender: string;
  address: string;
  city: string;
  state: string;
  country: string;
  phone: string;
  email: string;
  maritalStatus: string;
  dependents: number;
  employmentStatus: string;
  monthlyIncome: number;
  housingStatus: string;
  financialSituation: string;
  employmentCircumstances: string;
  reasonForApplying: string;
}

const App: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [step, setStep] = useState(1);
  const [suggestion, setSuggestion] = useState<string | null>(null);
  const [activeField, setActiveField] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormData>({
    defaultValues: JSON.parse(localStorage.getItem("formData") || "{}"),
  });

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("formData") || "{}");
    Object.keys(savedData).forEach((key) =>
      setValue(key as keyof FormData, savedData[key])
    );
  }, [setValue]);

  const saveProgress = (data: FormData) => {
    localStorage.setItem("formData", JSON.stringify(data));
  };

  const handleHelpMeWrite = async (field: string) => {
    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo-instruct-0914",
          messages: [
            { role: "user", content: `Help me describe my ${field}.` },
          ],
          max_tokens: 150,
          temperature: 0.7,
        },
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
            "Content-Type": "application/json",
          },
          timeout: 10000, // 10 second timeout
        }
      );
      setSuggestion(response.data.choices[0].message.content);
      setActiveField(field);
    } catch (error: any) {
      console.error("OpenAI API error:", error);
      
      if (error.response?.status === 429) {
        alert(t("rateLimitError") || "Too many requests. Please wait a moment and try again.");
      } else if (error.response?.status === 401) {
        alert(t("authError") || "Invalid API key. Please check your OpenAI API key.");
      } else if (error.response?.status === 403) {
        alert(t("quotaError") || "API quota exceeded. Please check your OpenAI account.");
      } else if (error.code === 'ECONNABORTED') {
        alert(t("timeoutError") || "Request timed out. Please try again.");
      } else {
        alert(t("apiError") || "An error occurred while generating suggestions. Please try again.");
      }
    }
  };

  const onSubmit = async (data: FormData) => {
    saveProgress(data);
    if (step === 3) {
      try {
        await axios.post("/api/submit", data);
        alert(t("submitSuccess"));
        localStorage.removeItem("formData");
      } catch (error) {
        console.error("Submission error:", error);
        alert(t("submitError"));
      }
    } else {
      setStep(step + 1);
    }
  };

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    document.documentElement.dir = lng === "ar" ? "rtl" : "ltr";
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="flex justify-between mb-4">
        <h1 className="title text-2xl font-bold">{t("title")}</h1>
        <div>
          <button
            onClick={() => changeLanguage("en")}
            className="px-2 py-1 bg-gray-200 rounded mr-2"
          >
            {t("english")}
          </button>
          <button
            onClick={() => changeLanguage("ar")}
            className="px-2 py-1 bg-gray-200"
          >
            {t("arabic")}
          </button>
        </div>
      </div>
      <ProgressBar step={step} />
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {step === 1 && <Step1 register={register} errors={errors} />}
        {step === 2 && <Step2 register={register} errors={errors} />}
        {step === 3 && (
          <Step3
            register={register}
            errors={errors}
            handleHelpMeWrite={handleHelpMeWrite}
          />
        )}
        <div className="flex justify-between mt-6">
          {step > 1 && (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="bg-gray-200 px-4 py-2 rounded"
            >
              {t("previous")}
            </button>
          )}
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            {step === 3 ? t("submit") : t("next")}
          </button>
        </div>
      </form>
      {suggestion && activeField && (
        <HelpMeWritePopup
          field={activeField}
          suggestion={suggestion}
          onAccept={() => {
            setValue(activeField as keyof FormData, suggestion);
            setSuggestion(null);
            setActiveField(null);
          }}
          onEdit={() => {
            setValue(activeField as keyof FormData, suggestion);
            setSuggestion(null);
            setActiveField(null);
          }}
          onDiscard={() => {
            setSuggestion(null);
            setActiveField(null);
          }}
        />
      )}
    </div>
  );
};

export default App;
