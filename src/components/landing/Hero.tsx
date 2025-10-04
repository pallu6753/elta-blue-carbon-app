'use client';
import React, { useContext, useState } from 'react';
import { Waves, ArrowRight } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { AppContext, AppContextType, Role } from '@/context/AppProvider';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { useAuth, initiateEmailSignIn, initiateEmailSignUp } from '@/firebase';
import { useToast } from '@/hooks/use-toast';

export default function Hero() {
  const { setRole, user } = useContext(AppContext) as AppContextType;
  const [selectedRole, setSelectedRole] = useState<Role | ''>('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSigningUp, setIsSigningUp] = useState(false);
  const auth = useAuth();
  const { toast } = useToast();

  const handleAuthAction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth || !email || !password) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Please enter both email and password.',
      });
      return;
    }
    if (isSigningUp) {
      if (!selectedRole) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Please select a role to sign up.',
        });
        return;
      }
      initiateEmailSignUp(auth, email, password);
      // The AppProvider will handle role setting on new user creation
    } else {
      initiateEmailSignIn(auth, email, password);
    }
  };

  const handleRoleSelection = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRole) {
      setRole(selectedRole as Role);
    }
  };

  // If user is authenticated but has no role, show role selection
  if (user) {
    return (
        <div className="text-center max-w-sm w-full p-8 rounded-xl bg-white/90 shadow-2xl">
          <Waves className="h-10 w-10 mx-auto mb-2 text-primary" />
          <h1 className="text-3xl font-extrabold mb-2 text-blue-carbon">Select Your Role</h1>
          <p className="text-base text-gray-700 mb-8">
            Complete your profile by selecting a role.
          </p>

          <form onSubmit={handleRoleSelection}>
            <Select onValueChange={(value) => setSelectedRole(value as Role)} value={selectedRole || ''}>
              <SelectTrigger className="w-full p-3 mb-6 bg-white text-gray-800 border border-gray-300 rounded-lg shadow-inner focus:ring-primary focus:border-primary h-auto text-base">
                <SelectValue placeholder="Select your role..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Project Developer">Project Developer</SelectItem>
                <SelectItem value="Verifier">Verifier</SelectItem>
                <SelectItem value="Investor">Investor</SelectItem>
                <SelectItem value="Regulator">Regulator</SelectItem>
              </SelectContent>
            </Select>

            <Button type="submit" size="lg" className="w-full text-lg h-auto py-3 bg-primary hover:bg-primary/90" disabled={!selectedRole}>
              <span>Continue</span>
              <ArrowRight className="h-5 w-5" />
            </Button>
          </form>
        </div>
    );
  }


  return (
    <div className="text-center max-w-sm w-full p-8 rounded-xl bg-white/90 shadow-2xl">
      <Waves className="h-10 w-10 mx-auto mb-2 text-primary" />
      <h1 className="text-4xl font-extrabold mb-8 text-blue-carbon">Elta</h1>

      <form onSubmit={handleAuthAction} className="space-y-4 text-left">
        <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        </div>
         <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        </div>
        
        {isSigningUp && (
           <div className="space-y-2">
            <Label>Role</Label>
            <Select onValueChange={(value) => setSelectedRole(value as Role)} value={selectedRole || ''} required>
                <SelectTrigger className="w-full p-3 bg-white text-gray-800 border border-gray-300 rounded-lg shadow-inner focus:ring-primary focus:border-primary h-auto text-base">
                <SelectValue placeholder="Select your role..." />
                </SelectTrigger>
                <SelectContent>
                <SelectItem value="Project Developer">Project Developer</SelectItem>
                <SelectItem value="Verifier">Verifier</SelectItem>
                <SelectItem value="Investor">Investor</SelectItem>
                <SelectItem value="Regulator">Regulator</SelectItem>
                </SelectContent>
            </Select>
          </div>
        )}

        <div className="text-center pt-4">
            <Button type="submit" size="lg" className="w-full text-lg h-auto py-3 bg-primary hover:bg-primary/90">
              <span>{isSigningUp ? 'Sign Up' : 'Sign In'}</span>
              <ArrowRight className="h-5 w-5" />
            </Button>
            <Button variant="link" onClick={() => setIsSigningUp(!isSigningUp)} className="mt-4">
                {isSigningUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
            </Button>
        </div>
      </form>

      <p className="text-xs text-gray-500 mt-6">
        By clicking continue, you agree to our{' '}
        <a href="#" className="underline hover:text-primary">
          Terms of Service
        </a>{' '}
        and{' '}
        <a href="#" className="underline hover:text-primary">
          Privacy Policy
        </a>
        .
      </p>
    </div>
  );
}
