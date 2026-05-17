import { AppHub } from '@/components/AppHub';
import { createClient } from '@/lib/supabase/server';

export default async function HubPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  let profile = null;
  if (user) {
    const { data } = await supabase
      .from('profiles')
      .select('display_name, email, role, plan, subscription_status')
      .eq('id', user.id)
      .single();
    profile = data;
  }

  return <AppHub profile={profile} />;
}
