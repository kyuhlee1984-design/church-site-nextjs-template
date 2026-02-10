import Link from "next/link";

export default function Sermons() {
    const sermons = [
        {
            date: "February 2, 2026 • Pastor John Kim",
            title: "Walking in Faith",
            description: "Exploring what it means to trust God in every season of life.",
        },
        {
            date: "January 26, 2026 • Pastor Sarah Lee",
            title: "The Power of Prayer",
            description:
                "Discovering how prayer transforms our lives and deepens our relationship with God.",
        },
        {
            date: "January 19, 2026 • Pastor John Kim",
            title: "Living with Purpose",
            description: "Understanding God's unique calling and purpose for each of our lives.",
        },
        {
            date: "January 12, 2026 • Pastor John Kim",
            title: "God's Unfailing Love",
            description: "A journey through the depths of God's unconditional love for His children.",
        },
        {
            date: "January 5, 2026 • Pastor Sarah Lee",
            title: "New Year, New Beginnings",
            description: "Embracing fresh starts and God's promises for the year ahead.",
        },
        {
            date: "December 29, 2025 • Pastor John Kim",
            title: "Reflecting on God's Faithfulness",
            description: "Looking back at God's provision and guidance throughout the past year.",
        },
    ];

    return (
        <>
            <section
                className="hero-banner"
                style={{ backgroundImage: "url('/images/hero-sermons.jpg')" }}
            >
                <div className="hero-content">
                    <h1 className="hero-title">Sermons</h1>
                    <p className="hero-subtitle">Listen to messages that inspire and challenge</p>
                </div>
            </section>

            <section className="container">
                <div className="content-wrapper mb-2xl">
                    <input
                        type="text"
                        id="sermonSearch"
                        placeholder="Search sermons..."
                        style={{
                            width: "100%",
                            padding: "var(--space-md)",
                            border: "1px solid var(--color-tertiary)",
                            borderRadius: "var(--radius-md)",
                            fontSize: "var(--font-size-base)",
                        }}
                    />
                </div>

                <div className="card-grid card-grid-3" id="sermonGrid">
                    {sermons.map((sermon, index) => (
                        <div key={index} className="card scroll-fade sermon-card">
                            <div className="card-content">
                                <div className="card-meta">{sermon.date}</div>
                                <h3 className="card-title">{sermon.title}</h3>
                                <p className="card-description">{sermon.description}</p>
                                <div className="card-footer">
                                    <Link href="#" className="btn btn-primary">
                                        Watch
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}
