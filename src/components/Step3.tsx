import type { UseFormRegister, FieldErrors } from "react-hook-form";
import { useTranslation } from "react-i18next";
import type { FormData } from "../App";
import {
  TextField,
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Stack,
  InputAdornment,
  Chip,
} from "@mui/material";
import {
  DescriptionOutlined,
  AccountBalance,
  BusinessCenter,
  Assignment,
  AutoAwesome,
} from "@mui/icons-material";

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

  const textFieldData = [
    {
      field: "financialSituation",
      label: t("financialSituation"),
      icon: <AccountBalance color="action" />,
      placeholder:
        "Describe your current financial situation, income sources, and any financial challenges you're facing...",
    },
    {
      field: "employmentCircumstances",
      label: t("employmentCircumstances"),
      icon: <BusinessCenter color="action" />,
      placeholder:
        "Explain your employment history, current job status, and any employment-related difficulties...",
    },
    {
      field: "reasonForApplying",
      label: t("reasonForApplying"),
      icon: <Assignment color="action" />,
      placeholder:
        "Explain why you are applying for this support and how it will help improve your situation...",
    },
  ];

  return (
    <Card elevation={0} sx={{ borderRadius: 3 }}>
      <CardContent sx={{ p: 4 }}>
        <Box sx={{ mb: 3 }}>
          <Typography
            variant="h6"
            sx={{ mb: 1, display: "flex", alignItems: "center", gap: 1 }}
          >
            <DescriptionOutlined color="primary" />
            {t("step3")}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Please provide detailed descriptions about your situation
          </Typography>
          <Chip
            icon={<AutoAwesome />}
            label="AI assistance available"
            variant="outlined"
            color="primary"
            size="small"
            sx={{ mt: 1 }}
          />
        </Box>

        <Stack spacing={4}>
          {textFieldData.map(({ field, label, icon, placeholder }) => (
            <Box key={field} sx={{ position: "relative" }}>
              <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
                <TextField
                  fullWidth
                  label={label}
                  multiline
                  rows={4}
                  {...register(field as keyof FormData, {
                    required: t("required"),
                  })}
                  error={!!errors[field as keyof FormData]}
                  helperText={errors[field as keyof FormData]?.message}
                  placeholder={placeholder}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment
                        position="start"
                        sx={{ alignSelf: "flex-start", mt: 1 }}
                      >
                        {icon}
                      </InputAdornment>
                    ),
                  }}
                  variant="outlined"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      paddingTop: "14px",
                    },
                    "& .MuiInputBase-input": {
                      paddingTop: "0px",
                    },
                  }}
                />
                <Button
                  variant="contained"
                  onClick={() => handleHelpMeWrite(field)}
                  startIcon={<AutoAwesome />}
                  sx={{
                    minWidth: "140px",
                    height: "56px",
                    borderRadius: 2,
                    textTransform: "none",
                    fontWeight: 500,
                    background:
                      "linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)",
                    "&:hover": {
                      background:
                        "linear-gradient(45deg, #1565c0 30%, #1976d2 90%)",
                      transform: "translateY(-1px)",
                      boxShadow: "0 6px 20px rgba(25, 118, 210, 0.3)",
                    },
                    transition: "all 0.2s ease-in-out",
                  }}
                >
                  {t("helpMeWrite")}
                </Button>
              </Box>
            </Box>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default Step3;
