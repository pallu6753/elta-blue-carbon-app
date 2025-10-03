'use client';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wallet, Banknote, Archive, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getProjectRecommendations, ProjectRecommendationsOutput } from '@/ai/flows/intelligent-project-recommendations';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

const widgets = [
    { title: 'Credits Owned', value: '1,000 tCO₂e', icon: Wallet, subtext: 'Total credits in your portfolio' },
    { title: 'Portfolio Value', value: '$20,000', icon: Banknote, subtext: 'Estimated market value', valueColor: 'text-primary' },
    { title: 'Credits Retired', value: '0 tCO₂e', icon: Archive, subtext: 'Simulated retirement', valueColor: 'text-muted-foreground' },
    { title: 'Price Change', value: '+15.2%', icon: TrendingUp, subtext: 'Last 30 days', valueColor: 'text-green-500' },
];

export default function InvestorDashboard() {
  const [loading, setLoading] = React.useState(false);
  const [recommendations, setRecommendations] = React.useState<ProjectRecommendationsOutput | null>(null);
  const { toast } = useToast();

  const handleGetRecommendations = async () => {
    setLoading(true);
    setRecommendations(null);
    try {
      const result = await getProjectRecommendations({
        investmentGoals: "High-impact blue carbon projects with long-term growth potential.",
        riskTolerance: "Medium",
        investmentSize: 50000,
      });
      setRecommendations(result);
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not fetch AI project recommendations.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-foreground">Investor Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {widgets.map(widget => (
            <Card key={widget.title} className="shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm uppercase font-medium text-muted-foreground">{widget.title}</CardTitle>
                    <widget.icon className="h-6 w-6 text-gray-400" />
                </CardHeader>
                <CardContent>
                    <div className={`text-4xl font-extrabold ${widget.valueColor || 'text-primary'}`}>{widget.value}</div>
                    <p className="text-xs text-muted-foreground">{widget.subtext}</p>
                </CardContent>
            </Card>
        ))}
      </div>
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>AI-Powered Project Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Get project recommendations tailored to your investment profile.
          </p>
          <Button onClick={handleGetRecommendations} disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {loading ? 'Generating...' : 'Get Recommendations'}
          </Button>
          {recommendations && (
            <div className="mt-6 space-y-4">
              {recommendations.recommendations.map((rec, index) => (
                <Card key={index} className="bg-background/50">
                  <CardHeader>
                    <CardTitle>{rec.projectName}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <p><strong>Type:</strong> {rec.projectType}</p>
                    <p><strong>Est. Credits:</strong> {rec.carbonCreditEstimate}</p>
                    <p><strong>Location:</strong> {rec.location}</p>
                    <p><strong>Risk:</strong> {rec.riskAssessment}</p>
                    <p><strong>Expected Return:</strong> {rec.expectedReturn}</p>
                    <p><strong>Impact:</strong> {rec.environmentalImpact}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
