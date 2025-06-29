import { useTranslation } from "react-i18next";
import {
  Stepper,
  Step,
  StepLabel,
  Box,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  PersonOutline,
  FamilyRestroom,
  DescriptionOutlined,
} from "@mui/icons-material";

interface ProgressBarProps {
  step: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ step }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const steps = [
    { label: t("step1"), icon: <PersonOutline /> },
    { label: t("step2"), icon: <FamilyRestroom /> },
    { label: t("step3"), icon: <DescriptionOutlined /> },
  ];

  return (
    <Box
      sx={{
        width: "100%",
        mb: 4,
        px: { xs: 2, sm: 2 },
        overflow: "hidden",
      }}
    >
      <Stepper
        activeStep={step - 1}
        alternativeLabel={!isMobile}
        orientation="horizontal"
        sx={{
          "& .MuiStepConnector-line": {
            borderTopWidth: 2,
          },
          "& .MuiStepLabel-label": {
            fontSize: { xs: "0.75rem", sm: "1rem" },
            fontWeight: 500,
            marginTop: { xs: 1, sm: 1 },
            lineHeight: 1.2,
            textAlign: "center",
            whiteSpace: { xs: "nowrap", sm: "normal" },
            overflow: { xs: "hidden", sm: "visible" },
            textOverflow: { xs: "ellipsis", sm: "clip" },
          },
          "& .MuiStep-root": {
            paddingLeft: { xs: 0, sm: "8px" },
            paddingRight: { xs: 0, sm: "8px" },
            flex: 1,
            minWidth: 0,
          },
          "& .MuiStepLabel-root": {
            flexDirection: "column",
            alignItems: "center",
          },
          "& .MuiStepLabel-iconContainer": {
            paddingRight: 0,
            marginBottom: { xs: "4px", sm: "8px" },
          },
          // RTL fixes for stepper
          "[dir='rtl'] &": {
            "& .MuiStepConnector-root": {
              left: "auto",
              right: "calc(-50% + 12px)",
            },
            "& .MuiStepLabel-iconContainer": {
              paddingLeft: 0,
              paddingRight: 0,
            },
          },
        }}
      >
        {steps.map((stepData) => (
          <Step key={stepData.label}>
            <StepLabel
              icon={stepData.icon}
              sx={{
                "& .MuiStepIcon-root": {
                  fontSize: { xs: "1.25rem", sm: "1.5rem" },
                  "&.Mui-active": {
                    color: theme.palette.primary.main,
                  },
                  "&.Mui-completed": {
                    color: theme.palette.primary.dark,
                  },
                },
              }}
            >
              {stepData.label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

export default ProgressBar;
