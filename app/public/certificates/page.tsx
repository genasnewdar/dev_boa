import { Metadata } from "next"
import { PublicCertificates } from "@/views/public/certificates"

export const metadata: Metadata = {
  title: "Certificates | Master LMS",
  description: "User Certificates"
}

export default function PublicCertificatesPage() {
  return <PublicCertificates />
}
