interface SelectProps {
	label: string;
	value: string;
	options: { value: string; label: string }[];
	onChange: (value: string) => void;
}

export function Select({ label, value, options, onChange }: SelectProps) {
	return (
		<label className="form-control w-full">
			<div className="label">
				<span className="label-text text-xs font-bold uppercase tracking-widest text-primary">
					{label}
				</span>
			</div>
			<select
				className="select select-bordered w-full"
				value={value}
				onChange={(event) => onChange(event.target.value)}
			>
				{options.map((option) => (
					<option key={option.value} value={option.value}>
						{option.label}
					</option>
				))}
			</select>
		</label>
	);
}
