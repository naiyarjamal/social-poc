import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import axios from "axios";
import {
  Container,
  Box,
  Typography,
  Button,
  ButtonGroup,
  Paper,
  Stack,
  Fade,
  IconButton,
  Tooltip,
} from "@mui/material";
import {
  NavigateBefore,
  NavigateNext,
  Send,
  DarkMode,
  LightMode,
} from "@mui/icons-material";
import ProgressBar from "./components/ProgressBar";
import HelpMeWritePopup from "./components/HelpMeWritePopup";
import Step1 from "./components/Step1";
import Step2 from "./components/Step2";
import Step3 from "./components/Step3";
import { useThemeMode } from "./theme";
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
  const { isDarkMode, toggleDarkMode } = useThemeMode();
  const [step, setStep] = useState(1);
  const [suggestion, setSuggestion] = useState<string | null>(null);
  const [activeField, setActiveField] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
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
          model: "gpt-3.5-turbo",
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
        alert(
          t("rateLimitError") ||
            "Too many requests. Please wait a moment and try again."
        );
      } else if (error.response?.status === 401) {
        alert(
          t("authError") || "Invalid API key. Please check your OpenAI API key."
        );
      } else if (error.response?.status === 403) {
        alert(
          t("quotaError") ||
            "API quota exceeded. Please check your OpenAI account."
        );
      } else if (error.code === "ECONNABORTED") {
        alert(t("timeoutError") || "Request timed out. Please try again.");
      } else {
        alert(
          t("apiError") ||
            "An error occurred while generating suggestions. Please try again."
        );
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
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "background.default",
        py: 4,
      }}
    >
      {/* Header */}
      <Container maxWidth="lg">
        <Paper
          elevation={0}
          sx={{
            p: 3,
            mb: 4,
            borderRadius: 3,
            background: "linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)",
            color: "white",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 2,
            }}
          >
            <Typography
              variant="h4"
              sx={{ fontWeight: 600, textShadow: "0 2px 4px rgba(0,0,0,0.1)" }}
            >
              {t("title")}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              {/* Dark Mode Toggle */}
              <Tooltip
                title={
                  isDarkMode
                    ? t("lightMode") || "Light Mode"
                    : t("darkMode") || "Dark Mode"
                }
              >
                <IconButton
                  onClick={toggleDarkMode}
                  sx={{
                    color: "white",
                    backgroundColor: "rgba(255,255,255,0.1)",
                    "&:hover": {
                      backgroundColor: "rgba(255,255,255,0.2)",
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  {isDarkMode ? <LightMode /> : <DarkMode />}
                </IconButton>
              </Tooltip>

              <ButtonGroup
                variant="outlined"
                size="small"
                sx={{
                  "& .MuiButton-root": {
                    border: "1px solid rgba(255,255,255,0.3)",
                    "&:not(:last-of-type)": {
                      borderRight: "1px solid rgba(255,255,255,0.3)",
                    },
                  },
                  // RTL specific fixes
                  "[dir='rtl'] &": {
                    "& .MuiButton-root:not(:last-of-type)": {
                      borderRight: "none",
                      borderLeft: "1px solid rgba(255,255,255,0.3)",
                    },
                  },
                }}
              >
                <Button
                  onClick={() => changeLanguage("en")}
                  sx={{
                    backgroundColor: "rgba(255,255,255,0.2)",
                    "&:hover": { backgroundColor: "rgba(255,255,255,0.3)" },
                    color: "white",
                  }}
                >
                  {t("english")}
                </Button>
                <Button
                  onClick={() => changeLanguage("ar")}
                  sx={{
                    backgroundColor: "rgba(255,255,255,0.2)",
                    "&:hover": { backgroundColor: "rgba(255,255,255,0.3)" },
                    color: "white",
                  }}
                >
                  {t("arabic")}
                </Button>
              </ButtonGroup>
            </Box>
          </Box>
        </Paper>

        {/* Progress Bar */}
        <ProgressBar step={step} />

        {/* Main Form */}
        <Fade in={true} timeout={500}>
          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={4}>
              {step === 1 && (
                <Step1 register={register} errors={errors} control={control} />
              )}
              {step === 2 && (
                <Step2 register={register} errors={errors} control={control} />
              )}
              {step === 3 && (
                <Step3
                  register={register}
                  errors={errors}
                  handleHelpMeWrite={handleHelpMeWrite}
                />
              )}

              {/* Navigation Buttons */}
              <Paper elevation={0} sx={{ p: 3, borderRadius: 3 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  {step > 1 ? (
                    <Button
                      type="button"
                      onClick={() => setStep(step - 1)}
                      startIcon={<NavigateBefore />}
                      variant="outlined"
                      size="large"
                      sx={{
                        borderRadius: 2,
                        px: 3,
                        py: 1.5,
                        textTransform: "none",
                        fontWeight: 500,
                      }}
                    >
                      {t("previous")}
                    </Button>
                  ) : (
                    <Box />
                  )}

                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    endIcon={step === 3 ? <Send /> : <NavigateNext />}
                    sx={{
                      borderRadius: 2,
                      px: 4,
                      py: 1.5,
                      textTransform: "none",
                      fontWeight: 500,
                      fontSize: "1rem",
                      background:
                        step === 3
                          ? "linear-gradient(45deg, #4caf50 30%, #66bb6a 90%)"
                          : "linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)",
                      "&:hover": {
                        background:
                          step === 3
                            ? "linear-gradient(45deg, #388e3c 30%, #4caf50 90%)"
                            : "linear-gradient(45deg, #1565c0 30%, #1976d2 90%)",
                        transform: "translateY(-2px)",
                        boxShadow: "0 8px 25px rgba(25, 118, 210, 0.3)",
                      },
                      transition: "all 0.3s ease-in-out",
                    }}
                  >
                    {step === 3 ? t("submit") : t("next")}
                  </Button>
                </Box>
              </Paper>
            </Stack>
          </Box>
        </Fade>
      </Container>

      {/* AI Popup */}
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
    </Box>
  );
};

export default App;
