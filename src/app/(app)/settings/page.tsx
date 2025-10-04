import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProfileForm from '@/components/settings/profile-form';
import SubscriptionPlan from '@/components/settings/subscription-plan';
import Webhooks from '@/components/settings/webhooks';

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold font-headline tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account, subscription, and integrations.
        </p>
      </div>
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-3 max-w-lg">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="subscription">Subscription</TabsTrigger>
          <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
        </TabsList>
        <TabsContent value="profile" className="mt-6">
          <ProfileForm />
        </TabsContent>
        <TabsContent value="subscription" className="mt-6">
          <SubscriptionPlan />
        </TabsContent>
        <TabsContent value="webhooks" className="mt-6">
          <Webhooks />
        </TabsContent>
      </Tabs>
    </div>
  );
}
