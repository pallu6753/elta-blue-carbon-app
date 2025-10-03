'use client'
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { aiAssistedMRV } from '@/ai/flows/ai-assisted-mrv';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Loader2 } from 'lucide-react';

export default function MRVView() {
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any>(null);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        setResult(null);

        // This is a placeholder for a real file upload.
        // Genkit's `media` helper expects a data URI.
        const fakeSatelliteImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==';

        try {
            const output = await aiAssistedMRV({
                projectName: 'Sunderbans Mangrove Restoration (Simulated)',
                projectType: 'Mangrove Restoration',
                projectLocation: 'Sunderbans, India',
                projectTarget: 15000,
                satelliteDataUri: fakeSatelliteImage,
                baselineDataDescription: 'Baseline data from 2022 survey showing mangrove coverage and initial carbon stock assessment.'
            });
            setResult(output);
            toast({ title: "MRV Report Generated", description: "AI analysis complete." });
        } catch (error) {
            console.error(error);
            toast({
                variant: 'destructive',
                title: 'Error',
                description: 'Failed to generate MRV report.',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle className="text-3xl font-bold text-gray-800">MRV and Verification Reports</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-gray-600">This view contains tools for submitting, reviewing, or analyzing MRV data.</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>AI-Assisted MRV Report Generation</CardTitle>
                    <CardDescription>Generate a baseline MRV report summary using AI. This form is pre-filled with sample data.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                         <div>
                            <Label>Project Name</Label>
                            <Input defaultValue="Sunderbans Mangrove Restoration (Simulated)" disabled />
                        </div>
                        <div>
                            <Label>Baseline Data Description</Label>
                            <Textarea defaultValue="Baseline data from 2022 survey showing mangrove coverage and initial carbon stock assessment." disabled />
                        </div>
                        <div>
                            <Label>Satellite Data</Label>
                            <div className="text-sm p-2 bg-gray-100 rounded-md border">
                                Using simulated satellite data for this demo.
                            </div>
                        </div>
                        <Button type="submit" disabled={loading}>
                            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Generate Report
                        </Button>
                    </form>
                    {result && (
                        <div className="mt-6 p-4 bg-gray-50 rounded-lg border space-y-4">
                            <h3 className="font-bold text-lg">Generated Report Summary</h3>
                            <div>
                                <h4 className="font-semibold">Report Summary</h4>
                                <p className="text-sm text-muted-foreground">{result.reportSummary}</p>
                            </div>
                             <div>
                                <h4 className="font-semibold">Data Quality Assessment</h4>
                                <p className="text-sm text-muted-foreground">{result.dataQualityAssessment}</p>
                            </div>
                             <div>
                                <h4 className="font-semibold">Suggested Improvements</h4>
                                <p className="text-sm text-muted-foreground">{result.suggestedImprovements}</p>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
