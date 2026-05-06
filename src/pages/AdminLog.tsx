import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { LockKeyhole, Plus, Save, Shuffle, Trash2, Upload, Users } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  createEmptyTeamSet,
  createGroups,
  getSelectedTeamSet,
  Group,
  GroupMode,
  loadTeamPairingData,
  membersToTextarea,
  parseStudents,
  readLocalTeamPairingData,
  saveTeamPairingData,
  TEAM_PAIRING_ADMIN_USERNAME,
  TeamPairingData,
  TeamSet,
} from "@/lib/teamPairing";

const AdminLog = () => {
  const [username, setUsername] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [message, setMessage] = useState("");
  const [data, setData] = useState<TeamPairingData>(readLocalTeamPairingData());
  const [selectedSetId, setSelectedSetId] = useState<string | null>(readLocalTeamPairingData().activeSetId);
  const [isSyncing, setIsSyncing] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [newSetName, setNewSetName] = useState("");
  const [customTeamName, setCustomTeamName] = useState("");
  const [customTeamMembers, setCustomTeamMembers] = useState("");

  useEffect(() => {
    let cancelled = false;

    const syncData = async () => {
      const nextData = await loadTeamPairingData();

      if (cancelled) {
        return;
      }

      setData(nextData);
      setSelectedSetId((current) => {
        if (current && nextData.teamSets.some((teamSet) => teamSet.id === current)) {
          return current;
        }

        return nextData.activeSetId ?? nextData.teamSets[0]?.id ?? null;
      });
      setIsSyncing(false);
    };

    syncData();

    return () => {
      cancelled = true;
    };
  }, []);

  const selectedSet = useMemo(
    () => getSelectedTeamSet(data, selectedSetId),
    [data, selectedSetId],
  );

  const totalStudents = useMemo(
    () => selectedSet?.groups.flatMap((group) => group.members).length ?? 0,
    [selectedSet],
  );

  const persistData = async (nextData: TeamPairingData, successMessage: string) => {
    setData(nextData);
    setIsSaving(true);

    try {
      await saveTeamPairingData(nextData);
      setMessage(successMessage);
    } catch (error) {
      const fallbackMessage =
        error instanceof Error ? error.message : "Changes were saved locally, but Firebase did not update.";
      setMessage(fallbackMessage);
    } finally {
      setIsSaving(false);
    }
  };

  const updateSelectedSet = (updater: (current: TeamSet) => TeamSet) => {
    if (!selectedSet) {
      return;
    }

    setData((currentData) => ({
      ...currentData,
      teamSets: currentData.teamSets.map((teamSet) =>
        teamSet.id === selectedSet.id
          ? {
              ...updater(teamSet),
              updatedAt: new Date().toISOString(),
            }
          : teamSet,
      ),
    }));
  };

  const handleUnlock = () => {
    if (username.trim() === TEAM_PAIRING_ADMIN_USERNAME) {
      setIsUnlocked(true);
      setMessage("Admin dashboard unlocked.");
      return;
    }

    setMessage("That username is not allowed for this admin page.");
  };

  const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file || !selectedSet) {
      return;
    }

    const text = await file.text();
    updateSelectedSet((current) => ({ ...current, rawList: text }));
    setMessage(`Loaded ${file.name} into ${selectedSet.name}. Review the list and generate teams.`);
  };

  const handleGenerateTeams = () => {
    if (!selectedSet) {
      return;
    }

    const students = parseStudents(selectedSet.rawList);

    if (students.length < 2) {
      setMessage("Add at least two students before generating teams.");
      return;
    }

    updateSelectedSet((current) => ({
      ...current,
      groups: createGroups(students, current.groupMode),
    }));
    setMessage(`Generated ${selectedSet.groupMode === "mixed" ? "mixed" : `groups of ${selectedSet.groupMode}`} for ${students.length} student(s). Save when you're ready.`);
  };

  const handleSaveSelectedSet = async () => {
    if (!selectedSet) {
      return;
    }

    await persistData(data, `${selectedSet.name} saved to Firebase.`);
  };

  const handleSaveContent = async () => {
    await persistData(data, "Team pairing page content saved.");
  };

  const handlePublishSelectedSet = async () => {
    if (!selectedSet) {
      return;
    }

    const nextData = {
      ...data,
      activeSetId: selectedSet.id,
    };

    await persistData(nextData, `${selectedSet.name} is now the published team set.`);
  };

  const handleCreateNewSet = async () => {
    const nextSet = createEmptyTeamSet(newSetName);
    const nextData = {
      ...data,
      teamSets: [...data.teamSets, nextSet],
    };

    setSelectedSetId(nextSet.id);
    setNewSetName("");
    await persistData(nextData, `${nextSet.name} created without changing the published teams.`);
  };

  const handleDeleteSelectedSet = async () => {
    if (!selectedSet || data.teamSets.length === 1) {
      setMessage("Keep at least one team set in the dashboard.");
      return;
    }

    const remainingSets = data.teamSets.filter((teamSet) => teamSet.id !== selectedSet.id);
    const fallbackSetId = remainingSets[0]?.id ?? null;
    const nextData = {
      ...data,
      activeSetId: data.activeSetId === selectedSet.id ? fallbackSetId : data.activeSetId,
      teamSets: remainingSets,
    };

    setSelectedSetId(fallbackSetId);
    await persistData(nextData, `${selectedSet.name} deleted.`);
  };

  const handleClearTeams = () => {
    if (!selectedSet) {
      return;
    }

    updateSelectedSet((current) => ({
      ...current,
      rawList: "",
      groups: [],
    }));
    setMessage(`${selectedSet.name} cleared. Save to publish this change.`);
  };

  const handleAddCustomTeam = () => {
    if (!selectedSet) {
      return;
    }

    const members = parseStudents(customTeamMembers);

    if (!customTeamName.trim() || members.length === 0) {
      setMessage("Add a custom team name and at least one member before creating the team.");
      return;
    }

    updateSelectedSet((current) => ({
      ...current,
      groups: [
        ...current.groups,
        {
          id: customTeamName.trim(),
          members,
        },
      ],
    }));

    setCustomTeamName("");
    setCustomTeamMembers("");
    setMessage("Custom team added. Save to store it for everyone.");
  };

  const updateGroup = (groupId: string, updater: (group: Group) => Group) => {
    updateSelectedSet((current) => ({
      ...current,
      groups: current.groups.map((group) => (group.id === groupId ? updater(group) : group)),
    }));
  };

  const removeGroup = (groupId: string) => {
    updateSelectedSet((current) => ({
      ...current,
      groups: current.groups.filter((group) => group.id !== groupId),
    }));
    setMessage("Team removed. Save to sync this update.");
  };

  if (!isUnlocked) {
    return (
      <SiteLayout>
        <PageHeader
          eyebrow="Admin Control"
          title="Admin Pairing Dashboard"
          lead="This control page is available through a direct URL. Enter the allowed username to manage the pairing system."
        />

        <section>
          <div className="container-narrow py-20 max-w-2xl">
            <Card>
              <CardHeader>
                <CardTitle className="font-display text-2xl text-primary">Unlock admin page</CardTitle>
                <CardDescription>
                  Use the default admin username to open this control page.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-primary">Username</label>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Input
                      value={username}
                      onChange={(event) => setUsername(event.target.value)}
                      placeholder="Enter admin username"
                    />
                    <Button type="button" onClick={handleUnlock}>
                      <LockKeyhole size={16} />
                      Unlock
                    </Button>
                  </div>
                </div>
                <div className="rounded-sm bg-surface px-4 py-3 text-sm text-muted-foreground">
                  {message || "Admin username required."}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Admin Control"
        title="Team Pairing Admin Dashboard"
        lead="Upload student lists, generate separate team sets, add custom teams, and publish whichever set should appear on the public Team Pairing page."
      />

      <section className="border-b border-border">
        <div className="container-narrow py-20 grid xl:grid-cols-12 gap-8">
          <div className="xl:col-span-7 space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="font-display text-2xl text-primary">Team set manager</CardTitle>
                <CardDescription>
                  Create new team sets without replacing the currently published one.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="rounded-sm bg-surface px-4 py-3 text-sm text-muted-foreground">
                  {isSyncing
                    ? "Loading team sets from Firebase..."
                    : message || "No update yet."}
                </div>

                <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_auto]">
                  <Input
                    value={newSetName}
                    onChange={(event) => setNewSetName(event.target.value)}
                    placeholder="New team set name"
                  />
                  <Button type="button" onClick={handleCreateNewSet} disabled={isSaving}>
                    <Plus size={16} />
                    Create new set
                  </Button>
                </div>

                <div className="grid gap-3">
                  {data.teamSets.map((teamSet) => (
                    <button
                      key={teamSet.id}
                      type="button"
                      onClick={() => setSelectedSetId(teamSet.id)}
                      className={`rounded-sm border px-4 py-4 text-left transition-colors ${
                        selectedSetId === teamSet.id
                          ? "border-accent bg-surface"
                          : "border-border bg-card hover:border-accent"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <p className="font-medium text-primary">{teamSet.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {teamSet.groups.length} team(s)
                          </p>
                        </div>
                        {data.activeSetId === teamSet.id && (
                          <span className="text-xs uppercase tracking-[0.18em] text-accent">
                            Published
                          </span>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {selectedSet && (
              <Card>
                <CardHeader>
                  <CardTitle className="font-display text-2xl text-primary">Student list and grouping</CardTitle>
                  <CardDescription>
                    Upload or paste members for <strong>{selectedSet.name}</strong>, then generate teams or add custom ones.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <Input
                    value={selectedSet.name}
                    onChange={(event) =>
                      updateSelectedSet((current) => ({
                        ...current,
                        name: event.target.value,
                      }))
                    }
                    placeholder="Team set name"
                  />

                  <div className="flex flex-wrap gap-3">
                    {[
                      { value: "2", label: "Groups of 2" },
                      { value: "3", label: "Groups of 3" },
                      { value: "4", label: "Groups of 4" },
                      { value: "mixed", label: "Mixed 2-4" },
                    ].map((option) => (
                      <Button
                        key={option.value}
                        type="button"
                        variant={selectedSet.groupMode === option.value ? "default" : "outline"}
                        onClick={() =>
                          updateSelectedSet((current) => ({
                            ...current,
                            groupMode: option.value as GroupMode,
                          }))
                        }
                      >
                        {option.label}
                      </Button>
                    ))}
                  </div>

                  <div className="space-y-3">
                    <label className="block text-sm font-medium text-primary">Student list</label>
                    <Textarea
                      value={selectedSet.rawList}
                      onChange={(event) =>
                        updateSelectedSet((current) => ({
                          ...current,
                          rawList: event.target.value,
                        }))
                      }
                      placeholder={"Aisha Bello, 08030000001\nDavid James, 08030000002\nTolu Adebayo, 08030000003"}
                      className="min-h-[260px]"
                    />
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <label className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-primary hover:bg-accent hover:text-accent-foreground">
                      <Upload size={16} />
                      Upload file
                      <input type="file" accept=".csv,.txt" className="hidden" onChange={handleFileUpload} />
                    </label>

                    <Button type="button" onClick={handleGenerateTeams}>
                      <Shuffle size={16} />
                      Generate teams
                    </Button>

                    <Button type="button" variant="outline" onClick={handleClearTeams}>
                      <Trash2 size={16} />
                      Clear set
                    </Button>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <Button type="button" onClick={handleSaveSelectedSet} disabled={isSaving}>
                      <Save size={16} />
                      Save set
                    </Button>
                    <Button type="button" variant="outline" onClick={handlePublishSelectedSet} disabled={isSaving}>
                      <Users size={16} />
                      Publish this set
                    </Button>
                    <Button type="button" variant="outline" onClick={handleDeleteSelectedSet} disabled={isSaving}>
                      <Trash2 size={16} />
                      Delete set
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          <div className="xl:col-span-5 space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="font-display text-2xl text-primary">Saved summary</CardTitle>
                <CardDescription>
                  The public page always reads the currently published team set from Firebase.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-muted-foreground">
                <div className="rounded-sm border border-border bg-surface px-4 py-4">
                  <p className="font-medium text-primary">{selectedSet?.groups.length ?? 0} team(s)</p>
                  <p className="mt-1">{totalStudents} student(s) currently assigned in this set.</p>
                </div>
                <div className="rounded-sm border border-border bg-surface px-4 py-4">
                  <p className="font-medium text-primary">Published team set</p>
                  <p className="mt-1">
                    {getSelectedTeamSet(data)?.name ?? "No set selected"}
                  </p>
                </div>
                <div className="rounded-sm border border-border bg-surface px-4 py-4">
                  <p className="font-medium text-primary">Public URL</p>
                  <p className="mt-1">/team-pairing</p>
                </div>
                <div className="rounded-sm border border-border bg-surface px-4 py-4">
                  <p className="font-medium text-primary">Admin URL</p>
                  <p className="mt-1">/adminlog</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-display text-2xl text-primary">Add custom team</CardTitle>
                <CardDescription>
                  Create a team manually with your own team name and member list.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  value={customTeamName}
                  onChange={(event) => setCustomTeamName(event.target.value)}
                  placeholder="Custom team name"
                />
                <Textarea
                  value={customTeamMembers}
                  onChange={(event) => setCustomTeamMembers(event.target.value)}
                  placeholder={"Member name, phone number\nAnother member, 08030000004"}
                  className="min-h-[180px]"
                />
                <Button type="button" onClick={handleAddCustomTeam}>
                  <Plus size={16} />
                  Add custom team
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-gradient-band">
        <div className="container-narrow py-20">
          <div className="max-w-3xl">
            <p className="eyebrow">Page content</p>
            <h2 className="mt-3 font-display text-3xl md:text-4xl text-primary">
              Edit the public Team Pairing page from here.
            </h2>
          </div>

          <div className="mt-10 grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-display text-xl text-primary">Header and lookup</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  value={data.content.eyebrow}
                  onChange={(event) =>
                    setData((current) => ({
                      ...current,
                      content: { ...current.content, eyebrow: event.target.value },
                    }))
                  }
                  placeholder="Eyebrow"
                />
                <Input
                  value={data.content.title}
                  onChange={(event) =>
                    setData((current) => ({
                      ...current,
                      content: { ...current.content, title: event.target.value },
                    }))
                  }
                  placeholder="Page title"
                />
                <Textarea
                  value={data.content.lead}
                  onChange={(event) =>
                    setData((current) => ({
                      ...current,
                      content: { ...current.content, lead: event.target.value },
                    }))
                  }
                  placeholder="Page lead"
                />
                <Input
                  value={data.content.lookupTitle}
                  onChange={(event) =>
                    setData((current) => ({
                      ...current,
                      content: { ...current.content, lookupTitle: event.target.value },
                    }))
                  }
                  placeholder="Lookup title"
                />
                <Textarea
                  value={data.content.lookupLead}
                  onChange={(event) =>
                    setData((current) => ({
                      ...current,
                      content: { ...current.content, lookupLead: event.target.value },
                    }))
                  }
                  placeholder="Lookup lead"
                />
                <Input
                  value={data.content.searchPlaceholder}
                  onChange={(event) =>
                    setData((current) => ({
                      ...current,
                      content: { ...current.content, searchPlaceholder: event.target.value },
                    }))
                  }
                  placeholder="Search placeholder"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-display text-xl text-primary">Messages and helper text</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  value={data.content.emptyState}
                  onChange={(event) =>
                    setData((current) => ({
                      ...current,
                      content: { ...current.content, emptyState: event.target.value },
                    }))
                  }
                  placeholder="Empty state"
                />
                <Textarea
                  value={data.content.notFoundMessage}
                  onChange={(event) =>
                    setData((current) => ({
                      ...current,
                      content: { ...current.content, notFoundMessage: event.target.value },
                    }))
                  }
                  placeholder="Not found message"
                />
                <Input
                  value={data.content.modalTitle}
                  onChange={(event) =>
                    setData((current) => ({
                      ...current,
                      content: { ...current.content, modalTitle: event.target.value },
                    }))
                  }
                  placeholder="Modal title"
                />
                <Textarea
                  value={data.content.modalLead}
                  onChange={(event) =>
                    setData((current) => ({
                      ...current,
                      content: { ...current.content, modalLead: event.target.value },
                    }))
                  }
                  placeholder="Modal lead"
                />
                <Input
                  value={data.content.helperTitle}
                  onChange={(event) =>
                    setData((current) => ({
                      ...current,
                      content: { ...current.content, helperTitle: event.target.value },
                    }))
                  }
                  placeholder="Helper title"
                />
                <Textarea
                  value={data.content.helperText}
                  onChange={(event) =>
                    setData((current) => ({
                      ...current,
                      content: { ...current.content, helperText: event.target.value },
                    }))
                  }
                  placeholder="Helper text"
                />
              </CardContent>
            </Card>
          </div>

          <div className="mt-6">
            <Button type="button" onClick={handleSaveContent} disabled={isSaving}>
              <Save size={16} />
              Save public page content
            </Button>
          </div>
        </div>
      </section>

      <section>
        <div className="container-narrow py-20">
          <div className="flex items-end justify-between gap-6 flex-wrap">
            <div>
              <p className="eyebrow">Generated teams</p>
              <h2 className="mt-3 font-display text-3xl md:text-4xl text-primary">
                Team arrangement preview
              </h2>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                Review and edit team names, member names, or member numbers before saving the selected set.
              </p>
            </div>
          </div>

          {selectedSet?.groups.length ? (
            <div className="mt-10 grid md:grid-cols-2 gap-6">
              {selectedSet.groups.map((group) => (
                <Card key={group.id}>
                  <CardHeader>
                    <CardTitle className="font-display text-xl text-primary">
                      <Input
                        value={group.id}
                        onChange={(event) =>
                          updateGroup(group.id, (current) => ({
                            ...current,
                            id: event.target.value,
                          }))
                        }
                      />
                    </CardTitle>
                    <CardDescription>{group.members.length} member(s)</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Textarea
                      value={membersToTextarea(group.members)}
                      onChange={(event) =>
                        updateGroup(group.id, (current) => ({
                          ...current,
                          members: parseStudents(event.target.value),
                        }))
                      }
                      className="min-h-[180px]"
                    />
                    <Button type="button" variant="outline" onClick={() => removeGroup(group.id)}>
                      <Trash2 size={16} />
                      Remove team
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="mt-10 rounded-sm border border-dashed border-border px-6 py-10 text-sm text-muted-foreground">
              No teams have been generated yet for this team set.
            </div>
          )}
        </div>
      </section>
    </SiteLayout>
  );
};

export default AdminLog;
