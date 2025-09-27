import { Suspense } from "react";
import Marketplace from "../../components/pages/MarketPlace";

export default function MarketplacePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Marketplace />
    </Suspense>
  );
}