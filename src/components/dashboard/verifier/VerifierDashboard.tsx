'use client';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ClipboardList, CheckCircle, CircleX, FileWarning, Wallet } from 'lucide-react';
import RiskAnalysisChart from './RiskAnalysisChart';
import { Table, TableBody, TableCell, TableRow, TableHead, TableHeader } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { ethers, Contract } from 'ethers';
import { AppContext, AppContextType } from '@/context/AppProvider';
import CarbonCreditABI from '@/contracts/CarbonCreditABI.json';

const widgets = [
    { title: 'Reports to Review', value: '3', icon: ClipboardList, subtext: 'Awaiting your verification', borderColor: 'border-yellow-500', valueColor: 'text-yellow-500' },
    { title: 'Reports Approved', value: '1', icon: CheckCircle, subtext: 'In the last 30 days', borderColor: 'border-green-500', valueColor: 'text-green-500' },
    { title: 'Reports Rejected', value: '0', icon: CircleX, subtext: 'In the last 30 days', borderColor: 'border-red-500', valueColor: 'text-red-500' },
];

const reportsToReview = [
  { name: 'Sunderbans Mangrove - Q3 Report', developer: 'Alice Developer', risk: 'Low', developerWallet: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266', amount: 500 },
  { name: 'Mahanadi Seagrass - Initial Baseline', developer: 'Alice Developer', risk: 'Medium', developerWallet: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266', amount: 1200 },
  { name: 'Ocean Reef Project - Annual Audit', developer: 'Global Ocean Fund', risk: 'High', developerWallet: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8', amount: 350 },
];

// This address is for the local Hardhat test network.
// In a production environment, this would be the address of the contract
// deployed on a Layer 2 network like Polygon or Arbitrum for scalability.
const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; 


export default function VerifierDashboard() {
  const { toast } = useToast();
  const { walletAddress } = React.useContext(AppContext) as AppContextType;

  const handleReviewAndMint = async (developerWallet: string, amount: number) => {
    if (!walletAddress) {
        toast({
            variant: "destructive",
            title: "Wallet Not Connected",
            description: "Please connect your wallet to approve reports and mint credits.",
        });
        return;
    }

    if (typeof window.ethereum === 'undefined') {
        toast({ variant: "destructive", title: "MetaMask Not Found" });
        return;
    }

    try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const carbonCreditContract = new Contract(contractAddress, CarbonCreditABI, signer);

        toast({
            title: "Minting Transaction Sent",
            description: `Approving report and minting ${amount} credits for developer...`
        });

        // In a real scenario, you'd have more robust state management for the transaction lifecycle
        const tx = await carbonCreditContract.mintCredits(developerWallet, amount);
        await tx.wait(); // Wait for the transaction to be mined

        toast({
            title: "Transaction Successful!",
            description: `${amount} Carbon Credits successfully minted to ${developerWallet.substring(0,6)}...`,
        });

    } catch (error: any) {
        console.error("Smart Contract minting error:", error);
        toast({
            variant: "destructive",
            title: "Smart Contract Error",
            description: error?.revert?.args[0] || error.message || "Could not complete the minting transaction.",
        });
    }
  }

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-foreground">Verifier Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {widgets.map(widget => (
            <Card key={widget.title} className={`shadow-lg border-l-4 ${widget.borderColor}`}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm uppercase font-medium text-muted-foreground">{widget.title}</CardTitle>
                    <widget.icon className="h-6 w-6 text-gray-400" />
                </CardHeader>
                <CardContent>
                    <div className={`text-4xl font-extrabold ${widget.valueColor}`}>{widget.value}</div>
                    <p className="text-xs text-muted-foreground">{widget.subtext}</p>
                </CardContent>
            </Card>
        ))}
      </div>

       <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Reports Awaiting Verification</CardTitle>
            <CardDescription>Approve reports to mint verified carbon credits on the blockchain.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Project Report</TableHead>
                  <TableHead>Developer</TableHead>
                  <TableHead>Risk Level</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reportsToReview.map(report => (
                  <TableRow key={report.name}>
                    <TableCell className="font-medium">{report.name}</TableCell>
                    <TableCell>{report.developer}</TableCell>
                    <TableCell>
                      <Badge variant={report.risk === 'Low' ? 'default' : report.risk === 'Medium' ? 'secondary' : 'destructive'} className={report.risk === 'Low' ? 'bg-blue-100 text-blue-800' : report.risk === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}>{report.risk}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm" onClick={() => handleReviewAndMint(report.developerWallet, report.amount)}>
                          <Wallet className="h-4 w-4 mr-2" />
                          Approve & Mint Credits
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

      <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><FileWarning className="h-5 w-5 text-yellow-500" /> AI-Flagged Risk Analysis</CardTitle>
            <CardDescription>AI has identified potential risks in submitted MRV data across all active projects.</CardDescription>
          </CardHeader>
          <CardContent>
              <RiskAnalysisChart />
          </CardContent>
      </Card>
    </div>
  );
}
