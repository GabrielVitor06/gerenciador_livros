"use client";

import { Box, Typography, Link, IconButton, Stack } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import WebAssetIcon from "@mui/icons-material/WebAsset";

export default function Footer() {
  return (
    <Stack
      component="footer"
      py={3}
      borderTop={"1px solid #ccc"}
      direction="row"
      justifyContent="center"
      alignItems="flex-end"
      sx={{
        bgcolor: "grey.100",
      }}
    >
      <Stack
        direction="row"
        flexDirection={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems="center"
        textAlign={{ xs: "center", sm: "left" }}
        spacing={{ xs: 2, sm: 2 }}
      >
        <Typography variant="body2" color="text.secondary">
          © {new Date().getFullYear()} Gabriel Vítor. Projeto demonstrativo.
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Feito com{" "}
          <Link href="https://nextjs.org" target="_blank" underline="hover">
            Next.js
          </Link>{" "}
          +{" "}
          <Link href="https://mui.com" target="_blank" underline="hover">
            Material UI
          </Link>
        </Typography>

        <Box>
          <IconButton
            href="https://github.com/GabrielVitor06"
            target="_blank"
            aria-label="GitHub"
          >
            <GitHubIcon />
          </IconButton>
          <IconButton
            href="https://www.linkedin.com/in/gabriel-poleza"
            target="_blank"
            aria-label="LinkedIn"
          >
            <LinkedInIcon />
          </IconButton>
          <IconButton
            href="https://gabrielvitor-one.vercel.app"
            target="_blank"
            aria-label="Portfólio"
          >
            <WebAssetIcon />
          </IconButton>
        </Box>
      </Stack>
    </Stack>
  );
}
