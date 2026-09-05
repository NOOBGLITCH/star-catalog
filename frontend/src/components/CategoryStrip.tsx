import {
	AppWindow,
	Bot,
	Clapperboard,
	Cloud,
	Cog,
	Database,
	GraduationCap,
	Hash,
	Layers,
	LayoutGrid,
	type LucideIcon,
	Monitor,
	MonitorSmartphone,
	Newspaper,
	Package,
	Palette,
	PenTool,
	Puzzle,
	Server,
	ShieldCheck,
	Smartphone,
	Table,
	Terminal,
	TrendingUp,
	Wrench,
	X,
	Zap,
} from "lucide-react";
import type { CatalogCategorySummary, ClassifiedStarRecord } from "../types";

const CATEGORY_ICONS: Record<string, LucideIcon> = {
	ai: Bot,
	automation: Zap,
	backend: Server,
	"browser-extensions": Puzzle,
	cli: Terminal,
	cloud: Cloud,
	"content-cms": Newspaper,
	databases: Database,
	data: Table,
	"data-visualization": TrendingUp,
	design: Palette,
	"design-systems": Layers,
	desktop: Monitor,
	"developer-tools": Wrench,
	devops: Cog,
	dotnet: Hash,
	"editor-tooling": PenTool,
	frontend: AppWindow,
	learning: GraduationCap,
	libraries: Package,
	media: Clapperboard,
	misc: MonitorSmartphone,
	mobile: Smartphone,
	security: ShieldCheck,
};

function iconFor(categoryId: string): LucideIcon {
	return CATEGORY_ICONS[categoryId] ?? LayoutGrid;
}

interface CategoryStripProps {
	selectedCategory: string;
	categories: CatalogCategorySummary[];
	categoryRecords: ClassifiedStarRecord[];
	onSelectCategory: (id: string) => void;
	onClose?: () => void;
}

export function CategoryStrip({
	selectedCategory,
	categories,
	categoryRecords,
	onSelectCategory,
	onClose,
}: CategoryStripProps) {
	const countFor = (id: string) =>
		categoryRecords.filter((record) => record.category === id).length;

	return (
		<nav aria-label="Categories">
			<div className="flex items-center justify-between gap-2 px-5 pt-6 pb-4">
				<span className="text-xs font-bold uppercase tracking-widest text-primary">
					Categories
				</span>
				{onClose && (
					<button
						type="button"
						className="btn btn-ghost btn-sm btn-circle"
						aria-label="Close categories menu"
						onClick={onClose}
					>
						<X size={16} aria-hidden="true" />
					</button>
				)}
			</div>
			<div className="divider mx-5 my-0" aria-hidden="true" />
			<ul className="menu w-full gap-1.5 px-4 py-4">
				<li>
					<button
						type="button"
						className={selectedCategory === "all" ? "active" : ""}
						onClick={() => onSelectCategory("all")}
					>
						<LayoutGrid size={16} aria-hidden="true" />
						All
						<span className="badge badge-sm">{categoryRecords.length}</span>
					</button>
				</li>
				{categories.map((category) => {
					const Icon = iconFor(category.id);
					return (
						<li key={category.id}>
							<button
								type="button"
								className={selectedCategory === category.id ? "active" : ""}
								onClick={() => onSelectCategory(category.id)}
								title={category.description || category.title}
							>
								<Icon size={16} aria-hidden="true" />
								{category.title}
								<span className="badge badge-sm opacity-70">
									{countFor(category.id)}
								</span>
							</button>
						</li>
					);
				})}
			</ul>
		</nav>
	);
}
