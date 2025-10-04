'use client';

import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Send } from 'lucide-react';
import Image from 'next/image';

export default function ContactSection() {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you'd handle form submission here.
    toast({
      title: 'Message Sent!',
      description: "Thanks for reaching out. We'll get back to you shortly.",
    });
    (e.target as HTMLFormElement).reset();
  };

  return (
    <div className="max-w-6xl w-full p-8 rounded-xl bg-white/90 shadow-2xl overflow-hidden grid md:grid-cols-2 gap-10 items-center">
      <div className="relative h-64 md:h-full w-full rounded-lg overflow-hidden">
        <Image 
          src="https://picsum.photos/seed/contact/800/600"
          alt="Contact us"
          fill
          style={{ objectFit: 'cover' }}
          data-ai-hint="coastline aerial"
        />
      </div>
      <div>
        <h2 className="text-3xl font-bold text-blue-carbon mb-2 text-center md:text-left">
          Get in Touch
        </h2>
        <p className="text-center md:text-left text-gray-600 mb-8">
          Have questions or want to partner with us? Drop us a line.
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="first-name">First Name</Label>
              <Input id="first-name" name="first-name" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="last-name">Last Name</Label>
              <Input id="last-name" name="last-name" required />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" name="email" type="email" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea id="message" name="message" rows={5} required />
          </div>
          <div className="text-center md:text-left">
            <Button type="submit" size="lg" className="bg-blue-carbon hover:bg-blue-carbon/90">
              <Send className="mr-2 h-5 w-5" />
              Send Message
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
