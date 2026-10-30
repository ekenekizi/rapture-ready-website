import { navigation } from "@/lib/content";
import { NavigationLink } from "@/components/navigation-link";

export function MobileBottomNav() {
  return (
    <nav className="mobile-glass-nav" aria-label="Mobile navigation">
      {navigation.map((item) => (
        <NavigationLink key={item.href} href={item.href} dock>
          <span>{item.label}</span>
        </NavigationLink>
      ))}
    </nav>
  );
}
