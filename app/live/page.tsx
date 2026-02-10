export default function Live() {
    return (
        <>
            <section
                className="hero-banner"
                style={{ backgroundImage: "url('/images/hero-live.jpg')" }}
            >
                <div className="hero-content">
                    <h1 className="hero-title">Live Worship</h1>
                    <p className="hero-subtitle">Join us online for live worship services</p>
                </div>
            </section>

            <section className="container">
                <div className="content-wrapper">
                    <div className="card-featured scroll-fade mb-2xl">
                        <h2 className="mb-lg">Watch Live</h2>
                        <div className="video-container" id="liveStreamContainer">
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    height: "100%",
                                    padding: "var(--space-2xl)",
                                    textAlign: "center",
                                    background: "rgba(255,255,255,0.1)",
                                }}
                            >
                                <div>
                                    <h3 style={{ color: "white", marginBottom: "var(--space-md)" }}>
                                        Stream Offline
                                    </h3>
                                    <p style={{ color: "rgba(255,255,255,0.9)" }}>
                                        We&apos;re not currently streaming. Check back during service times!
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card scroll-fade">
                        <div className="card-content">
                            <h3 className="card-title">Service Times</h3>
                            <p className="mb-md">Sunday Worship Services:</p>
                            <ul style={{ listStyle: "none", padding: 0 }}>
                                <li
                                    style={{
                                        padding: "var(--space-sm) 0",
                                        borderBottom: "1px solid var(--color-secondary)",
                                    }}
                                >
                                    <strong>First Service</strong> • <span>10:00 AM</span>
                                </li>
                                <li style={{ padding: "var(--space-sm) 0" }}>
                                    <strong>Second Service</strong> • <span>12:30 PM</span>
                                </li>
                            </ul>
                            <p className="mt-lg text-light">
                                Can&apos;t make it in person? We live stream both services every Sunday!
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
