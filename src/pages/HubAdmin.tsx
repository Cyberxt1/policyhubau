import { useMemo, useState } from "react";
import {
  ArrowUpRight,
  Download,
  Eye,
  LayoutDashboard,
  LockKeyhole,
  Plus,
  RefreshCcw,
  Save,
  Trash2,
} from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { landingBuilderDefaults } from "@/content/siteContent";

type BuilderData = typeof landingBuilderDefaults;
type Chapter = BuilderData["chapters"][number];
type CustomSection = BuilderData["customSections"][number] & {
  id: string;
  enabled: boolean;
  eyebrow: string;
  title: string;
  body: string;
  ctaLabel: string;
  ctaHref: string;
};

const storageKey = "policy-hub-admin-data";
const adminUsername = "policyhub";

const mergeBuilderData = (value: Partial<BuilderData>): BuilderData => ({
  ...landingBuilderDefaults,
  ...value,
  site: { ...landingBuilderDefaults.site, ...value.site },
  trust: { ...landingBuilderDefaults.trust, ...value.trust },
  about: { ...landingBuilderDefaults.about, ...value.about },
  process: { ...landingBuilderDefaults.process, ...value.process },
  finalCta: { ...landingBuilderDefaults.finalCta, ...value.finalCta },
  gains: value.gains ?? landingBuilderDefaults.gains,
  impact: value.impact ?? landingBuilderDefaults.impact,
  chapters: value.chapters ?? landingBuilderDefaults.chapters,
  sections: value.sections ?? landingBuilderDefaults.sections,
  customSections: value.customSections ?? landingBuilderDefaults.customSections,
});

const readAdminData = (): BuilderData => {
  if (typeof window === "undefined") {
    return landingBuilderDefaults;
  }

  const stored = window.localStorage.getItem(storageKey);

  if (!stored) {
    return landingBuilderDefaults;
  }

  try {
    return mergeBuilderData(JSON.parse(stored) as Partial<BuilderData>);
  } catch {
    return landingBuilderDefaults;
  }
};

const linesToList = (value: string) => value.split("\n").map((item) => item.trim()).filter(Boolean);
const listToLines = (value: string[]) => value.join("\n");

