import type { CatalogCategorySummary, ClassifiedStarRecord } from "../types";

interface CategoryStripProps {
	selectedCategory: string;
	categories: CatalogCategorySummary[];
	categoryRecords: ClassifiedStarRecord[];
	onSelectCategory: (id: string) => void;
}

export function CategoryStrip({
	selectedCategory,
	categories,
	categoryRecords,
	onSelectCategory,
}: CategoryStripProps) {
	const countFor = (id: string) =>
		categoryRecords.filter((record) => record.category === id).length;

	const pill = (active: boolean) =>
		active
			? "btn btn-primary btn-sm rounded-full"
			: "btn btn-ghost btn-sm rounded-full border border-base-300";

	return (
		<section
			className="flex gap-2 overflow-x-auto border-y border-base-300 py-3"
			aria-label="Categories"
		>
			<button
				type="button"
				className={pill(selectedCategory === "all")}
				onClick={() => onSelectCategory("all")}
			>
				All
				<span className="badge badge-sm">{categoryRecords.length}</span>
			</button>
			{categories.map((category) => (
				<button
					type="button"
					key={category.id}
					className={pill(selectedCategory === category.id)}
					onClick={() => onSelectCategory(category.id)}
				>
					{category.title}
					<span className="badge badge-sm opacity-70">
						{countFor(category.id)}
					</span>
				</button>
			))}
		</section>
	);
}
