import { SettlementDetailsPage } from "@/features/settlement";

export default async function Page({ params }: { params: { settlementId: string } }) {
  return <SettlementDetailsPage id={params.settlementId} />;
}
