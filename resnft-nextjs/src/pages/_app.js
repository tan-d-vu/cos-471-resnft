import "@/styles/globals.css";
import Layout from "@/layout/Layout";
import * as fcl from "@onflow/fcl";
import { AuthWrapper } from "@/contexts/AuthContext";

fcl
  .config()
  .put("app.detail.title", "NFT Dapp")
  .put("app.detail.icon", "https://i.imgur.com/9I6NRUm.png")
  .put("accessNode.api", "https://rest-testnet.onflow.org")
  .put("discovery.wallet", "https://fcl-discovery.onflow.org/testnet/authn");

export default function App({ Component, pageProps }) {
  return (
    <AuthWrapper>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthWrapper>
  );
}