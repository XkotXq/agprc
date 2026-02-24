import Wrapper from "./Wrapper";

export default function Footer() {
    return (
        <footer className="border-t bg-neutral-100 shadow-[0_-2px_12px_rgba(0,0,0,0.06)]">
            <Wrapper className="py-2">
                <div className="py-5">
                <h1>RAW JOB</h1>
                <p>Outsourcing</p>
                </div>
                <hr />
                <div className="py-5 text-center">
                    <p>

                    © 2026 Raw Job Outsourcing Sp. z o. o. Wszelkie prawa zastrzeżone.
                    </p>
                </div>
            </Wrapper>
        </footer>
    )
}