import {
	ArrowUpRight,
	CalendarClock,
	LayoutGrid,
	Sparkles,
	Star,
} from "lucide-react";
import type { CatalogManifest } from "../types";
import { formatIST, formatNumber } from "../utils";

interface HeroProps {
	manifest: CatalogManifest | null;
	categoryCount: number;
}

export function Hero({ manifest, categoryCount }: HeroProps) {
	return (
		<header className="border-b border-base-300 py-8">
			<div className="badge badge-primary badge-outline gap-1.5">
				<Sparkles size={14} aria-hidden="true" />
				Curated GitHub catalog
			</div>
			<div className="mt-4 grid items-end gap-8 lg:grid-cols-[1.5fr_minmax(290px,1fr)]">
				<div>
					<h1 className="font-display max-w-[10ch] text-5xl font-black leading-[0.9] tracking-tight md:text-7xl">
						{manifest?.seo?.heroTitle ?? manifest?.title ?? "My Stars Atlas"}
					</h1>
					<p className="mt-4 max-w-[52ch] text-base leading-relaxed text-base-content/60">
						{manifest?.seo?.heroDescription ??
							manifest?.description ??
							"Loading your starred repositories into a browsable atlas."}
					</p>
					<a
						className="btn btn-primary mt-6 gap-2"
						href={`https://github.com/${manifest?.username ?? "NOOBGLITCH"}`}
						target="_blank"
						rel="noreferrer noopener"
					>
						<ArrowUpRight size={16} aria-hidden="true" />
						Open GitHub profile
					</a>
				</div>
				<div className="stats border border-base-300 bg-base-200 shadow">
					<div className="stat">
						<div className="stat-figure text-primary">
							<Star size={20} aria-hidden="true" />
						</div>
						<div className="stat-value text-2xl">
							{formatNumber(manifest?.total ?? 0)}
						</div>
						<div className="stat-desc">repositories</div>
					</div>
					<div className="stat">
						<div className="stat-figure text-primary">
							<LayoutGrid size={20} aria-hidden="true" />
						</div>
						<div className="stat-value text-2xl">{categoryCount}</div>
						<div className="stat-desc">categories</div>
					</div>
					<div className="stat">
						<div className="stat-figure text-primary">
							<CalendarClock size={20} aria-hidden="true" />
						</div>
						<div className="stat-value text-lg">
							{formatIST(manifest?.generatedAt ?? null)}
						</div>
						<div className="stat-desc">last update</div>
					</div>
				</div>
			</div>
		</header>
	);
}
