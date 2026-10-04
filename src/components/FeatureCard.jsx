import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";

export default function FeatureCard({ icon, title, description, infoBox, buttonText, buttonVariant = "default", onClick }) {
  return (
    <Card className="flex flex-col justify-between border-slate-200 transition-all duration-200 hover:shadow-md">
      <CardHeader>
        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-slate-100 text-2xl">
          {icon}
        </div>
        <CardTitle className="text-xl text-slate-800">{title}</CardTitle>
        <CardDescription className="text-slate-500 leading-relaxed">
          {description}
        </CardDescription>
      </CardHeader>

      <CardContent>
        {infoBox}
      </CardContent>

      <CardFooter>
        <Button 
          variant={buttonVariant} 
          onClick={onClick}
          className={`w-full ${buttonVariant === 'default' ? 'bg-blue-600 hover:bg-blue-700 text-white' : ''}`}
        >
          {buttonText}
        </Button>
      </CardFooter>
    </Card>
  );
}