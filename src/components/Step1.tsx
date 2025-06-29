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
  PersonOutline,
  BadgeOutlined,
  CakeOutlined,
  LocationOnOutlined,
  PhoneOutlined,
  EmailOutlined,
} from "@mui/icons-material";

interface Step1Props {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
  control: Control<FormData>;
}

const Step1: React.FC<Step1Props> = ({ register, errors, control }) => {
  const { t } = useTranslation();

  // Watch the gender select field value to ensure it's controlled
  const gender = useWatch({ control, name: "gender" });

  return (
    <Card elevation={0} sx={{ borderRadius: 3 }}>
      <CardContent sx={{ p: 4 }}>
        <Box sx={{ mb: 3 }}>
          <Typography
            variant="h6"
            sx={{ mb: 1, display: "flex", alignItems: "center", gap: 1 }}
          >
            <PersonOutline color="primary" />
            {t("step1")}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Please provide your personal information
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
              label={t("name")}
              {...register("name", { required: t("required") })}
              error={!!errors.name}
              helperText={errors.name?.message}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonOutline color="action" />
                  </InputAdornment>
                ),
              }}
              variant="outlined"
            />
            <TextField
              fullWidth
              label={t("nationalId")}
              {...register("nationalId", { required: t("required") })}
              error={!!errors.nationalId}
              helperText={errors.nationalId?.message}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <BadgeOutlined color="action" />
                  </InputAdornment>
                ),
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
              label={t("dob")}
              type="date"
              {...register("dob", { required: t("required") })}
              error={!!errors.dob}
              helperText={errors.dob?.message}
              InputLabelProps={{ shrink: true }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <CakeOutlined color="action" />
                  </InputAdornment>
                ),
              }}
              variant="outlined"
            />
            <TextField
              fullWidth
              select
              label={t("gender")}
              {...register("gender", { required: t("required") })}
              value={gender || ""}
              error={!!errors.gender}
              helperText={errors.gender?.message}
              variant="outlined"
            >
              <MenuItem value="male">{t("male")}</MenuItem>
              <MenuItem value="female">{t("female")}</MenuItem>
              <MenuItem value="other">{t("other")}</MenuItem>
            </TextField>
          </Box>

          <TextField
            fullWidth
            label={t("address")}
            {...register("address", { required: t("required") })}
            error={!!errors.address}
            helperText={errors.address?.message}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LocationOnOutlined color="action" />
                </InputAdornment>
              ),
            }}
            variant="outlined"
          />

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "1fr 1fr",
                md: "1fr 1fr 1fr",
              },
              gap: 3,
            }}
          >
            <TextField
              fullWidth
              label={t("city")}
              {...register("city", { required: t("required") })}
              error={!!errors.city}
              helperText={errors.city?.message}
              variant="outlined"
            />
            <TextField
              fullWidth
              label={t("state")}
              {...register("state", { required: t("required") })}
              error={!!errors.state}
              helperText={errors.state?.message}
              variant="outlined"
            />
            <TextField
              fullWidth
              label={t("country")}
              {...register("country", { required: t("required") })}
              error={!!errors.country}
              helperText={errors.country?.message}
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
              label={t("phone")}
              {...register("phone", {
                required: t("required"),
                pattern: { value: /^\+?\d{10,}$/, message: t("invalidPhone") },
              })}
              error={!!errors.phone}
              helperText={errors.phone?.message}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PhoneOutlined color="action" />
                  </InputAdornment>
                ),
              }}
              variant="outlined"
            />
            <TextField
              fullWidth
              label={t("email")}
              type="email"
              {...register("email", {
                required: t("required"),
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: t("invalidEmail"),
                },
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailOutlined color="action" />
                  </InputAdornment>
                ),
              }}
              variant="outlined"
            />
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default Step1;
