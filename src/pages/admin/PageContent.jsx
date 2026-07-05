import React, { useEffect, useState } from "react";
import { usePageContent } from "../../context/PageContentContext";
import { DEFAULT_PAGE_CONTENT } from "../../constants/defaultPageContent";
import { getMergedPageContent } from "../../utils/pageContentMerge";

const TABS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "career", label: "Career" },
  { id: "people", label: "People" },
];

const inputClass =
  "w-full bg-[#2A2A2A] border border-white/20 rounded-md px-3 py-2 text-white text-sm focus:outline-none focus:border-white/50";
const textareaClass = `${inputClass} min-h-[100px] resize-y`;

const Field = ({ label, children }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-sm font-semibold text-gray-300">{label}</label>
    {children}
  </div>
);

const ListEditor = ({ items, onChange, fields, emptyItem, addLabel }) => (
  <div className="flex flex-col gap-4">
    {items.map((item, index) => (
      <div
        key={index}
        className="border border-white/10 rounded-lg p-4 flex flex-col gap-3 bg-[#1A1A1A]"
      >
        {fields.map((field) => (
          <Field key={field.key} label={field.label}>
            {field.multiline ? (
              <textarea
                className={textareaClass}
                value={item[field.key] || ""}
                onChange={(e) => {
                  const updated = [...items];
                  updated[index] = { ...updated[index], [field.key]: e.target.value };
                  onChange(updated);
                }}
              />
            ) : (
              <input
                className={inputClass}
                value={item[field.key] || ""}
                onChange={(e) => {
                  const updated = [...items];
                  updated[index] = { ...updated[index], [field.key]: e.target.value };
                  onChange(updated);
                }}
              />
            )}
          </Field>
        ))}
        <button
          type="button"
          onClick={() => onChange(items.filter((_, i) => i !== index))}
          className="self-start text-red-400 text-sm hover:text-red-300"
        >
          Remove
        </button>
      </div>
    ))}
    <button
      type="button"
      onClick={() => onChange([...items, { ...emptyItem }])}
      className="self-start px-4 py-2 bg-[#AA1E6B] rounded-md text-sm font-semibold"
    >
      {addLabel}
    </button>
  </div>
);

