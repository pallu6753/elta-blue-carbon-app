'use client';
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  useCollection,
  useFirestore,
  useMemoFirebase,
  WithId,
} from '@/firebase';
import { collection, orderBy, query, Timestamp } from 'firebase/firestore';
import { Loader2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { formatDistanceToNow } from 'date-fns';

interface Contact {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
  createdAt: Timestamp;
}

export default function ContactsView() {
  const firestore = useFirestore();
  const contactsCollection = useMemoFirebase(
    () =>
      firestore
        ? query(collection(firestore, 'contacts'), orderBy('createdAt', 'desc'))
        : null,
    [firestore]
  );
  const {
    data: contacts,
    isLoading,
    error,
  } = useCollection<Contact>(contactsCollection);

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-foreground">
            Contact Submissions
          </CardTitle>
          <CardDescription>
            Messages submitted through the public contact form.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading && (
            <div className="flex items-center justify-center p-8">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          )}
          {error && (
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                Could not load contact messages. Please check your connection
                or permissions.
              </AlertDescription>
            </Alert>
          )}
          {!isLoading && !error && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Submitted</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Message</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {contacts && contacts.length > 0 ? (
                  contacts.map((contact) => (
                    <TableRow key={contact.id}>
                      <TableCell>
                        {contact.createdAt
                          ? formatDistanceToNow(contact.createdAt.toDate(), {
                              addSuffix: true,
                            })
                          : 'N/A'}
                      </TableCell>
                      <TableCell className="font-medium">{`${contact.firstName} ${contact.lastName}`}</TableCell>
                      <TableCell>
                        <a
                          href={`mailto:${contact.email}`}
                          className="text-primary hover:underline"
                        >
                          {contact.email}
                        </a>
                      </TableCell>
                      <TableCell className="max-w-sm truncate">
                        {contact.message}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center">
                      No messages yet.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
