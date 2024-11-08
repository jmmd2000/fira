import { GeistSans } from "geist/font/sans";
import { type AppType } from "next/app";
import { ClerkProvider } from "@clerk/nextjs";
import { api } from "~/utils/api";

import "~/styles/globals.css";
import { UserProvider } from "~/context/UserContext";
import Layout from "./layout";
import { SidebarTrigger } from "~/components/ui/sidebar";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <div className={GeistSans.className}>
      <ClerkProvider {...pageProps}>
        <UserProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </UserProvider>
      </ClerkProvider>
    </div>
  );
};

export default api.withTRPC(MyApp);
