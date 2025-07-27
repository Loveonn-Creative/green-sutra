import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Leaf, TrendingUp, Award, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface GreenScoreCardProps {
  score: number;
  previousScore?: number;
  factors: {
    carbonEfficiency: number;
    wasteManagement: number;
    energyUsage: number;
    compliance: number;
  };
  recommendations?: string[];
  className?: string;
}

const GreenScoreCard = ({ 
  score, 
  previousScore, 
  factors, 
  recommendations = [],
  className 
}: GreenScoreCardProps) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-success";
    if (score >= 60) return "text-warning";
    return "text-destructive";
  };

  const getScoreGrade = (score: number) => {
    if (score >= 90) return { grade: "A+", color: "success" };
    if (score >= 80) return { grade: "A", color: "success" };
    if (score >= 70) return { grade: "B+", color: "warning" };
    if (score >= 60) return { grade: "B", color: "warning" };
    if (score >= 50) return { grade: "C", color: "destructive" };
    return { grade: "D", color: "destructive" };
  };

  const scoreGrade = getScoreGrade(score);
  const improvement = previousScore ? score - previousScore : 0;

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Leaf className="h-5 w-5 text-success" />
            <span>Green CIBIL Score</span>
          </div>
          <Badge variant={scoreGrade.color as any} className="text-sm">
            Grade {scoreGrade.grade}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Main Score Display */}
        <div className="text-center space-y-2">
          <div className={cn("text-5xl font-bold", getScoreColor(score))}>
            {score}
          </div>
          <div className="text-muted-foreground">out of 100</div>
          {improvement !== 0 && (
            <div className="flex items-center justify-center space-x-1">
              <TrendingUp className={cn("h-4 w-4", improvement > 0 ? "text-success" : "text-destructive")} />
              <span className={cn("text-sm", improvement > 0 ? "text-success" : "text-destructive")}>
                {improvement > 0 ? "+" : ""}{improvement} from last month
              </span>
            </div>
          )}
        </div>

        {/* Score Breakdown */}
        <div className="space-y-4">
          <h4 className="font-semibold flex items-center space-x-2">
            <Award className="h-4 w-4" />
            <span>Score Breakdown</span>
          </h4>
          
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Carbon Efficiency</span>
                <span>{factors.carbonEfficiency}%</span>
              </div>
              <Progress value={factors.carbonEfficiency} className="h-2" />
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Waste Management</span>
                <span>{factors.wasteManagement}%</span>
              </div>
              <Progress value={factors.wasteManagement} className="h-2" />
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Energy Usage</span>
                <span>{factors.energyUsage}%</span>
              </div>
              <Progress value={factors.energyUsage} className="h-2" />
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Compliance</span>
                <span>{factors.compliance}%</span>
              </div>
              <Progress value={factors.compliance} className="h-2" />
            </div>
          </div>
        </div>

        {/* Recommendations */}
        {recommendations.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-semibold flex items-center space-x-2">
              <AlertCircle className="h-4 w-4" />
              <span>Recommendations</span>
            </h4>
            <div className="space-y-2">
              {recommendations.map((rec, index) => (
                <div key={index} className="p-3 bg-accent/30 rounded-lg">
                  <p className="text-sm text-muted-foreground">{rec}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="pt-4 border-t">
          <p className="text-xs text-muted-foreground text-center">
            Score updated based on your recent activities and compliance data
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default GreenScoreCard;