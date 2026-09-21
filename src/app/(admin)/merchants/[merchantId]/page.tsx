import { MerchantDetailsPage } from "@/features/merchant/components/merchant-details-page";

interface PageProps {
  params: Promise<{ merchantId: string }>;
}

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  return <MerchantDetailsPage merchantId={resolvedParams.merchantId} />;
}
