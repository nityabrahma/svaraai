import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

export default function SubscriptionPlan() {
  const currentPlan = 'Pro';
  const leadsUsed = 1254;
  const leadsLimit = 2000;
  const usagePercentage = (leadsUsed / leadsLimit) * 100;

  return (
    <Card className="max-w-lg">
      <CardHeader>
        <CardTitle className="font-headline">Subscription Plan</CardTitle>
        <CardDescription>
          You are currently on the <span className="font-semibold text-primary">{currentPlan}</span> plan.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <p className="text-sm font-medium">Leads Usage</p>
            <p className="text-sm text-muted-foreground">
              {leadsUsed.toLocaleString()} / {leadsLimit.toLocaleString()}
            </p>
          </div>
          <Progress value={usagePercentage} />
          <p className="text-xs text-muted-foreground">
            You have used {usagePercentage.toFixed(0)}% of your monthly lead limit.
          </p>
        </div>
      </CardContent>
      <CardFooter className="border-t px-6 py-4">
        <Button>Manage Subscription</Button>
      </CardFooter>
    </Card>
  );
}
