import { RotateCcw, SearchX, TriangleAlert } from "lucide-react";
import { useRef } from "react";
import { CatalogControls } from "./components/CatalogControls";
import { CategoryStrip } from "./components/CategoryStrip";
import { FilterChips } from "./components/FilterChips";
import { Hero } from "./components/Hero";
import { VirtualizedRepoGrid } from "./components/VirtualizedRepoGrid";
import { useCatalogData } from "./hooks/useCatalogData";
import { useInfiniteScroll } from "./hooks/useInfiniteScroll";
import { formatNumber } from "./utils";

export function App() {
	const {
		manifest,
		filters,
		effectiveFilters,
		visibleRecords,
		categoryRecords,
		categories,
		isLoading,
		isLoadingAll,
		error,
		loadManifest,
		filterOptions,
		updateFilter,
		resetFilters,
		hasActiveFilters,
		totalLoaded,
		totalExpected,
		isPartial,
	} = useCatalogData();

	const sentinelRef = useRef<HTMLDivElement>(null);
	useInfiniteScroll(sentinelRef);

	return (
		<main className="mx-auto w-[min(1240px,calc(100%-2rem))] py-8 pb-20">
			<a
				href="#catalog-heading"
				className="sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-primary-content"
			>
				Skip to catalog
			</a>
			<Hero manifest={manifest} categoryCount={categories.length} />

			<CatalogControls
				filters={filters}
				filterOptions={filterOptions}
				onUpdateFilter={updateFilter}
			/>

			<CategoryStrip
				selectedCategory={filters.category}
				categories={categories}
				categoryRecords={categoryRecords}
				onSelectCategory={(category) => updateFilter("category", category)}
			/>

			{hasActiveFilters && (
				<div className="pt-3">
					<FilterChips
						filters={effectiveFilters}
						onUpdateFilter={updateFilter}
						onReset={resetFilters}
					/>
				</div>
			)}

			<div className="flex flex-wrap items-baseline justify-between gap-2 py-6 pb-3 text-sm text-base-content/60">
				<h2
					id="catalog-heading"
					tabIndex={-1}
					className="font-display text-xl font-bold text-base-content"
				>
					Repository catalog
				</h2>
				<span aria-live="polite">
					{isPartial
						? `Showing ${formatNumber(totalLoaded)} of ${formatNumber(totalExpected)} loaded`
						: `${formatNumber(visibleRecords.length)} repositories shown`}
				</span>
				{hasActiveFilters && (
					<button
						type="button"
						className="btn btn-ghost btn-xs gap-1"
						onClick={resetFilters}
					>
						<RotateCcw size={12} aria-hidden="true" />
						Reset filters
					</button>
				)}
				{isLoadingAll && (
					<span className="inline-flex items-center gap-2 text-primary">
						<span className="loading loading-spinner loading-xs" />
						Loading remaining repositories...
					</span>
				)}
			</div>

			{error && (
				<div className="alert alert-error">
					<TriangleAlert size={18} aria-hidden="true" />
					<div>
						<strong>Catalog unavailable</strong>
						<div className="text-sm opacity-80">{error}</div>
					</div>
					<button
						type="button"
						className="btn btn-sm"
						onClick={() => void loadManifest()}
					>
						<RotateCcw size={14} aria-hidden="true" />
						Try again
					</button>
				</div>
			)}

			{!error && visibleRecords.length === 0 && !isLoading && (
				<div className="hero rounded-box border border-dashed border-base-300 bg-base-200">
					<div className="hero-content flex-col text-center">
						<SearchX
							size={28}
							aria-hidden="true"
							className="text-base-content/40"
						/>
						<strong className="text-xl">No repositories matched</strong>
						<span className="text-sm text-base-content/60">
							Try a broader search or reset one of the filters.
						</span>
					</div>
				</div>
			)}

			{!error && visibleRecords.length === 0 && isLoading && (
				<div
					className="grid gap-3 md:grid-cols-2 lg:grid-cols-3"
					aria-hidden="true"
				>
					<span className="skeleton h-[265px]" />
					<span className="skeleton h-[265px]" />
					<span className="skeleton h-[265px]" />
					<span className="skeleton h-[265px]" />
					<span className="skeleton h-[265px]" />
					<span className="skeleton h-[265px]" />
				</div>
			)}

			{visibleRecords.length > 0 && (
				<VirtualizedRepoGrid records={visibleRecords} />
			)}

			<div
				ref={sentinelRef}
				className="infinite-sentinel flex items-center justify-center py-4"
			>
				{isLoading && !isLoadingAll && (
					<span className="inline-flex items-center gap-2 text-sm text-primary">
						<span className="loading loading-spinner loading-sm" />
						Loading more repositories...
					</span>
				)}
			</div>
		</main>
	);
}
