import { WalletDetailsPage } from "@/features/wallet";

export default async function Page({ params }: { params: Promise<{ walletId: string }> }) {
  const { walletId } = await params;
  return <WalletDetailsPage walletId={walletId} />;
}
