"use client";

import React from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import Link from "next/link";

const availableModels = [
  {
    name: "users",
    description:
      "User model with name, email, age, active status, and birth date fields",
  },
  {
    name: "products",
    description:
      "Product model with name, description, price, stock status, and creation date fields",
  },
];

export default function FormGeneratorLanding() {
  return (
    <Box className="p-sds-xl">
      <Typography variant="h3" component="h1" className="mb-sds-xl">
        Dynamic Form Generator
      </Typography>

      <Typography variant="body1" className="mb-sds-l">
        This demo shows how to generate forms dynamically from Drizzle models
        using React Hook Form and Zod validation. Select a model below to see a
        generated form with validation.
      </Typography>

      <Box className="grid grid-cols-1 md:grid-cols-2 gap-sds-l mt-sds-xl">
        {availableModels.map((model) => (
          <Card key={model.name} className="h-full">
            <CardContent>
              <Typography variant="h5" component="h2" className="mb-sds-m">
                {model.name.charAt(0).toUpperCase() + model.name.slice(1)} Form
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {model.description}
              </Typography>
            </CardContent>
            <CardActions>
              <Link href={`/form-generator/${model.name}`} passHref>
                <Button size="small" color="primary">
                  View Form
                </Button>
              </Link>
            </CardActions>
          </Card>
        ))}
      </Box>
    </Box>
  );
}
