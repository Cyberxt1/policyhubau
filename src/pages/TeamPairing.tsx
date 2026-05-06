import { useEffect, useMemo, useState } from "react";
import { LoaderCircle, Search, Users } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  fetchTeamPairingDataFromFirestore,
  findGroupByNumber,
  findStudentInGroup,
  getActiveGroups,
  getPublishedTeamSet,
  getWhatsappLink,
  loadTeamPairingData,
  normalizeNumber,
  readLocalTeamPairingData,
  Student,
  TeamPairingData,
} from "@/lib/teamPairing";

const TeamPairing = () => {
  const [data, setData] = useState<TeamPairingData>(readLocalTeamPairingData());
  const [lookupNumber, setLookupNumber] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [searchAttempted, setSearchAttempted] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isSyncing, setIsSyncing] = useState(true);
  const [isCheckingTeam, setIsCheckingTeam] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const syncData = async () => {
      const nextData = await loadTeamPairingData();

      if (!cancelled) {
        setData(nextData);
        setIsSyncing(false);
      }
    };

    syncData();
    const intervalId = window.setInterval(syncData, 15000);
    window.addEventListener("focus", syncData);

    return () => {
      cancelled = true;
      window.clearInterval(intervalId);
      window.removeEventListener("focus", syncData);
    };
  }, []);

  const activeGroups = useMemo(() => getActiveGroups(data), [data]);
  const activeSet = useMemo(() => getPublishedTeamSet(data), [data]);

  const currentGroup = useMemo(() => findGroupByNumber(activeGroups, lookupNumber), [activeGroups, lookupNumber]);

  const currentStudent = useMemo(
    () => findStudentInGroup(currentGroup, lookupNumber),
    [currentGroup, lookupNumber],
  );

  const handleCheckTeam = async () => {
    setSearchAttempted(true);
    setIsCheckingTeam(true);

    try {
      const freshData = await fetchTeamPairingDataFromFirestore();
      setData(freshData);

      const freshGroups = getActiveGroups(freshData);
      const freshGroup = findGroupByNumber(freshGroups, lookupNumber);
      const freshStudent = findStudentInGroup(freshGroup, lookupNumber);

      if (freshGroup && freshStudent) {
        setSelectedStudent(freshStudent);
        setDialogOpen(true);
        return;
      }

      setSelectedStudent(null);
      setDialogOpen(false);
    } catch {
      if (currentGroup && currentStudent) {
        setSelectedStudent(currentStudent);
        setDialogOpen(true);
      } else {
        setSelectedStudent(null);
        setDialogOpen(false);
      }
    } finally {
      setIsCheckingTeam(false);
    }
  };

  return (
    <SiteLayout>
      <PageHeader
        eyebrow={data.content.eyebrow}
        title={data.content.title}
        lead={data.content.lead}
      />

      <section className="border-b border-border">
        <div className="container-narrow py-20 grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7">
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="font-display text-2xl text-primary">
                  {data.content.lookupTitle}
                </CardTitle>
                <CardDescription>{data.content.lookupLead}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                {isSyncing ? (
                  <div className="space-y-3">
                    <Skeleton className="h-5 w-40" />
                    <Skeleton className="h-16 w-full" />
                  </div>
                ) : activeSet ? (
                  <div className="rounded-sm border border-border bg-surface px-4 py-3 text-sm text-muted-foreground">
                    Viewing published set: <span className="font-medium text-primary">{activeSet.name}</span>
                  </div>
                ) : null}

                <div className="space-y-3">
                  <label className="block text-sm font-medium text-primary">
                    Phone number
                  </label>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Input
                      value={lookupNumber}
                      onChange={(event) => setLookupNumber(event.target.value)}
                      placeholder={data.content.searchPlaceholder}
                      disabled={isCheckingTeam}
                    />
                    <Button type="button" onClick={handleCheckTeam} disabled={isCheckingTeam}>
                      {isCheckingTeam ? <LoaderCircle size={16} className="animate-spin" /> : <Search size={16} />}
                      {isCheckingTeam ? "Checking..." : "Check team"}
                    </Button>
                  </div>
                </div>

                {isSyncing && (
                  <div className="rounded-sm border border-dashed border-border px-4 py-6">
                    <div className="space-y-3">
                      <Skeleton className="h-4 w-28" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-10 w-36" />
                    </div>
                  </div>
                )}

                {!isSyncing && isCheckingTeam && (
                  <div className="rounded-sm border border-dashed border-border px-4 py-6 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2 text-primary">
                      <LoaderCircle size={16} className="animate-spin" />
                      Fetching your latest team from Firebase...
                    </div>
                  </div>
                )}

                {!isSyncing && !searchAttempted && (
                  <div className="rounded-sm border border-dashed border-border px-4 py-6 text-sm text-muted-foreground">
                    {data.content.emptyState}
                  </div>
                )}

                {!isSyncing && !isCheckingTeam && searchAttempted && !currentGroup && (
                  <div className="rounded-sm border border-dashed border-border px-4 py-6 text-sm text-muted-foreground">
                    {activeSet ? data.content.notFoundMessage : "No team set has been published yet. Please check again later."}
                  </div>
                )}

                {!isCheckingTeam && currentGroup && currentStudent && (
                  <div className="rounded-sm border border-border bg-surface p-5">
                    <div className="flex items-center gap-2 text-primary">
                      <Users size={18} className="text-accent" />
                      <p className="font-display text-lg">{currentGroup.id}</p>
                    </div>
                    <p className="mt-3 text-sm text-muted-foreground">
                      Team found. Open the popup card to see your teammates and contact them on WhatsApp.
                    </p>
                    <Button type="button" className="mt-4" onClick={() => setDialogOpen(true)}>
                      View team popup
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-5">
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="font-display text-2xl text-primary">
                  {data.content.helperTitle}
                </CardTitle>
                <CardDescription>{data.content.helperText}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                <p>1. Click the Team Pairing page.</p>
                <p>2. Enter the phone number you submitted to the Policy Hub.</p>
                <p>3. Open your team popup and contact your teammates directly on WhatsApp.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl text-primary">
              {data.content.modalTitle}
            </DialogTitle>
            <DialogDescription>{data.content.modalLead}</DialogDescription>
          </DialogHeader>

          {currentGroup && currentStudent && (
            <div className="space-y-3">
              <div className="rounded-sm border border-[#123B7A] bg-[#123B7A] px-4 py-3 text-white shadow-sm">
                <p className="font-display text-lg font-semibold text-white">{currentGroup.id}</p>
                <p className="mt-1 text-sm text-white/85">
                  You are paired with {currentGroup.members.length - 1} teammate(s).
                </p>
              </div>

              {currentGroup.members.map((member) => {
                const isCurrentStudent =
                  normalizeNumber(member.number) === normalizeNumber(currentStudent.number);

                if (isCurrentStudent) {
                  return (
                    <div
                      key={member.number}
                      className="rounded-sm border border-accent bg-background px-4 py-4"
                    >
                      <p className="font-medium text-primary">{member.name}</p>
                      <p className="text-sm text-muted-foreground">{member.number}</p>
                      <p className="mt-2 text-xs uppercase tracking-[0.18em] text-accent">
                        You
                      </p>
                    </div>
                  );
                }

                return (
                  <a
                    key={member.number}
                    href={getWhatsappLink(currentStudent.name, member)}
                    target="_blank"
                    rel="noreferrer"
                    className="block rounded-sm border border-border bg-card px-4 py-4 transition-colors hover:border-accent hover:bg-surface"
                  >
                    <p className="font-medium text-primary">{member.name}</p>
                    <p className="text-sm text-muted-foreground">{member.number}</p>
                    <p className="mt-2 text-xs uppercase tracking-[0.18em] text-accent">
                      Tap number card to open WhatsApp
                    </p>
                  </a>
                );
              })}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </SiteLayout>
  );
};

export default TeamPairing;
