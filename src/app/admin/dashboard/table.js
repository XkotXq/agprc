"use client";

import React, { useState } from "react";
import {
	ColumnDef,
	ColumnFiltersState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	SortingState,
	useReactTable,
	VisibilityState,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import polishPlural from "@/functions/plural";

function switchIsActive(slug) {
	fetch(`/api/admin/jobs/${slug}/isActive`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
		},
	})
	.then(response => response.json())
	.then(data => {
		if (data.error) {
			alert('Błąd: ' + data.error);
		} else {
			alert('Aktywność ogłoszenia została przełączona.');
			// Możesz odświeżyć dane tabeli tutaj, jeśli masz funkcję do tego
		}
	})
	.catch(error => {
		console.error('Error:', error);
		alert('Wystąpił błąd podczas przełączania aktywności.');
	});
}

export const columns = [
	{
		id: "zaznaczenie",
		header: ({ table }) => (
			<Checkbox
				checked={
					table.getIsAllPageRowsSelected() ||
					(table.getIsSomePageRowsSelected() && "indeterminate")
				}
				onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
				aria-label="Zaznacz wszystko"
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				checked={row.getIsSelected()}
				onCheckedChange={(value) => row.toggleSelected(!!value)}
				aria-label="Zaznacz wiersz"
			/>
		),
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: "index",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
					Lp
					<ArrowUpDown />
				</Button>
			);
		},
		size: 50,
		cell: ({ row }) => <div>{row.index + 1}</div>,
	},
	{
		accessorKey: "is_active",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					className="text-center"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
					dostępne
					<ArrowUpDown />
				</Button>
			);
		},
		cell: ({ row }) => (
			<div className="capitalize">
				{row.getValue("is_active") ? (
					<div className="text-green-200">tak</div>
				) : (
					<div className="text-red-200">nie</div>
				)}
			</div>
		),
	},
	{
		accessorKey: "title",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
					Tytuł
					<ArrowUpDown />
				</Button>
			);
		},
		cell: ({ row }) => (
			<div className="capitalize">{row.getValue("title")}</div>
		),
	},
	{
		accessorKey: "company",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
					Firma
					<ArrowUpDown />
				</Button>
			);
		},

		cell: ({ row }) => (
			<div className="capitalize">{row.getValue("company")}</div>
		),
	},
	{
		accessorKey: "city",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
					Lokalizacja
					<ArrowUpDown />
				</Button>
			);
		},
		cell: ({ row }) => {
			const city = row.getValue("city");
			return (
				<div className="capitalize">
					{Array.isArray(city) ? city.join(", ") : city}
				</div>
			);
		},
	},
	{
		accessorKey: "province",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
					Województwo
					<ArrowUpDown />
				</Button>
			);
		},
		cell: ({ row }) => (
			<div className="capitalize">{row.getValue("province")}</div>
		),
	},
	{
		accessorKey: "salary",
		header: () => <div className="text-right">Wynagrodzenie</div>,
		cell: ({ row }) => {
			const salaryFrom = parseFloat(row.original.salary_from || 0);
			const salaryTo = parseFloat(row.original.salary_to || 0);

			const formattedFrom = new Intl.NumberFormat("pl-PL", {
				style: "currency",
				currency: "PLN",
				minimumFractionDigits: 0,
			}).format(salaryFrom);

			const formattedTo = new Intl.NumberFormat("pl-PL", {
				style: "currency",
				currency: "PLN",
				minimumFractionDigits: 0,
			}).format(salaryTo);

			return (
				<div className="text-right font-medium">
					{salaryFrom && salaryTo ? `${formattedFrom} - ${formattedTo}` : "-"}
				</div>
			);
		},
	},
	{
		accessorKey: "date_posted",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
					Data stworzenia
					<ArrowUpDown />
				</Button>
			);
		},
		cell: ({ row }) => {
			const date_posted = new Date(row.getValue("date_posted"));
			const year = date_posted.getFullYear();
			const month = String(date_posted.getMonth() + 1).padStart(2, "0");
			const day = String(date_posted.getDate()).padStart(2, "0");
			const fullDate = `${day}.${month}.${year}`;

			return <div>{fullDate}</div>;
		},
	},
	{
		id: "actions",
		enableHiding: false,
		cell: ({ row }) => {
			const payment = row.original;

			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" className="h-8 w-8 p-0">
							<span className="sr-only">Open menu</span>
							<MoreHorizontal />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuLabel>Zarządzanie ogłoszeniem {row.index+1}</DropdownMenuLabel>
						<DropdownMenuItem
							onClick={() => navigator.clipboard.writeText(payment.id)}>
							Edytuj
						</DropdownMenuItem>
						{/* <DropdownMenuSeparator /> */}
						<DropdownMenuItem>Usuń</DropdownMenuItem>
						<DropdownMenuItem onClick={() => switchIsActive(row.original.slug)}>
							przełącz dostępność (na {row.getValue("is_active") ? "nie" : "tak"})
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
];

export default function DataTableDemo({ initialData = [] }) {
	const [sorting, setSorting] = useState([]);
	const [globalFilter, setGlobalFilter] = useState("");
	const [columnVisibility, setColumnVisibility] = useState({
		// Kolumny, które mają być domyślnie ukryte (ustaw na false)
		// "company": false,
		// "actions": false,
		date_posted: false,
		province: false,
	});
	const [rowSelection, setRowSelection] = useState({});
	const table = useReactTable({
		data: initialData.length > 0 ? initialData : [],
		columns,
		onSortingChange: setSorting,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		onRowSelectionChange: setRowSelection,
		globalFilterFn: "includesString",
		state: {
			sorting,
			columnVisibility,
			rowSelection,
			globalFilter,
		},
	});

	return (
		<div className="w-full">
			<div className="flex items-center gap-2 py-4">
				<Input
					placeholder="Przeszukaj ogłoszenia"
					value={globalFilter ?? ""}
					onChange={(event) => setGlobalFilter(event.target.value)}
					className="max-w-sm"
				/>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="outline" className="ml-auto">
							Kolumny <ChevronDown />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						{table
							.getAllColumns()
							.filter((column) => column.getCanHide())
							.map((column) => {
								return (
									<DropdownMenuCheckboxItem
										key={column.id}
										className="capitalize"
										checked={column.getIsVisible()}
										onCheckedChange={(value) =>
											column.toggleVisibility(!!value)
										}>
										{column.id}
									</DropdownMenuCheckboxItem>
								);
							})}
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
			<div className="overflow-hidden rounded-md border">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead key={header.id}>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef.header,
														header.getContext()
												  )}
										</TableHead>
									);
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									key={row.id}
									data-state={row.getIsSelected() && "selected"}>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext()
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className="h-24 text-center">
									Brak wyników.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			<div className="flex items-center justify-end space-x-2 py-4">
				<div className="text-muted-foreground flex-1 text-sm">
					{table.getFilteredSelectedRowModel().rows.length} z{" "}
					{table.getFilteredRowModel().rows.length}{" "}
					{polishPlural(table.getFilteredSelectedRowModel().rows.length, [
						"zaznaczony wiersz",
						"zaznaczone wiersze",
						"zaznaczonych wierszy",
					])}
					.
				</div>
				<div className="space-x-2">
					<Button
						variant="outline"
						size="sm"
						onClick={() => table.previousPage()}
						disabled={!table.getCanPreviousPage()}>
						Poprzednia
					</Button>
					<Button
						variant="outline"
						size="sm"
						onClick={() => table.nextPage()}
						disabled={!table.getCanNextPage()}>
						Następna
					</Button>
				</div>
			</div>
		</div>
	);
}
