import { classNames } from "@/lib/utils";

type TabsProps = {
  tab: "popular" | "now_playing";
  onTab: (id: "popular" | "now_playing") => void;
};

export default function Tabs({ tab, onTab }: TabsProps) {
  const tabs: ReadonlyArray<{ id: "popular" | "now_playing"; label: string }> =
    [
      { id: "popular", label: "Populares" },
      { id: "now_playing", label: "Em cartaz" },
    ];

  return (
    <div className="inline-flex rounded-xl border border-zinc-800 bg-zinc-900/40 p-1">
      {tabs.map((t) => (
        <button
          key={t.id}
          onClick={() => onTab(t.id)}
          className={classNames(
            "px-3 py-1.5 rounded-lg text-sm transition",
            tab === t.id
              ? "bg-indigo-600 text-white"
              : "text-zinc-300 hover:bg-zinc-800"
          )}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}
