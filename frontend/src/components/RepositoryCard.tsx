import {
	Archive,
	Clock,
	ExternalLink,
	GitFork,
	Scale,
	Star,
} from "lucide-react";
import { languageColor } from "../languages";
import { CARD_HEIGHT } from "../layout";
import { useCatalogStore } from "../store";
import type { ClassifiedStarRecord } from "../types";
import { formatNumber, formatRelative } from "../utils";

interface RepositoryCardProps {
	record: ClassifiedStarRecord;
}

export function RepositoryCard({ record }: RepositoryCardProps) {
	const setFilter = useCatalogStore((state) => state.setFilter);

	const applyTag = (key: "language" | "license" | "query", value: string) => {
		setFilter(key, value);
		document
			.getElementById("catalog-heading")
			?.scrollIntoView({ behavior: "smooth", block: "start" });
	};

	return (
		<li
			className="card card-bordered bg-[linear-gradient(145deg,#171d21,#13191c)] shadow-sm transition-all hover:-translate-y-0.5 hover:border-[#d4f56a88] hover:shadow-xl"
			style={{ height: CARD_HEIGHT }}
		>
			<div className="card-body gap-2 overflow-hidden p-4">
				<div className="flex items-center justify-between gap-2">
					<span className="category-label">{record.categoryTitle}</span>
					{record.archived && (
						<span className="badge badge-outline badge-warning badge-sm gap-1">
							<Archive size={12} aria-hidden="true" />
							Archived
						</span>
					)}
				</div>
				<h3 className="card-title font-display text-base leading-tight">
					<a
						className="link link-hover truncate"
						href={record.url}
						target="_blank"
						rel="noreferrer noopener"
					>
						{record.fullName}
					</a>
					<ExternalLink
						size={14}
						aria-hidden="true"
						className="shrink-0 text-base-content/40"
					/>
				</h3>
				<p className="line-clamp-3 flex-1 text-sm leading-relaxed text-base-content/60">
					{record.description || "No description provided."}
				</p>
				<div className="flex min-h-7 flex-wrap gap-1.5 overflow-hidden">
					{record.language && (
						<button
							type="button"
							className="badge badge-soft badge-sm cursor-pointer gap-1.5 transition-colors hover:border-primary"
							title={`Show all ${record.language} repositories`}
							aria-label={`Filter by language ${record.language}`}
							onClick={() => applyTag("language", record.language as string)}
						>
							<span
								className="size-2 rounded-full"
								style={{ backgroundColor: languageColor(record.language) }}
								aria-hidden="true"
							/>
							{record.language}
						</button>
					)}
					{record.license && (
						<button
							type="button"
							className="badge badge-outline badge-sm cursor-pointer gap-1 transition-colors hover:border-primary"
							title={`Show all ${record.license} repositories`}
							aria-label={`Filter by license ${record.license}`}
							onClick={() => applyTag("license", record.license as string)}
						>
							<Scale size={12} aria-hidden="true" />
							{record.license}
						</button>
					)}
					{record.fork && (
						<span className="badge badge-outline badge-sm gap-1">
							<GitFork size={12} aria-hidden="true" />
							Fork
						</span>
					)}
					{record.topics.slice(0, 3).map((topic) => (
						<button
							key={topic}
							type="button"
							className="badge badge-ghost badge-sm cursor-pointer transition-colors hover:border-primary"
							title={`Search for ${topic}`}
							aria-label={`Search for ${topic}`}
							onClick={() => applyTag("query", topic)}
						>
							#{topic}
						</button>
					))}
				</div>
				<div className="flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-base-300/60 pt-2 text-xs text-base-content/60">
					<span
						className="inline-flex items-center gap-1 font-semibold text-base-content/80"
						title={`${formatNumber(record.stargazersCount)} stargazers`}
					>
						<Star
							size={12}
							aria-hidden="true"
							className="fill-primary text-primary"
						/>
						{formatNumber(record.stargazersCount)}
					</span>
					<time
						dateTime={record.starredAt ?? undefined}
						title={record.starredAt ?? undefined}
					>
						Starred {formatRelative(record.starredAt)}
					</time>
					<time
						dateTime={record.updatedAt}
						title={record.updatedAt}
						className="inline-flex items-center gap-1"
					>
						<Clock size={12} aria-hidden="true" />
						{formatRelative(record.updatedAt)}
					</time>
				</div>
			</div>
		</li>
	);
}
