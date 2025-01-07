import dynamic from "next/dynamic";
import "bootstrap/dist/css/bootstrap.min.css";
import "semantic-ui-css/components/dropdown.min.css";
import "semantic-ui-css/components/transition.min.css";

import "../styles/global.css";
import StyledComponentsRegistry from "../helpers/registry";
import { ReactQueryProvider } from "./react-query/providers/ReactQueryProvider";

// Dynamically import components
const ServerHeader = dynamic(
  () => import("@/server-components/core/ServerHeader")
);

const Container = dynamic(
  () => import("@/client-components/_shared/Container")
);

const ServerFooter = dynamic(
  () => import("@/server-components/core/ServerFooter")
);

export const metadata = {
  title: "co-lab",
  revalidate: 0,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ReactQueryProvider>
          <StyledComponentsRegistry>
            <ServerHeader />
            <Container>{children}</Container>
            <ServerFooter />
          </StyledComponentsRegistry>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
