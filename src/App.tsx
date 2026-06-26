import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import WinningSystem from "./pages/WinningSystem.tsx";
import Resources from "./pages/Resources.tsx";
// import Mentorship from "./pages/Mentorship.tsx";
import LearnSystem from "./pages/LearnSystem.tsx";
import PolicyHub from "./pages/PolicyHub.tsx";
import FAQ from "./pages/FAQ.tsx";
import About from "./pages/About.tsx";
import TeamPairing from "./pages/TeamPairing.tsx";
import AdminLog from "./pages/AdminLog.tsx";
import HubAdmin from "./pages/HubAdmin.tsx";
import HubsDirectory from "./pages/HubsDirectory.tsx";
import AllHubs from "./pages/AllHubs.tsx";
import HowToApply from "./pages/HowToApply.tsx";
import OpenHouse from "./pages/OpenHouse.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/winning-system" element={<WinningSystem />} />
          <Route path="/resources" element={<Resources />} />
          {/* <Route path="/mentorship" element={<Mentorship />} /> */}
          <Route path="/learn-system" element={<LearnSystem />} />
          <Route path="/submissions" element={<LearnSystem />} />
          <Route path="/team-pairing" element={<TeamPairing />} />
          <Route path="/adminlog" element={<AdminLog />} />
          <Route path="/admin/hubs" element={<HubAdmin />} />
          <Route path="/hubs" element={<HubsDirectory />} />
          <Route path="/hubs/all" element={<AllHubs />} />
          <Route path="/apply" element={<HowToApply />} />
          <Route path="/hub" element={<PolicyHub />} />
          <Route path="/policy-hub" element={<PolicyHub />} />
          <Route path="/open-house" element={<OpenHouse />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
