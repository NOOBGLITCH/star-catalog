import { Search } from "lucide-react";
import type { CatalogFilters, SortOption, VisibilityOption } from "../types";
import { Select } from "./Select";

interface CatalogControlsProps {
	filters: CatalogFilters;
	filterOptions: (
		key: "language" | "license",
	) => { value: string; label: string }[];
	onUpdateFilter: <T extends keyof CatalogFilters>(
		key: T,
		value: CatalogFilters[T],
	) => void;
}

export function CatalogControls({
	filters,
	filterOptions,
	onUpdateFilter,
}: CatalogControlsProps) {
	return (
		<section
			className="grid gap-3 py-5 md:grid-cols-2 lg:grid-cols-[2fr_repeat(4,minmax(130px,1fr))]"
			aria-label="Catalog controls"
		>
			<label className="form-control w-full">
				<div className="label">
					<span className="label-text text-xs font-bold uppercase tracking-widest text-primary">
						Search the atlas
					</span>
				</div>
				<div className="relative">
					<Search
						size={16}
						aria-hidden="true"
						className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40"
					/>
					<input
						type="search"
						className="input input-bordered w-full pl-9"
						value={filters.query}
						onChange={(event) => onUpdateFilter("query", event.target.value)}
						placeholder="Name, topic, language, description..."
					/>
				</div>
			</label>
			<Select
				label="Sort"
				value={filters.sort}
				onChange={(value) => onUpdateFilter("sort", value as SortOption)}
				options={[
					{ value: "starred-desc", label: "Recently starred" },
					{ value: "stars-desc", label: "Most stars" },
					{ value: "updated-desc", label: "Recently updated" },
					{ value: "name-asc", label: "Name A-Z" },
				]}
			/>
			<Select
				label="Visibility"
				value={filters.visibility}
				onChange={(value) =>
					onUpdateFilter("visibility", value as VisibilityOption)
				}
				options={[
					{ value: "all", label: "All repositories" },
					{ value: "active", label: "Active only" },
					{ value: "archived", label: "Archived only" },
				]}
			/>
			<Select
				label="Language"
				value={filters.language}
				onChange={(value) => onUpdateFilter("language", value)}
				options={[
					{ value: "all", label: "All languages" },
					...filterOptions("language"),
				]}
			/>
			<Select
				label="License"
				value={filters.license}
				onChange={(value) => onUpdateFilter("license", value)}
				options={[
					{ value: "all", label: "All licenses" },
					...filterOptions("license"),
				]}
			/>
		</section>
	);
}
