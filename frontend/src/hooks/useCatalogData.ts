import { useEffect, useMemo } from "react";
import { INITIAL_FILTERS, useCatalogStore } from "../store";
import type { CatalogFilters } from "../types";
import { matches, sortRecords } from "../utils";
import { useDebouncedValue } from "./useDebouncedValue";

const DEBOUNCE_MS = 250;

function hasActiveFilters(filters: CatalogFilters): boolean {
	return (
		filters.query.trim() !== "" ||
		filters.category !== INITIAL_FILTERS.category ||
		filters.language !== INITIAL_FILTERS.language ||
		filters.license !== INITIAL_FILTERS.license ||
		filters.sort !== INITIAL_FILTERS.sort ||
		filters.visibility !== INITIAL_FILTERS.visibility
	);
}

export function useCatalogData() {
	const manifest = useCatalogStore((state) => state.manifest);
	const records = useCatalogStore((state) => state.records);
	const filters = useCatalogStore((state) => state.filters);
	const isLoading = useCatalogStore((state) => state.isLoading);
	const isLoadingAll = useCatalogStore((state) => state.isLoadingAll);
	const error = useCatalogStore((state) => state.error);
	const loadManifest = useCatalogStore((state) => state.loadManifest);
	const ensureAllLoaded = useCatalogStore((state) => state.ensureAllLoaded);
	const setFilter = useCatalogStore((state) => state.setFilter);
	const resetFilters = useCatalogStore((state) => state.resetFilters);

	useEffect(() => {
		void loadManifest();
	}, [loadManifest]);

	// The input stays live for responsiveness; filtering commits on debounce.
	const debouncedQuery = useDebouncedValue(filters.query, DEBOUNCE_MS);
	const effectiveFilters = useMemo(
		() => ({ ...filters, query: debouncedQuery }),
		[filters, debouncedQuery],
	);

	// Narrowing filters must see the complete catalog. Plain browsing
	// (category + sort only) stays progressive and paginates on scroll.
	const needsFullDataset =
		effectiveFilters.query.trim() !== "" ||
		effectiveFilters.language !== INITIAL_FILTERS.language ||
		effectiveFilters.license !== INITIAL_FILTERS.license ||
		effectiveFilters.visibility !== INITIAL_FILTERS.visibility;

	useEffect(() => {
		if (manifest && needsFullDataset) {
			void ensureAllLoaded();
		}
	}, [manifest, needsFullDataset, ensureAllLoaded]);

	const visibleRecords = useMemo(
		() =>
			sortRecords(
				records.filter((record) => matches(record, effectiveFilters)),
				effectiveFilters.sort,
			),
		[records, effectiveFilters],
	);

	const categoryRecords = useMemo(
		() =>
			records.filter((record) =>
				matches(record, effectiveFilters, ["category"]),
			),
		[records, effectiveFilters],
	);

	const filterOptions = (key: "language" | "license") =>
		Array.from(new Set(records.map((record) => record[key] ?? "__none__")))
			.sort()
			.map((value) => ({
				value,
				label: value === "__none__" ? `No ${key}` : value,
			}));

	const updateFilter = <T extends keyof CatalogFilters>(
		key: T,
		value: CatalogFilters[T],
	) => setFilter(key, value);

	const totalLoaded = records.length;
	const totalExpected = manifest?.total ?? 0;

	return {
		manifest,
		filters,
		effectiveFilters,
		visibleRecords,
		categoryRecords,
		categories: manifest?.categories ?? [],
		isLoading,
		isLoadingAll,
		error,
		loadManifest,
		filterOptions,
		updateFilter,
		resetFilters,
		hasActiveFilters: hasActiveFilters(effectiveFilters),
		totalLoaded,
		totalExpected,
		isPartial: manifest !== null && totalLoaded < totalExpected,
	};
}
