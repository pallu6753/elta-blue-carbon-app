import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

const creditListings = [
    { id: 1, project: 'Sunderbans Mangrove Restoration', type: 'Mangrove', vintage: 2023, price: 25.50, available: 500 },
    { id: 2, project: 'Andaman Islands Seagrass Meadow', type: 'Seagrass', vintage: 2024, price: 32.00, available: 1200 },
    { id: 3, project: 'Gulf of Kutch Coral Reef', type: 'Coral Reef', vintage: 2023, price: 45.75, available: 300 },
    { id: 4, project: 'Chilika Lake Conservation', type: 'Salt Marsh', vintage: 2022, price: 18.00, available: 2500 },
    { id: 5, project: 'Mahanadi Delta Seagrass Project', type: 'Seagrass', vintage: 2024, price: 28.50, available: 800 },
];


export default function MarketplaceView() {
    const { toast } = useToast();

    const handleBuy = (project: string) => {
        toast({
            title: "Purchase Initiated",
            description: `Proceeding to purchase credits from ${project}. A real app would integrate a payment gateway.`,
        });
    }

  return (
    <div className="space-y-8">
        <Card>
        <CardHeader>
            <CardTitle className="text-3xl font-bold text-foreground">Carbon Marketplace</CardTitle>
            <CardDescription>Browse, purchase, and trade verified blue carbon credits from projects around the world.</CardDescription>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Project</TableHead>
                        <TableHead>Credit Type</TableHead>
                        <TableHead>Vintage</TableHead>
                        <TableHead>Price (USD/tCO₂e)</TableHead>
                        <TableHead>Available</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {creditListings.map((listing) => (
                        <TableRow key={listing.id}>
                            <TableCell className="font-medium">{listing.project}</TableCell>
                            <TableCell>
                                <Badge variant="secondary">{listing.type}</Badge>
                            </TableCell>
                            <TableCell>{listing.vintage}</TableCell>
                            <TableCell className="font-semibold">${listing.price.toFixed(2)}</TableCell>
                            <TableCell>{listing.available.toLocaleString()} tCO₂e</TableCell>
                            <TableCell className="text-right">
                                <Button size="sm" onClick={() => handleBuy(listing.project)}>Buy Credits</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </CardContent>
        </Card>
    </div>
  );
}
