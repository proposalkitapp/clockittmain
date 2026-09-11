import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { checkIsAdmin } from "@/lib/auth";

export const Route = createFileRoute("/_authenticated")({
  ssr: false,
  beforeLoad: async () => {
    const { data, error } = await supabase.auth.getUser();
    if (error || !data.user) {
      throw redirect({ to: "/danielwashere" });
    }

    const isAdmin = await checkIsAdmin(data.user.id);
    if (!isAdmin) {
      await supabase.auth.signOut();
      throw redirect({ to: "/danielwashere" });
    }

    return { user: data.user, isAdmin: true };
  },
  component: () => <Outlet />,
});

