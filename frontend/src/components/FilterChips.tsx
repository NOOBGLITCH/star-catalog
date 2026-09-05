import { X } from "lucide-react";
import { INITIAL_FILTERS } from "../store";
import type { CatalogFilters } from "../types";

interface FilterChipsProps {
	filters: CatalogFilters;
	onUpdateFilter: <T extends keyof CatalogFilters>(
		key: T,
		value: CatalogFilters[T],
	) => void;
	onReset: () => void;
}

export function FilterChips({
	filters,
	onUpdateFilter,
	onReset,
}: FilterChipsProps) {
	const chips: { key: keyof CatalogFilters; label: string }[] = [];

	if (filters.query.trim() !== "") {
		chips.push({ key: "query", label: `Search: ${filters.query.trim()}` });
	}
	if (filters.category !== INITIAL_FILTERS.category) {
		chips.push({ key: "category", label: `Category: ${filters.category}` });
	}
	if (filters.language !== INITIAL_FILTERS.language) {
		chips.push({ key: "language", label: `Language: ${filters.language}` });
	}
	if (filters.license !== INITIAL_FILTERS.license) {
		chips.push({ key: "license", label: `License: ${filters.license}` });
	}
	if (filters.visibility !== INITIAL_FILTERS.visibility) {
		chips.push({
			key: "visibility",
			label: `Visibility: ${filters.visibility}`,
		});
	}
	if (filters.sort !== INITIAL_FILTERS.sort) {
		chips.push({ key: "sort", label: `Sort: ${filters.sort}` });
	}

	if (chips.length === 0) return null;

	return (
		<fieldset className="m-0 flex flex-wrap items-center gap-2 border-0 p-0 pb-1">
			<legend className="sr-only">Active filters</legend>
			{chips.map((chip) => (
				<span key={chip.key} className="badge badge-outline gap-1 py-3">
					{chip.label}
					<button
						type="button"
						className="inline-flex cursor-pointer items-center"
						aria-label={`Clear ${chip.key} filter`}
						onClick={() => onUpdateFilter(chip.key, INITIAL_FILTERS[chip.key])}
					>
						<X size={12} aria-hidden="true" />
					</button>
				</span>
			))}
			<button type="button" className="btn btn-ghost btn-xs" onClick={onReset}>
				Reset all
			</button>
		</fieldset>
	);
}
