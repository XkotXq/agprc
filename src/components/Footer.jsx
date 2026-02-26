import Link from "next/link";
import Wrapper from "./Wrapper";

export default function Footer() {
	return (
		<footer className="border-t border-neutral-200 bg-gradient-to-b from-neutral-100 to-white">
			<Wrapper className="px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
				<div className="grid grid-cols-1 gap-8 border-b border-neutral-200 pb-8 sm:grid-cols-2 lg:grid-cols-4">
					<div className="sm:col-span-2 lg:col-span-2">
						<div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
							<div className="shrink-0 text-center">
								<img src="/rawJobLogo.svg" width={92} alt="Raw Job logo" className="mx-auto" />
								<h2 className="mt-1 text-xl font-semibold tracking-wide">RAW JOB</h2>
							</div>
							<p className="max-w-md text-center text-sm leading-6 text-neutral-700 sm:text-left">
								Jesteśmy firmą, która zajmuje się rekrutacją i zatrudnieniem pracowników
								z Polski oraz cudzoziemców dla firm o różnym profilu działalności.
							</p>
						</div>
					</div>

					<div>
						<h3 className="mb-3 text-base font-semibold text-neutral-900">Dla pracodawcy</h3>
						<ul className="space-y-2 text-sm text-neutral-700">
							<li>
								<Link href="/" className="transition-colors hover:text-neutral-950">
									Oferta
								</Link>
							</li>
							<li>
								<Link href="/" className="transition-colors hover:text-neutral-950">
									Co to outsourcing procesowy?
								</Link>
							</li>
							<li>
								<Link href="/" className="transition-colors hover:text-neutral-950">
									Dlaczego my?
								</Link>
							</li>
						</ul>
					</div>

					<div>
						<h3 className="mb-3 text-base font-semibold text-neutral-900">Kontakt</h3>
						<ul className="space-y-2 text-sm text-neutral-700">
							<li>ul. Niepodległości 7</li>
							<li>96-200 Rawa Mazowiecka</li>
							<li>
								<a href="tel:+48534409481" className="transition-colors hover:text-neutral-950">
									+48 534 409 481
								</a>
							</li>
							<li>
								<a href="tel:+380932870621" className="transition-colors hover:text-neutral-950">
									+380 932 870 621 (Viber)
								</a>
							</li>
							<li>
								<a
									href="mailto:j.redlicki@rawjob.pl"
									className="break-all transition-colors hover:text-neutral-950"
								>
									j.redlicki@rawjob.pl
								</a>
							</li>
						</ul>
					</div>
				</div>

				<div className="pt-5 text-center text-xs text-neutral-600 sm:text-sm">
					<p>© 2026 Raw Job Outsourcing Sp. z o. o. Wszelkie prawa zastrzeżone.</p>
				</div>
			</Wrapper>
		</footer>
	);
}