const HubAdmin = () => {
  const [username, setUsername] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [message, setMessage] = useState("Enter the admin username to open the website builder.");
  const [data, setData] = useState<BuilderData>(readAdminData);
  const [selectedChapterIndex, setSelectedChapterIndex] = useState(0);
  const [selectedCustomIndex, setSelectedCustomIndex] = useState(0);

  const enabledCount = useMemo(() => data.sections.filter((section) => section.enabled).length, [data.sections]);
  const selectedChapter = data.chapters[selectedChapterIndex] ?? data.chapters[0];
  const selectedCustom = data.customSections[selectedCustomIndex] as CustomSection | undefined;

  const saveData = () => {
    window.localStorage.setItem(storageKey, JSON.stringify(data, null, 2));
    setMessage("Saved. Refresh the landing page to see the latest builder changes.");
  };

  const resetData = () => {
    setData(landingBuilderDefaults);
    window.localStorage.removeItem(storageKey);
    setSelectedChapterIndex(0);
    setSelectedCustomIndex(0);
    setMessage("Restored default landing page content.");
  };

  const exportJson = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "policy-hub-builder-data.json";
    link.click();
    URL.revokeObjectURL(url);
    setMessage("Exported policy-hub-builder-data.json.");
  };

  const handleUnlock = () => {
    if (username.trim().toLowerCase() === adminUsername) {
      setIsUnlocked(true);
      setMessage("Website builder unlocked.");
      return;
    }

    setMessage("That username is not allowed for this admin page.");
  };

  const updateChapter = (index: number, updater: (chapter: Chapter) => Chapter) => {
    setData((current) => ({
      ...current,
      chapters: current.chapters.map((chapter, chapterIndex) =>
        chapterIndex === index ? updater(chapter) : chapter,
      ),
    }));
  };

  const addChapter = () => {
    const nextChapter: Chapter = {
      school: "New University",
      location: "City, State",
      description: "Describe this campus chapter.",
      href: "",
      status: "Recruiting",
      lead: "Open",
      members: "Recruiting",
    };

    setData((current) => ({ ...current, chapters: [...current.chapters, nextChapter] }));
    setSelectedChapterIndex(data.chapters.length);
  };

  const deleteChapter = (index: number) => {
    if (data.chapters.length === 1) {
      setMessage("Keep at least one campus chapter.");
      return;
    }

    setData((current) => ({
      ...current,
      chapters: current.chapters.filter((_, chapterIndex) => chapterIndex !== index),
    }));
    setSelectedChapterIndex(0);
  };

  const addCustomSection = () => {
    const nextSection: CustomSection = {
      id: `custom-${Date.now()}`,
      enabled: true,
      eyebrow: "New section",
      title: "Add your section title",
      body: "Write the section content here.",
      ctaLabel: "",
      ctaHref: "",
    };

    setData((current) => ({
      ...current,
      customSections: [...current.customSections, nextSection],
    }));
    setSelectedCustomIndex(data.customSections.length);
  };

  const updateCustomSection = (index: number, updater: (section: CustomSection) => CustomSection) => {
    setData((current) => ({
      ...current,
      customSections: current.customSections.map((section, sectionIndex) =>
        sectionIndex === index ? updater(section as CustomSection) : section,
      ),
    }));
  };

  const deleteCustomSection = (index: number) => {
    setData((current) => ({
      ...current,
      customSections: current.customSections.filter((_, sectionIndex) => sectionIndex !== index),
    }));
    setSelectedCustomIndex(0);
  };

  if (!isUnlocked) {
    return (
      <SiteLayout>
        <section className="ambassador-hero hero-dark relative isolate overflow-hidden border-b border-primary/30">
          <div className="hero-grid" aria-hidden="true" />
          <div className="container-narrow flex min-h-[62vh] items-center py-16">
            <Card className="mx-auto w-full max-w-xl rounded-[1.75rem] shadow-elevated">
              <CardHeader>
                <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                  <LockKeyhole size={22} />
                </div>
                <CardTitle className="font-display text-3xl text-primary">Website builder</CardTitle>
                <CardDescription>
                  Edit the landing page, manage sections, and publish content locally.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-primary">Username</label>
                  <div className="flex flex-col gap-3 sm:flex-row">
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
                <p className="rounded-2xl bg-surface px-4 py-3 text-sm text-muted-foreground">{message}</p>
              </CardContent>
            </Card>
          </div>
        </section>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <section className="border-b border-border bg-gradient-band">
        <div className="container-narrow py-14 md:py-16">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow">Admin control</p>
              <h1 className="mt-3 font-display text-4xl font-semibold text-primary md:text-6xl">
                Landing page builder.
              </h1>
              <p className="mt-4 max-w-2xl text-muted-foreground">
                Edit content, hide sections, manage repeatable lists, add custom sections, save, and export.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button type="button" onClick={saveData}>
                <Save size={16} />
                Save
              </Button>
              <Button type="button" variant="outline" onClick={exportJson}>
                <Download size={16} />
                Export
              </Button>
              <Button type="button" variant="outline" onClick={resetData}>
                <RefreshCcw size={16} />
                Reset
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="container-narrow grid gap-6 py-8 md:grid-cols-4">
          <Card className="rounded-[1.25rem]">
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">Visible sections</p>
              <p className="mt-2 font-display text-3xl font-semibold text-primary">{enabledCount}</p>
            </CardContent>
          </Card>
          <Card className="rounded-[1.25rem]">
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">Chapters</p>
              <p className="mt-2 font-display text-3xl font-semibold text-primary">{data.chapters.length}</p>
            </CardContent>
          </Card>
          <Card className="rounded-[1.25rem]">
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">Custom sections</p>
              <p className="mt-2 font-display text-3xl font-semibold text-primary">{data.customSections.length}</p>
            </CardContent>
          </Card>
          <Card className="rounded-[1.25rem]">
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">Storage</p>
              <p className="mt-2 font-display text-3xl font-semibold text-primary">Local</p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="container-narrow grid gap-8 py-14 xl:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-8">
            <Card className="rounded-[1.75rem]">
              <CardHeader>
                <CardTitle className="font-display text-2xl text-primary">Sections</CardTitle>
                <CardDescription>Show or hide the default landing page sections.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {data.sections.map((section) => (
                  <label
                    key={section.id}
                    className="flex cursor-pointer items-center justify-between gap-4 rounded-2xl border border-border bg-surface px-4 py-3"
                  >
                    <span className="font-medium text-primary">{section.label}</span>
                    <input
                      type="checkbox"
                      checked={section.enabled}
                      onChange={(event) =>
                        setData((current) => ({
                          ...current,
                          sections: current.sections.map((item) =>
                            item.id === section.id ? { ...item, enabled: event.target.checked } : item,
                          ),
                        }))
                      }
                    />
                  </label>
                ))}
              </CardContent>
            </Card>

            <Card className="rounded-[1.75rem]">
              <CardHeader>
                <CardTitle className="font-display text-2xl text-primary">Hero</CardTitle>
                <CardDescription>Edit the main first-screen content.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  value={data.site.eyebrow}
                  onChange={(event) =>
                    setData((current) => ({ ...current, site: { ...current.site, eyebrow: event.target.value } }))
                  }
                  placeholder="Eyebrow"
                />
                <Input
                  value={data.site.headline}
                  onChange={(event) =>
                    setData((current) => ({ ...current, site: { ...current.site, headline: event.target.value } }))
                  }
                  placeholder="Headline"
                />
                <Textarea
                  value={data.site.lead}
                  onChange={(event) =>
                    setData((current) => ({ ...current, site: { ...current.site, lead: event.target.value } }))
                  }
                  placeholder="Subheading"
                  className="min-h-[130px]"
                />
                <div className="grid gap-4 md:grid-cols-2">
                  <Input
                    value={data.site.primaryCta}
                    onChange={(event) =>
                      setData((current) => ({ ...current, site: { ...current.site, primaryCta: event.target.value } }))
                    }
                    placeholder="Primary CTA"
                  />
                  <Input
                    value={data.site.secondaryCta}
                    onChange={(event) =>
                      setData((current) => ({ ...current, site: { ...current.site, secondaryCta: event.target.value } }))
                    }
                    placeholder="Secondary CTA"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-[1.75rem]">
              <CardHeader>
                <CardTitle className="font-display text-2xl text-primary">Trust bar and process</CardTitle>
                <CardDescription>Edit line-based lists. One item per line.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  value={data.trust.eyebrow}
                  onChange={(event) =>
                    setData((current) => ({ ...current, trust: { ...current.trust, eyebrow: event.target.value } }))
                  }
                  placeholder="Trust bar eyebrow"
                />
                <Textarea
                  value={listToLines(data.trust.items)}
                  onChange={(event) =>
                    setData((current) => ({ ...current, trust: { ...current.trust, items: linesToList(event.target.value) } }))
                  }
                  className="min-h-[140px]"
                />
                <Input
                  value={data.process.title}
                  onChange={(event) =>
                    setData((current) => ({ ...current, process: { ...current.process, title: event.target.value } }))
                  }
                  placeholder="Process title"
                />
                <Textarea
                  value={listToLines(data.process.steps)}
                  onChange={(event) =>
                    setData((current) => ({ ...current, process: { ...current.process, steps: linesToList(event.target.value) } }))
                  }
                  className="min-h-[120px]"
                />
              </CardContent>
            </Card>
          </div>

          <div className="space-y-8">
            <Card className="rounded-[1.75rem]">
              <CardHeader>
                <CardTitle className="font-display text-2xl text-primary">About and final CTA</CardTitle>
                <CardDescription>Edit the main narrative blocks.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  value={data.about.title}
                  onChange={(event) =>
                    setData((current) => ({ ...current, about: { ...current.about, title: event.target.value } }))
                  }
                  placeholder="About title"
                />
                <Textarea
                  value={data.about.body}
                  onChange={(event) =>
                    setData((current) => ({ ...current, about: { ...current.about, body: event.target.value } }))
                  }
                  placeholder="About body"
                />
                <Textarea
                  value={data.about.highlight}
                  onChange={(event) =>
                    setData((current) => ({ ...current, about: { ...current.about, highlight: event.target.value } }))
                  }
                  placeholder="About highlight"
                />
                <Input
                  value={data.finalCta.title}
                  onChange={(event) =>
                    setData((current) => ({ ...current, finalCta: { ...current.finalCta, title: event.target.value } }))
                  }
                  placeholder="Final CTA title"
                />
                <Textarea
                  value={data.finalCta.body}
                  onChange={(event) =>
                    setData((current) => ({ ...current, finalCta: { ...current.finalCta, body: event.target.value } }))
                  }
                  placeholder="Final CTA body"
                />
              </CardContent>
            </Card>

            <Card className="rounded-[1.75rem]">
              <CardHeader>
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <CardTitle className="font-display text-2xl text-primary">Campus chapters</CardTitle>
                    <CardDescription>Add and edit university chapter cards.</CardDescription>
                  </div>
                  <Button type="button" onClick={addChapter}>
                    <Plus size={16} />
                    Add
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
                <div className="space-y-3">
                  {data.chapters.map((chapter, index) => (
                    <button
                      key={`${chapter.school}-${index}`}
                      type="button"
                      onClick={() => setSelectedChapterIndex(index)}
                      className={`w-full rounded-2xl border px-4 py-4 text-left transition-colors ${
                        selectedChapterIndex === index ? "border-accent bg-surface" : "border-border bg-card"
                      }`}
                    >
                      <p className="truncate font-medium text-primary">{chapter.school}</p>
                      <p className="truncate text-xs text-muted-foreground">{chapter.status}</p>
                    </button>
                  ))}
                </div>

                {selectedChapter && (
                  <div className="space-y-4">
                    {(["school", "location", "status", "lead", "members", "href"] as const).map((field) => (
                      <Input
                        key={field}
                        value={selectedChapter[field]}
                        onChange={(event) =>
                          updateChapter(selectedChapterIndex, (chapter) => ({ ...chapter, [field]: event.target.value }))
                        }
                        placeholder={field}
                      />
                    ))}
                    <Textarea
                      value={selectedChapter.description}
                      onChange={(event) =>
                        updateChapter(selectedChapterIndex, (chapter) => ({ ...chapter, description: event.target.value }))
                      }
                      placeholder="Description"
                    />
                    <Button type="button" variant="outline" onClick={() => deleteChapter(selectedChapterIndex)}>
                      <Trash2 size={16} />
                      Delete chapter
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="rounded-[1.75rem]">
              <CardHeader>
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <CardTitle className="font-display text-2xl text-primary">Custom sections</CardTitle>
                    <CardDescription>Add simple content sections to the landing page.</CardDescription>
                  </div>
                  <Button type="button" onClick={addCustomSection}>
                    <Plus size={16} />
                    Add section
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-5">
                {data.customSections.length > 0 ? (
                  <>
                    <div className="flex flex-wrap gap-2">
                      {data.customSections.map((section, index) => (
                        <button
                          key={(section as CustomSection).id}
                          type="button"
                          onClick={() => setSelectedCustomIndex(index)}
                          className={`rounded-full border px-4 py-2 text-sm ${
                            selectedCustomIndex === index ? "border-accent bg-surface text-primary" : "border-border text-muted-foreground"
                          }`}
                        >
                          {(section as CustomSection).title || `Section ${index + 1}`}
                        </button>
                      ))}
                    </div>
                    {selectedCustom && (
                      <div className="space-y-4">
                        <label className="flex items-center gap-3 text-sm text-primary">
                          <input
                            type="checkbox"
                            checked={selectedCustom.enabled}
                            onChange={(event) =>
                              updateCustomSection(selectedCustomIndex, (section) => ({
                                ...section,
                                enabled: event.target.checked,
                              }))
                            }
                          />
                          Visible
                        </label>
                        {(["eyebrow", "title", "ctaLabel", "ctaHref"] as const).map((field) => (
                          <Input
                            key={field}
                            value={selectedCustom[field]}
                            onChange={(event) =>
                              updateCustomSection(selectedCustomIndex, (section) => ({
                                ...section,
                                [field]: event.target.value,
                              }))
                            }
                            placeholder={field}
                          />
                        ))}
                        <Textarea
                          value={selectedCustom.body}
                          onChange={(event) =>
                            updateCustomSection(selectedCustomIndex, (section) => ({
                              ...section,
                              body: event.target.value,
                            }))
                          }
                          placeholder="Body"
                          className="min-h-[140px]"
                        />
                        <Button type="button" variant="outline" onClick={() => deleteCustomSection(selectedCustomIndex)}>
                          <Trash2 size={16} />
                          Delete section
                        </Button>
                      </div>
                    )}
                  </>
                ) : (
                  <p className="rounded-2xl bg-surface px-4 py-4 text-sm text-muted-foreground">
                    No custom sections yet. Add one to extend the landing page.
                  </p>
                )}
              </CardContent>
            </Card>

            <Card className="rounded-[1.75rem] bg-primary text-primary-foreground">
              <CardHeader>
                <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-foreground text-primary">
                  <LayoutDashboard size={22} />
                </div>
                <CardTitle className="font-display text-2xl">Publishing</CardTitle>
                <CardDescription className="text-primary-foreground/70">
                  Saves are stored in this browser for now. Export JSON when you want to wire a database.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="rounded-2xl bg-primary-foreground/10 px-4 py-3 text-sm text-primary-foreground/75">
                  {message}
                </p>
                <a href="/" className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-primary-foreground">
                  View landing page <ArrowUpRight size={16} />
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
};

export default HubAdmin;
