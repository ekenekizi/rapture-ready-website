"use client";

import { Suspense } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavigationLinkProps = {
  href: string;
  children: React.ReactNode;
  mobile?: boolean;
  dock?: boolean;
  onClick?: () => void;
};

function linkClass(mobile: boolean, active: boolean, dock = false) {
  if (dock) return active ? "is-active" : "";
  return mobile
    ? `block border-b border-border py-4 text-sm transition-colors hover:text-gold ${active ? "border-l-2 border-l-gold pl-3 font-medium text-gold" : ""}`
    : `border-b py-3 transition-colors hover:text-gold ${active ? "border-gold text-gold" : "border-transparent"}`;
}

function ActiveLink({ href, children, mobile = false, dock = false, onClick }: NavigationLinkProps) {
  const pathname = usePathname();
  const active = pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));

  return (
    <Link href={href} onClick={onClick} aria-current={active ? "page" : undefined} className={linkClass(mobile, active, dock)}>
      {children}
    </Link>
  );
}

export function NavigationLink(props: NavigationLinkProps) {
  // Dynamic article paths may not be known while the shared header prerenders.
  return (
    <Suspense fallback={<Link href={props.href} onClick={props.onClick} className={linkClass(props.mobile ?? false, false, props.dock)}>{props.children}</Link>}>
      <ActiveLink {...props} />
    </Suspense>
  );
}
