import {
	Archive,
	Clock,
	ExternalLink,
	GitFork,
	Scale,
	Star,
} from "lucide-react";
import { CARD_HEIGHT } from "../layout";
import type { ClassifiedStarRecord } from "../types";
import { formatNumber, formatRelative } from "../utils";

interface RepositoryCardProps {
	record: ClassifiedStarRecord;
}

export function RepositoryCard({ record }: RepositoryCardProps) {
	return (
		<li
			className="card card-bordered bg-[linear-gradient(145deg,#171d21,#13191c)] shadow-sm transition-colors hover:border-[#d4f56a88]"
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
				<div className="flex min-h-7 flex-wrap gap-1 overflow-hidden">
					{record.language && (
						<span className="badge badge-outline badge-sm">
							{record.language}
						</span>
					)}
					{record.license && (
						<span className="badge badge-outline badge-sm gap-1">
							<Scale size={12} aria-hidden="true" />
							{record.license}
						</span>
					)}
					{record.fork && (
						<span className="badge badge-outline badge-sm gap-1">
							<GitFork size={12} aria-hidden="true" />
							Fork
						</span>
					)}
					{record.topics.slice(0, 3).map((topic) => (
						<span key={topic} className="badge badge-outline badge-sm">
							{topic}
						</span>
					))}
				</div>
				<div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-base-content/60">
					<span className="inline-flex items-center gap-1">
						<Star size={12} aria-hidden="true" className="text-primary" />
						{formatNumber(record.stargazersCount)}
					</span>
					<time dateTime={record.starredAt ?? undefined}>
						Starred {formatRelative(record.starredAt)}
					</time>
					<time
						dateTime={record.updatedAt}
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
