import { useWindowVirtualizer } from "@tanstack/react-virtual";
import { useResponsiveColumns } from "../hooks/useResponsiveColumns";
import { ROW_HEIGHT } from "../layout";
import type { ClassifiedStarRecord } from "../types";
import { RepositoryCard } from "./RepositoryCard";

interface VirtualizedRepoGridProps {
	records: ClassifiedStarRecord[];
}

export function VirtualizedRepoGrid({ records }: VirtualizedRepoGridProps) {
	const columns = useResponsiveColumns();

	const rowCount = Math.ceil(records.length / columns);

	const virtualizer = useWindowVirtualizer({
		count: rowCount,
		estimateSize: () => ROW_HEIGHT,
		overscan: 2,
	});

	return (
		<ul className="virtual-grid-container list-none" aria-label="Repositories">
			<div
				role="presentation"
				style={{
					height: `${virtualizer.getTotalSize()}px`,
					width: "100%",
					position: "relative",
				}}
			>
				{virtualizer.getVirtualItems().map((virtualRow) => {
					const startIndex = virtualRow.index * columns;
					const rowItems = records.slice(startIndex, startIndex + columns);

					return (
						<div
							key={virtualRow.key}
							data-index={virtualRow.index}
							role="presentation"
							style={{
								position: "absolute",
								top: 0,
								left: 0,
								width: "100%",
								height: `${ROW_HEIGHT}px`,
								transform: `translateY(${virtualRow.start}px)`,
								display: "grid",
								gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
								gap: "0.8rem",
								alignContent: "start",
							}}
						>
							{rowItems.map((record) => (
								<RepositoryCard key={record.id} record={record} />
							))}
						</div>
					);
				})}
			</div>
		</ul>
	);
}
