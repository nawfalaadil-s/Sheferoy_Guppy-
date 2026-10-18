import Link from "next/link";
import { MessageCircle } from "lucide-react";

type Variant = "gold" | "ghost" | "moss" | "link";

interface WhatsAppButtonProps {
  message?: string;
  variety?: string;
  className?: string;
  children?: React.ReactNode;
  variant?: Variant;
}

const variantClasses: Record<Variant, string> = {
  gold: "btn-gold",
  ghost: "btn-ghost",
  moss: "btn-moss",
  link: "btn-link",
};

export default function WhatsAppButton({
  message,
  variety,
  className = "",
  children,
  variant = "gold",
}: WhatsAppButtonProps) {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  const base = variantClasses[variant];

  if (!whatsappNumber) {
    return (
      <Link
        href="/contact"
        className={`${base} ${className}`}
        title="Direct WhatsApp contact is being set up — send your enquiry through the contact page"
      >
        {variant === "link" ? (
          children || "Enquire"
        ) : (
          <>
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            {children || "Enquire on WhatsApp"}
          </>
        )}
      </Link>
    );
  }

  let fullMessage = message || "Hi, I'm interested in your guppy varieties";
  if (variety) {
    fullMessage = `Hi, I'm interested in the ${variety}`;
  }

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(fullMessage)}`;

  if (variant === "link") {
    return (
      <Link href={whatsappUrl} target="_blank" rel="noopener noreferrer" className={`${base} ${className}`}>
        {children || "Enquire on WhatsApp"}
      </Link>
    );
  }

  return (
    <Link href={whatsappUrl} target="_blank" rel="noopener noreferrer" className={`${base} ${className}`}>
      <MessageCircle className="h-4 w-4" aria-hidden="true" />
      {children || "Enquire on WhatsApp"}
    </Link>
  );
}
