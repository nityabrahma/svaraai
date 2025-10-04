'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProfileForm from '@/components/settings/profile-form';
import SubscriptionPlan from '@/components/settings/subscription-plan';
import Webhooks from '@/components/settings/webhooks';
import { useUser } from '@/hooks/use-user';
import { Skeleton } from '@/components/ui/skeleton';


export default function SettingsPage() {
  const { user, loading } = useUser();

  if (loading) {
    return (
        <div className="space-y-8">
             <div>
                <Skeleton className="h-10 w-1/3" />
                <Skeleton className="h-4 w-2/3 mt-2" />
            </div>
             <div className="max-w-lg">
                <Skeleton className="h-10 w-full mb-6" />
                <Skeleton className="h-64 w-full" />
            </div>
        </div>
    )
  }

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
          <ProfileForm user={user} />
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