const PageContentAdmin = () => {
  const { content, loading, source, saveContent } = usePageContent();
  const [activeTab, setActiveTab] = useState("home");
  const [draft, setDraft] = useState(DEFAULT_PAGE_CONTENT);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setDraft(content);
  }, [content]);

  const updateSection = (pageKey, sectionKey, value) => {
    setDraft((prev) => ({
      ...prev,
      [pageKey]: {
        ...prev[pageKey],
        [sectionKey]: value,
      },
    }));
  };

  const updateNested = (pageKey, sectionKey, fieldKey, value) => {
    setDraft((prev) => ({
      ...prev,
      [pageKey]: {
        ...prev[pageKey],
        [sectionKey]: {
          ...prev[pageKey][sectionKey],
          [fieldKey]: value,
        },
      },
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage("");
    try {
      const stored = getMergedPageContent(draft);
      const payload = JSON.parse(
        JSON.stringify({
          home: draft.home,
          about: draft.about,
          services: draft.services,
          career: draft.career,
          people: draft.people,
        })
      );
      await saveContent(payload);
      setDraft(stored);
      setMessage(
        source === "api" || source === "local"
          ? "Content saved successfully."
          : "Content saved locally. Connect the backend API to persist for all users."
      );
    } catch {
      setMessage("Failed to save content.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="text-white p-6">Loading page content...</div>;
  }

  return (
    <div className="w-full text-white flex flex-col gap-4">
      <div className="bg-[#8E8E8E] rounded-t-xl px-6 py-4 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-[#333]">Page Content</h2>
        <span className="text-xs text-[#333] uppercase">
          Source: {source}
        </span>
      </div>

      <div className="bg-[#141414] rounded-b-xl p-6 flex flex-col gap-6">
        <div className="flex flex-wrap gap-2">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-md text-sm font-semibold ${
                activeTab === tab.id
                  ? "bg-[#AA1E6B] text-white"
                  : "bg-[#2A2A2A] text-gray-300"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "home" && (
          <div className="flex flex-col gap-6">
            <h3 className="text-lg font-bold">Hero</h3>
            <Field label="Title line 1">
              <input
                className={inputClass}
                value={draft.home.hero.titleLine1}
                onChange={(e) =>
                  updateNested("home", "hero", "titleLine1", e.target.value)
                }
              />
            </Field>
            <Field label="Title line 2">
              <input
                className={inputClass}
                value={draft.home.hero.titleLine2}
                onChange={(e) =>
                  updateNested("home", "hero", "titleLine2", e.target.value)
                }
              />
            </Field>
            <Field label="Subtitle">
              <textarea
                className={textareaClass}
                value={draft.home.hero.subtitle}
                onChange={(e) =>
                  updateNested("home", "hero", "subtitle", e.target.value)
                }
              />
            </Field>

            <h3 className="text-lg font-bold">Who Are We</h3>
            <Field label="Heading">
              <input
                className={inputClass}
                value={draft.home.whoWeAre.heading}
                onChange={(e) =>
                  updateNested("home", "whoWeAre", "heading", e.target.value)
                }
              />
            </Field>
            <Field label="Description">
              <textarea
                className={textareaClass}
                value={draft.home.whoWeAre.description}
                onChange={(e) =>
                  updateNested("home", "whoWeAre", "description", e.target.value)
                }
              />
            </Field>

            <h3 className="text-lg font-bold">Ignite Idea CTA</h3>
            <Field label="Heading">
              <input
                className={inputClass}
                value={draft.home.igniteIdea.heading}
                onChange={(e) =>
                  updateNested("home", "igniteIdea", "heading", e.target.value)
                }
              />
            </Field>
            <Field label="Subheading">
              <input
                className={inputClass}
                value={draft.home.igniteIdea.subheading}
                onChange={(e) =>
                  updateNested("home", "igniteIdea", "subheading", e.target.value)
                }
              />
            </Field>
            <Field label="Button text">
              <input
                className={inputClass}
                value={draft.home.igniteIdea.ctaText}
                onChange={(e) =>
                  updateNested("home", "igniteIdea", "ctaText", e.target.value)
                }
              />
            </Field>

            <h3 className="text-lg font-bold">Services Snapshot</h3>
            <Field label="Section heading">
              <input
                className={inputClass}
                value={draft.home.servicesHeading}
                onChange={(e) =>
                  updateSection("home", "servicesHeading", e.target.value)
                }
              />
            </Field>
            <ListEditor
              items={draft.home.services}
              onChange={(items) => updateSection("home", "services", items)}
              fields={[{ key: "title", label: "Service title" }]}
              emptyItem={{ title: "" }}
              addLabel="+ Add service"
            />
          </div>
        )}

        {activeTab === "about" && (
          <div className="flex flex-col gap-6">
            <h3 className="text-lg font-bold">Overview</h3>
            <Field label="Heading">
              <input
                className={inputClass}
                value={draft.about.overview.heading}
                onChange={(e) =>
                  updateNested("about", "overview", "heading", e.target.value)
                }
              />
            </Field>
            <Field label="Body">
              <textarea
                className={textareaClass}
                value={draft.about.overview.body}
                onChange={(e) =>
                  updateNested("about", "overview", "body", e.target.value)
                }
              />
            </Field>

            <h3 className="text-lg font-bold">How We Work</h3>
            <Field label="Heading">
              <input
                className={inputClass}
                value={draft.about.howWeWork.heading}
                onChange={(e) =>
                  updateNested("about", "howWeWork", "heading", e.target.value)
                }
              />
            </Field>
            <Field label="Tagline">
              <input
                className={inputClass}
                value={draft.about.howWeWork.tagline}
                onChange={(e) =>
                  updateNested("about", "howWeWork", "tagline", e.target.value)
                }
              />
            </Field>
            <Field label="Body">
              <textarea
                className={textareaClass}
                value={draft.about.howWeWork.body}
                onChange={(e) =>
                  updateNested("about", "howWeWork", "body", e.target.value)
                }
              />
            </Field>

            <h3 className="text-lg font-bold">Root / Medi-Caps</h3>
            <Field label="Heading">
              <input
                className={inputClass}
                value={draft.about.root.heading}
                onChange={(e) =>
                  updateNested("about", "root", "heading", e.target.value)
                }
              />
            </Field>
            <Field label="Body">
              <textarea
                className={textareaClass}
                value={draft.about.root.body}
                onChange={(e) =>
                  updateNested("about", "root", "body", e.target.value)
                }
              />
            </Field>

            <h3 className="text-lg font-bold">Partners</h3>
            <Field label="Section heading">
              <input
                className={inputClass}
                value={draft.about.partnersHeading}
                onChange={(e) =>
                  updateSection("about", "partnersHeading", e.target.value)
                }
              />
            </Field>
            <ListEditor
              items={draft.about.partners}
              onChange={(items) => updateSection("about", "partners", items)}
              fields={[
                { key: "name", label: "Partner name" },
                { key: "description", label: "Description", multiline: true },
              ]}
              emptyItem={{ name: "", description: "" }}
              addLabel="+ Add partner"
            />

            <h3 className="text-lg font-bold">Website Credits</h3>
            <Field label="Section heading">
              <input
                className={inputClass}
                value={draft.about.creditsHeading}
                onChange={(e) =>
                  updateSection("about", "creditsHeading", e.target.value)
                }
              />
            </Field>
            <ListEditor
              items={draft.about.websiteCredits}
              onChange={(items) =>
                updateSection("about", "websiteCredits", items)
              }
              fields={[
                { key: "category", label: "Category (e.g. UI Designers)" },
                {
                  key: "members",
                  label: "Names (one per line)",
                  multiline: true,
                },
              ]}
              emptyItem={{ category: "", members: "" }}
              addLabel="+ Add credit group"
            />
          </div>
        )}

        {activeTab === "services" && (
          <div className="flex flex-col gap-6">
            <Field label="Page title">
              <input
                className={inputClass}
                value={draft.services.pageTitle}
                onChange={(e) =>
                  updateSection("services", "pageTitle", e.target.value)
                }
              />
            </Field>
            <ListEditor
              items={draft.services.items}
              onChange={(items) => updateSection("services", "items", items)}
              fields={[
                { key: "title", label: "Service title" },
                { key: "description", label: "Description", multiline: true },
              ]}
              emptyItem={{ title: "", description: "" }}
              addLabel="+ Add service"
            />
            <Field label="CTA heading">
              <input
                className={inputClass}
                value={draft.services.ctaHeading}
                onChange={(e) =>
                  updateSection("services", "ctaHeading", e.target.value)
                }
              />
            </Field>
            <Field label="CTA body">
              <textarea
                className={textareaClass}
                value={draft.services.ctaBody}
                onChange={(e) =>
                  updateSection("services", "ctaBody", e.target.value)
                }
              />
            </Field>
          </div>
        )}

        {activeTab === "career" && (
          <div className="flex flex-col gap-6">
            <Field label="Page title">
              <input
                className={inputClass}
                value={draft.career.pageTitle}
                onChange={(e) =>
                  updateSection("career", "pageTitle", e.target.value)
                }
              />
            </Field>
            <ListEditor
              items={draft.career.roles}
              onChange={(items) => updateSection("career", "roles", items)}
              fields={[
                { key: "title", label: "Role title" },
                { key: "description", label: "Description", multiline: true },
              ]}
              emptyItem={{ title: "", description: "" }}
              addLabel="+ Add role"
            />
            <Field label="CTA heading">
              <input
                className={inputClass}
                value={draft.career.ctaHeading}
                onChange={(e) =>
                  updateSection("career", "ctaHeading", e.target.value)
                }
              />
            </Field>
            <Field label="CTA body">
              <textarea
                className={textareaClass}
                value={draft.career.ctaBody}
                onChange={(e) =>
                  updateSection("career", "ctaBody", e.target.value)
                }
              />
            </Field>
            <Field label="Join button text">
              <input
                className={inputClass}
                value={draft.career.joinButtonText}
                onChange={(e) =>
                  updateSection("career", "joinButtonText", e.target.value)
                }
              />
            </Field>
          </div>
        )}

        {activeTab === "people" && (
          <div className="flex flex-col gap-6">
            <Field label="Faculty section heading">
              <input
                className={inputClass}
                value={draft.people.facultyHeading}
                onChange={(e) =>
                  updateSection("people", "facultyHeading", e.target.value)
                }
              />
            </Field>
            <ListEditor
              items={draft.people.facultyMentors}
              onChange={(items) =>
                updateSection("people", "facultyMentors", items)
              }
              fields={[
                { key: "name", label: "Name" },
                { key: "title", label: "Title / role", multiline: true },
              ]}
              emptyItem={{ name: "", title: "" }}
              addLabel="+ Add faculty mentor"
            />
          </div>
        )}

        <div className="flex items-center gap-4 pt-4 border-t border-white/10">
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-3 bg-[#AA1E6B] rounded-md font-semibold disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
          {message && <p className="text-sm text-green-400">{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default PageContentAdmin;
