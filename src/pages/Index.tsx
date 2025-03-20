import { ProjectForm } from "@/components/ProjectForm";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Sparkles, Mail, Image, FileCode, Bot } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 max-w-screen-2xl items-center">
          <div className="flex items-center space-x-2">
            <div className="glass-effect rounded-lg px-4 py-2">
              <span className="font-bold text-2xl bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                zap
              </span>
            </div>
          </div>
          <div className="flex-1" />
          <ThemeToggle />
        </div>
      </header>

      <main className="container max-w-screen-2xl mx-auto px-4 py-6">
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight gradient-text font-serif">
            CBP Generator
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto font-semibold italic font-sans">
            Generate CBP reports within <span className="text-primary">30 seconds</span>
          </p>
        </div>
        
        <ProjectForm />
        
        <footer className="mt-20 py-8 border-t border-border">
          <div className="container max-w-screen-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold gradient-text font-serif">Contact me</h3>
                <div className="space-y-2 text-muted-foreground font-sans">
                  <p className="flex items-center gap-2">
                    <span className="font-medium text-foreground">Nagula Vamshi Goud</span>
                  </p>
                  <p className="flex items-center gap-2">
                    Batch: AIDS (2022-2026)
                  </p>
                  <a 
                    href="mailto:x@gmail.com" 
                    className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
                  >
                    <Mail className="h-4 w-4" />
                    x@gmail.com
                  </a>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold gradient-text font-serif">Features</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-sans">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <FileCode className="h-4 w-4 text-primary" />
                    Code Output Support
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Image className="h-4 w-4 text-primary" />
                    Result Images Upload
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Bot className="h-4 w-4 text-primary" />
                    AI Content Generation
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Sparkles className="h-4 w-4 text-primary" />
                    Professional Reports
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Index;