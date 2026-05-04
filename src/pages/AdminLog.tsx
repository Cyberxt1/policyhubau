import { ChangeEvent, useMemo, useState } from "react";
import { LockKeyhole, Save, Shuffle, Trash2, Upload, Users } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  createGroups,
  defaultTeamPairingData,
  GroupMode,
  parseStudents,
  readTeamPairingData,
  saveTeamPairingData,
  TEAM_PAIRING_ADMIN_USERNAME,
} from "@/lib/teamPairing";

const AdminLog = () => {
  const [username, setUsername] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [message, setMessage] = useState("");
  const [data, setData] = useState(readTeamPairingData());

  const totalStudents = useMemo(
    () => data.groups.flatMap((group) => group.members).length,
    [data.groups],
  );

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

    if (!file) {
      return;
    }

    const text = await file.text();
    setData((current) => ({ ...current, rawList: text }));
    setMessage(`Loaded ${file.name}. Review the list and generate teams.`);
  };

  const handleGenerateTeams = () => {
    const students = parseStudents(data.rawList);

    if (students.length < 2) {
      setMessage("Add at least two students before generating teams.");
      return;
    }

    const groups = createGroups(students, data.groupMode);
    const nextData = {
      ...data,
      groups,
    };

    setData(nextData);
    saveTeamPairingData(nextData);
    setMessage(`Created ${groups.length} team(s) for ${students.length} student(s).`);
  };

  const handleSaveContent = () => {
    saveTeamPairingData(data);
    setMessage("Team pairing page content saved.");
  };

  const handleClearTeams = () => {
    const nextData = {
      ...data,
      rawList: "",
      groups: [],
    };

    setData(nextData);
    saveTeamPairingData(nextData);
    setMessage("Saved team pairing data cleared.");
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
        lead="Upload the student list from here, generate teams, and edit the public Team Pairing page content from the frontend."
      />

      <section className="border-b border-border">
        <div className="container-narrow py-20 grid xl:grid-cols-12 gap-8">
          <div className="xl:col-span-7">
            <Card>
              <CardHeader>
                <CardTitle className="font-display text-2xl text-primary">Student list and grouping</CardTitle>
                <CardDescription>
                  Paste each line as <strong>Name, Number</strong> or upload a file from your device.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
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
                      variant={data.groupMode === option.value ? "default" : "outline"}
                      onClick={() =>
                        setData((current) => ({
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
                    value={data.rawList}
                    onChange={(event) =>
                      setData((current) => ({ ...current, rawList: event.target.value }))
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
                    Clear all
                  </Button>
                </div>

                <div className="rounded-sm bg-surface px-4 py-3 text-sm text-muted-foreground">
                  {message || "No update yet."}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="xl:col-span-5">
            <Card>
              <CardHeader>
                <CardTitle className="font-display text-2xl text-primary">Saved summary</CardTitle>
                <CardDescription>
                  This shows the current pairing state stored for the public page.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-muted-foreground">
                <div className="rounded-sm border border-border bg-surface px-4 py-4">
                  <p className="font-medium text-primary">{data.groups.length} team(s)</p>
                  <p className="mt-1">{totalStudents} student(s) currently assigned.</p>
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
            <Button type="button" onClick={handleSaveContent}>
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
                Review the current teams before members check them on the public page.
              </p>
            </div>
          </div>

          {data.groups.length > 0 ? (
            <div className="mt-10 grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {data.groups.map((group) => (
                <Card key={group.id}>
                  <CardHeader>
                    <CardTitle className="font-display text-xl text-primary">
                      {group.id}
                    </CardTitle>
                    <CardDescription>{group.members.length} member(s)</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {group.members.map((member) => (
                      <div key={member.number} className="rounded-sm border border-border bg-surface px-4 py-3">
                        <p className="font-medium text-primary">{member.name}</p>
                        <p className="text-sm text-muted-foreground">{member.number}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="mt-10 rounded-sm border border-dashed border-border px-6 py-10 text-sm text-muted-foreground">
              No teams have been generated yet.
            </div>
          )}
        </div>
      </section>
    </SiteLayout>
  );
};

export default AdminLog;
