import Link from "next/link";
import Wrapper from "./Wrapper";

export default function Footer() {
	return (
		<footer className="border-t bg-neutral-100 shadow-[0_-2px_12px_rgba(0,0,0,0.06)]">
			<Wrapper className="py-2">
				<div className="py-5 flex justify-between">
					<div>
						<h1>RAW JOB</h1>
						<p>Outsourcing</p>
					</div>
					<div>
						<h2 className="font-medium text-lg">Dla pracodawcy</h2>
						<ul>
							<li>
								<Link href="/">Oferta</Link>
							</li>
							<li>
								<Link href="/">Co to outsourcing procesowy?</Link>
							</li>
							<li>
								<Link href="/">Dlaczego my?</Link>
							</li>
						</ul>
					</div>
                    <div>
                        <h2 className="font-medium text-lg">Kontakt</h2>
                        <ul>
                            <li>ul. Niepodległości 7</li>
                            <li>96-200 Rawa Mazowiecka</li>
                            <li>+48 534 409 481</li>
                            <li>+380 932 870 621 (Viber)</li>
                            <li>j.redlicki@rawjob.pl</li>
                        </ul>
                    </div>
				</div>
				<hr />
				<div className="py-5 text-center">
					<p>
						© 2026 Raw Job Outsourcing Sp. z o. o. Wszelkie prawa zastrzeżone.
					</p>
				</div>
			</Wrapper>
		</footer>
	);
}
