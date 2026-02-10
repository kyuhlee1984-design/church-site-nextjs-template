import Link from "next/link";

export default function Ministries() {
    const ministries = [
        {
            title: "Promise Land (Children)",
            description:
                "Our children's ministry (Promise Land) provides a loving environment for infants through elementary students to learn about God's love through engaging activities, worship, and Bible stories.",
        },
        {
            title: "King's Army (Middle School)",
            description:
                "King's Army is our middle school ministry where students develop strong faith foundations, build lasting friendships, and learn to serve God with courage and passion.",
        },
        {
            title: "Second Chapter (High School)",
            description:
                "Second Chapter is our high school ministry empowering students to write their faith story with purpose, helping them navigate challenges and discover their identity in Christ.",
        },
        {
            title: "English Ministry & Young Adults",
            description:
                "Our English Ministry and Young Adult Community provide worship, fellowship, and discipleship opportunities for English-speaking members and young adults, building a vibrant community of faith.",
        },
    ];

    return (
        <>
            <section
                className="hero-banner"
                style={{ backgroundImage: "url('/images/hero-ministries.jpg')" }}
            >
                <div className="hero-content">
                    <h1 className="hero-title">Ministries</h1>
                    <p className="hero-subtitle">Find your place to connect, grow, and serve</p>
                </div>
            </section>

            <section className="container">
                <div className="card-grid card-grid-2">
                    {ministries.map((ministry, index) => (
                        <div key={index} className="card scroll-fade">
                            <div className="card-content">
                                <h3 className="card-title">{ministry.title}</h3>
                                <p className="card-description">{ministry.description}</p>
                                <div className="card-footer">
                                    <Link href="#" className="btn btn-primary">
                                        Learn More
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
