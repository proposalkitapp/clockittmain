-- Replace has_role usage in the waitlist read policy with a direct role check
-- so the security definer function no longer needs to be publicly executable.
DROP POLICY IF EXISTS "Admins can read waitlist signups" ON public.waitlist_signups;

CREATE POLICY "Admins can read waitlist signups"
ON public.waitlist_signups
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid() AND role = 'admin'
  )
);

-- Revoke public execute access on the security definer function
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM anon;
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM authenticated;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO service_role;