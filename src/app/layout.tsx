import type { Metadata } from "next";
import "bootstrap/dist/css/bootstrap.min.css";
import "semantic-ui-css/components/dropdown.min.css";
import "semantic-ui-css/components/transition.min.css";

import "../styles/global.css";
import Container from "@/client-components/_shared/Container";
import ServerHeader from "@/server-components/core/ServerHeader";
import ServerFooter from "@/server-components/core/ServerFooter";
import StyledComponentsRegistry from "../helpers/registry";

export const metadata: Metadata = {
  title: "co-lab",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistry>
          <ServerHeader />
          <Container>{children}</Container>
          <ServerFooter />
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
