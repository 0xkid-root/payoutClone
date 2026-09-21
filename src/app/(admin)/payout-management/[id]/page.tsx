import { PayoutDetailsPage } from "@/features/payout/components/payout-details-page";

export default function PayoutDetailsRoute({ params }: { params: { id: string } }) {
  return <PayoutDetailsPage id={params.id} />;
}
