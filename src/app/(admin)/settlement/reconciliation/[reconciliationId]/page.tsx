import { ReconciliationDetailsPage } from "@/features/settlement";

export default async function Page({ params }: { params: { reconciliationId: string } }) {
  return <ReconciliationDetailsPage id={params.reconciliationId} />;
}
