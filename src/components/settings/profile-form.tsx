'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import { User as FirebaseUser, getAuth, updateProfile } from "firebase/auth";
import { useFirebase } from '@/firebase/provider';
import { doc, getFirestore, setDoc } from 'firebase/firestore';

const profileFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  email: z.string().email('Please enter a valid email address.').optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export default function ProfileForm({ user }: { user: FirebaseUser | null }) {
  const { app } = useFirebase();
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: user?.displayName || '',
      email: user?.email || '',
    },
  });

  async function onSubmit(data: ProfileFormValues) {
    const auth = getAuth(app);
    const firestore = getFirestore(app);
    const currentUser = auth.currentUser;

    if (!currentUser) {
        toast({
            variant: "destructive",
            title: 'Error',
            description: 'You must be logged in to update your profile.',
        });
        return;
    }

    try {
        await updateProfile(currentUser, { displayName: data.name });
        
        // Also update the user's profile in Firestore if you store it there
        const userDocRef = doc(firestore, 'users', currentUser.uid);
        await setDoc(userDocRef, { name: data.name }, { merge: true });

        toast({
            title: 'Profile updated!',
            description: 'Your profile information has been successfully updated.',
        });
    } catch(error) {
        console.error("Error updating profile: ", error);
        toast({
            variant: "destructive",
            title: 'Uh oh! Something went wrong.',
            description: 'There was a problem updating your profile.',
        });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className="max-w-lg">
          <CardHeader>
            <CardTitle className="font-headline">Your Profile</CardTitle>
            <CardDescription>
              Update your personal information here.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="your.email@example.com" {...field} disabled />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="border-t px-6 py-4">
            <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? 'Saving...' : 'Save Changes'}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
