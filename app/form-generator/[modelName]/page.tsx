"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Box, CircularProgress, Alert } from "@mui/material";
import { FormGenerator } from "@/lib/form-generator/form-generator";
import {
  fieldMetadata,
  defaultValues,
} from "@/lib/form-generator/model-schemas";
import * as models from "@/db/schema";

export default function DynamicFormPage() {
  const params = useParams();
  const modelName = params.modelName as string;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    if (!modelName || !(modelName in models)) {
      setError(`Model "${modelName}" not found`);
    }
    setLoading(false);
  }, [modelName]);

  const handleSubmit = (data: Record<string, unknown>) => {
    console.log("Form submitted:", data);
    setFormSubmitted(true);
  };

  if (loading) {
    return (
      <Box className="flex justify-center items-center h-screen">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box className="p-sds-xl">
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  if (formSubmitted) {
    return (
      <Box className="p-sds-xl">
        <Alert severity="success">
          Form submitted successfully! In a real application, this data would be
          saved to the database.
        </Alert>
      </Box>
    );
  }

  const model = (models as Record<string, any>)[modelName];
  const metadata = fieldMetadata[modelName as keyof typeof fieldMetadata] || {};

  return (
    <Box className="p-sds-xl">
      <FormGenerator
        model={model}
        title={`${modelName.charAt(0).toUpperCase() + modelName.slice(1)} Form`}
        fieldMetadata={metadata}
        customValidations={{}}
        onSubmit={handleSubmit}
        defaultValues={
          defaultValues[modelName as keyof typeof defaultValues] || {}
        }
      />
    </Box>
  );
}
