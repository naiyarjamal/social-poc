import type { UseFormRegister, FieldErrors, Control } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useWatch } from "react-hook-form";
import type { FormData } from "../App";
import {
  TextField,
  MenuItem,
  Card,
  CardContent,
  Typography,
  Box,
  InputAdornment,
  Stack,
} from "@mui/material";
import {
  FamilyRestroom,
  People,
  Work,
  AttachMoney,
  Home,
} from "@mui/icons-material";

interface Step2Props {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
  control: Control<FormData>;
}

const Step2: React.FC<Step2Props> = ({ register, errors, control }) => {
  const { t } = useTranslation();


  const maritalStatus = useWatch({ control, name: "maritalStatus" });
  const employmentStatus = useWatch({ control, name: "employmentStatus" });
  const housingStatus = useWatch({ control, name: "housingStatus" });

  return (
    <Card elevation={0} sx={{ borderRadius: 3 }}>
      <CardContent sx={{ p: 4 }}>
        <Box sx={{ mb: 3 }}>
          <Typography
            variant="h6"
            sx={{ mb: 1, display: "flex", alignItems: "center", gap: 1 }}
          >
            <FamilyRestroom color="primary" />
            {t("step2")}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Please provide your family and financial information
          </Typography>
        </Box>
        <Stack spacing={3}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
              gap: 3,
            }}
          >
            <TextField
              fullWidth
              select
              label={t("maritalStatus")}
              {...register("maritalStatus", { required: t("required") })}
              value={maritalStatus || ""}
              error={!!errors.maritalStatus}
              helperText={errors.maritalStatus?.message}
              variant="outlined"
            >
              <MenuItem value="single">{t("single")}</MenuItem>
              <MenuItem value="married">{t("married")}</MenuItem>
              <MenuItem value="divorced">{t("divorced")}</MenuItem>
              <MenuItem value="widowed">{t("widowed")}</MenuItem>
            </TextField>

            <TextField
              fullWidth
              label={t("dependents")}
              type="number"
              {...register("dependents", { required: t("required"), min: 0 })}
              error={!!errors.dependents}
              helperText={errors.dependents?.message}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <People color="action" />
                  </InputAdornment>
                ),
                inputProps: { min: 0 },
              }}
              variant="outlined"
            />
          </Box>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
              gap: 3,
            }}
          >
            <TextField
              fullWidth
              select
              label={t("employmentStatus")}
              {...register("employmentStatus", { required: t("required") })}
              value={employmentStatus || ""}
              error={!!errors.employmentStatus}
              helperText={errors.employmentStatus?.message}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Work color="action" />
                  </InputAdornment>
                ),
              }}
              variant="outlined"
            >
              <MenuItem value="employed">{t("employed")}</MenuItem>
              <MenuItem value="unemployed">{t("unemployed")}</MenuItem>
              <MenuItem value="selfEmployed">{t("selfEmployed")}</MenuItem>
              <MenuItem value="retired">{t("retired")}</MenuItem>
            </TextField>

            <TextField
              fullWidth
              label={t("monthlyIncome")}
              type="number"
              {...register("monthlyIncome", {
                required: t("required"),
                min: 0,
              })}
              error={!!errors.monthlyIncome}
              helperText={errors.monthlyIncome?.message}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AttachMoney color="action" />
                  </InputAdornment>
                ),
                inputProps: { min: 0 },
              }}
              variant="outlined"
            />
          </Box>

          <TextField
            fullWidth
            select
            label={t("housingStatus")}
            {...register("housingStatus", { required: t("required") })}
            value={housingStatus || ""}
            error={!!errors.housingStatus}
            helperText={errors.housingStatus?.message}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Home color="action" />
                </InputAdornment>
              ),
            }}
            variant="outlined"
          >
            <MenuItem value="owned">{t("owned")}</MenuItem>
            <MenuItem value="rented">{t("rented")}</MenuItem>
            <MenuItem value="other">{t("otherHousing")}</MenuItem>
          </TextField>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default Step2;
