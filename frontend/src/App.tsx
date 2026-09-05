import {
	ArrowUpRight,
	Menu,
	RotateCcw,
	SearchX,
	Star,
	TriangleAlert,
} from "lucide-react";
import { useRef, useState } from "react";
import { CatalogControls } from "./components/CatalogControls";
import { CategoryStrip } from "./components/CategoryStrip";
import { FilterChips } from "./components/FilterChips";
import { Hero } from "./components/Hero";
import { VirtualizedRepoGrid } from "./components/VirtualizedRepoGrid";
import { useCatalogData } from "./hooks/useCatalogData";
import { useInfiniteScroll } from "./hooks/useInfiniteScroll";
import { formatIST, formatNumber } from "./utils";

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
	const [drawerOpen, setDrawerOpen] = useState(false);

	return (
		<div className="drawer">
			<input
				id="category-drawer"
				type="checkbox"
				className="drawer-toggle"
				checked={drawerOpen}
				onChange={(event) => setDrawerOpen(event.target.checked)}
			/>
			<div className="drawer-content">
				<div className="navbar sticky top-0 z-30 border-b border-base-300 bg-base-100/95 backdrop-blur">
					<div className="mx-auto flex w-[min(1240px,calc(100%-2rem))] items-center justify-between">
						<div className="flex items-center gap-2">
							<label
								htmlFor="category-drawer"
								className="btn btn-ghost btn-sm btn-square"
								aria-label="Open categories menu"
							>
								<Menu size={18} aria-hidden="true" />
							</label>
							<span className="text-sm font-black tracking-tight">
								{manifest?.title ?? "My Stars Atlas"}
							</span>
						</div>
						<div className="flex items-center gap-2">
							<span className="badge badge-ghost hidden gap-1 sm:inline-flex">
								<Star size={12} aria-hidden="true" />
								{formatNumber(totalExpected)} starred
							</span>
							<a
								className="btn btn-ghost btn-sm btn-square"
								href={`https://github.com/${manifest?.username ?? "NOOBGLITCH"}`}
								target="_blank"
								rel="noreferrer noopener"
								aria-label="Open GitHub profile"
								title="Open GitHub profile"
							>
								<ArrowUpRight size={16} aria-hidden="true" />
							</a>
						</div>
					</div>
				</div>
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

					{hasActiveFilters && (
						<div className="pt-3">
							<FilterChips
								filters={effectiveFilters}
								onUpdateFilter={updateFilter}
								onReset={resetFilters}
							/>
						</div>
					)}

					<div className="flex flex-wrap items-center justify-between gap-2 py-6 pb-3 text-sm text-base-content/60">
						<div className="flex items-center gap-2">
							<h2
								id="catalog-heading"
								tabIndex={-1}
								className="font-display text-xl font-bold text-base-content"
							>
								Repository catalog
							</h2>
						</div>
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
								{hasActiveFilters && (
									<button
										type="button"
										className="btn btn-primary btn-sm mt-2"
										onClick={resetFilters}
									>
										<RotateCcw size={14} aria-hidden="true" />
										Reset filters
									</button>
								)}
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
					<footer className="mt-6 flex flex-wrap items-center justify-between gap-2 border-t border-base-300 pt-4 text-xs text-base-content/50">
						<span>
							My Stars Atlas · @{manifest?.username ?? "NOOBGLITCH"} ·{" "}
							{formatNumber(totalExpected)} repositories
						</span>
						<span>
							Updated {formatIST(manifest?.generatedAt ?? null)} ·{" "}
							<a
								className="link"
								href={`https://github.com/${manifest?.username ?? "NOOBGLITCH"}`}
								target="_blank"
								rel="noreferrer noopener"
							>
								GitHub profile
							</a>
						</span>
					</footer>
				</main>
			</div>
			<div className="drawer-side">
				<label
					htmlFor="category-drawer"
					aria-label="Close categories menu"
					className="drawer-overlay"
				/>
				<aside className="max-h-screen min-h-full w-72 overflow-y-auto bg-base-200">
					<CategoryStrip
						selectedCategory={filters.category}
						categories={categories}
						categoryRecords={categoryRecords}
						onSelectCategory={(category) => {
							updateFilter("category", category);
							setDrawerOpen(false);
						}}
						onClose={() => setDrawerOpen(false)}
					/>
				</aside>
			</div>
		</div>
	);
}
