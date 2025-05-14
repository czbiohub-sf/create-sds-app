"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { PgTable } from "drizzle-orm/pg-core";
import {
  TextField,
  Checkbox,
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Box,
  Paper,
} from "@mui/material";
import { generateZodSchema } from "./schema-utils";

export type FieldMetadata = {
  label: string;
  type: "text" | "email" | "number" | "date" | "checkbox" | "select";
  placeholder?: string;
  options?: { value: string; label: string }[];
  helperText?: string;
};

export type FormGeneratorProps<T extends PgTable> = {
  model: T;
  title: string;
  customValidations?: Record<string, (schema: z.ZodTypeAny) => z.ZodTypeAny>;
  fieldMetadata: Record<string, FieldMetadata>;
  onSubmit: (data: Record<string, unknown>) => void;
  defaultValues?: Record<string, unknown>;
};

export function FormGenerator<T extends PgTable>({
  model,
  title,
  customValidations,
  fieldMetadata,
  onSubmit,
  defaultValues = {},
}: FormGeneratorProps<T>) {
  const schema = generateZodSchema(model, customValidations);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const handleFormSubmit = (data: Record<string, unknown>) => {
    onSubmit(data);
  };

  return (
    <Paper elevation={3} className="p-sds-xl">
      <Typography variant="h4" component="h1" className="mb-sds-l">
        {title}
      </Typography>

      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Box className="space-y-sds-m">
          {Object.entries(fieldMetadata).map(([fieldName, metadata]) => {
            const error = errors[fieldName];

            return (
              <FormControl
                key={fieldName}
                fullWidth
                error={!!error}
                className="mb-sds-m"
              >
                {metadata.type === "checkbox" ? (
                  <Controller
                    name={fieldName}
                    control={control}
                    render={({ field }) => (
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={field.value}
                            onChange={field.onChange}
                          />
                        }
                        label={metadata.label}
                      />
                    )}
                  />
                ) : metadata.type === "select" && metadata.options ? (
                  <>
                    <InputLabel id={`${fieldName}-label`}>
                      {metadata.label}
                    </InputLabel>
                    <Controller
                      name={fieldName}
                      control={control}
                      render={({ field }) => (
                        <Select
                          labelId={`${fieldName}-label`}
                          label={metadata.label}
                          {...field}
                        >
                          {metadata.options?.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </Select>
                      )}
                    />
                  </>
                ) : metadata.type === "date" ? (
                  <Controller
                    name={fieldName}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        label={metadata.label}
                        type="date"
                        value={field.value ? field.value.substring(0, 10) : ""}
                        onChange={field.onChange}
                        fullWidth
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    )}
                  />
                ) : (
                  <Controller
                    name={fieldName}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label={metadata.label}
                        type={metadata.type}
                        placeholder={metadata.placeholder}
                        fullWidth
                      />
                    )}
                  />
                )}

                {Boolean(error || metadata.helperText) && (
                  <FormHelperText>
                    {error ? (error.message as string) : metadata.helperText}
                  </FormHelperText>
                )}
              </FormControl>
            );
          })}

          <Button
            type="submit"
            variant="contained"
            color="primary"
            className="mt-sds-l"
          >
            Submit
          </Button>
        </Box>
      </form>
    </Paper>
  );
}
