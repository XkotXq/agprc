import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
	Home,
	Inbox,
	Calendar,
	Search,
	Settings,
	LogOut,
	Table,
  Plus,
  ChartSpline,
} from "lucide-react";
import { Button } from "./ui/button";
import { signOut } from "next-auth/react";

export function AppSidebar() {
	return (
		<Sidebar>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Panel</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							<SidebarMenuItem>
								<SidebarMenuButton asChild>
									<a href="/admin/dashboard">
										<Table />
										<span>Lista ofert pracy</span>
									</a>
								</SidebarMenuButton>
							</SidebarMenuItem>
							<SidebarMenuItem>
								<SidebarMenuButton asChild>
									<a href="/admin/dashboard/create-job">
										<Plus />
										<span>Dodaj ofertę pracy</span>
									</a>
								</SidebarMenuButton>
							</SidebarMenuItem>
							<SidebarMenuItem>
								<SidebarMenuButton asChild>
									<a href="/admin/dashboard/statistics">
										<ChartSpline />
										<span>Statystki</span>
									</a>
								</SidebarMenuButton>
							</SidebarMenuItem>
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter>
				<Button onClick={() => signOut({ callbackUrl: "/admin" })} className="cursor-pointer">
					<LogOut />
					Wyloguj
				</Button>
			</SidebarFooter>
		</Sidebar>
	);
}
