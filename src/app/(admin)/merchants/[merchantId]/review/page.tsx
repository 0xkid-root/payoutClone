import { MerchantReviewPage } from "@/features/merchant/components/review/merchant-review-page";

interface PageProps {
  params: Promise<{ merchantId: string }>;
}

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  return <MerchantReviewPage merchantId={resolvedParams.merchantId} />;
}
