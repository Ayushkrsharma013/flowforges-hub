import { AppHub } from '@/components/AppHub';
import { createClient } from '@/lib/supabase/server';

export default async function HubPage() {
  let profile = null;
  try {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data } = await supabase
        .from('profiles')
        .select('display_name, email, role, plan, subscription_status')
        .eq('id', user.id)
        .single();
      profile = data;
    }
  } catch {
    // Auth is optional — hub renders without personalization if env vars missing
  }

  return <AppHub profile={profile} />;
}
