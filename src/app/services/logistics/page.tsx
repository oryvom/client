import { ServiceDetail } from "@/components/sections/service-detail";
import { getService } from "@/config/services";
import { pageMetadata } from "@/lib/metadata";

const service = getService("logistics");

export const metadata = pageMetadata({
  title: service.metaTitle,
  description: service.metaDescription,
  path: service.path,
});

export default function Page() {
  return <ServiceDetail service={service} />;
}
