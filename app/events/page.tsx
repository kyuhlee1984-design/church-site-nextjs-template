import Link from "next/link";

export default function Events() {
    const events = [
        {
            date: "Friday, February 14, 2026 • 7:00 PM",
            title: "Valentine's Couples Night",
            description:
                "An evening of worship, fellowship, and celebration for married couples. Enjoy dinner, worship music, and a special message about love and marriage. Childcare provided with RSVP.",
            cta: "Register",
        },
        {
            date: "Saturday, February 22, 2026 • 9:00 AM - 2:00 PM",
            title: "Community Service Day",
            description:
                "Join us as we serve our local community through various outreach projects including food distribution, home repairs for seniors, and park cleanup. Lunch provided for all volunteers.",
            cta: "Sign Up",
        },
        {
            date: "Sunday, March 2, 2026 • 12:00 PM",
            title: "New Members Class",
            description:
                "Interested in joining Grace Community Church? This class covers our beliefs, values, and how you can become an official member. Light lunch will be served.",
            cta: "Register",
        },
        {
            date: "Friday, March 7-9, 2026",
            title: "Youth Winter Retreat",
            description:
                "A weekend getaway for our youth (grades 6-12) filled with worship, teaching, small groups, and recreational activities. Cost is $150 per person. Early bird discount available until Feb 20.",
            cta: "Register",
        },
    ];

    return (
        <>
            <section
                className="hero-banner"
                style={{ backgroundImage: "url('/images/hero-events.jpg')" }}
            >
                <div className="hero-content">
                    <h1 className="hero-title">Events</h1>
                    <p className="hero-subtitle">Connect with others and grow together</p>
                </div>
            </section>

            <section className="container">
                <h2 className="section-title">Upcoming Events</h2>

                <div className="card-grid card-grid-2">
                    {events.map((event, index) => (
                        <div key={index} className="card scroll-fade">
                            <div className="card-content">
                                <div className="card-meta">{event.date}</div>
                                <h3 className="card-title">{event.title}</h3>
                                <p className="card-description">{event.description}</p>
                                <div className="card-footer">
                                    <Link href="#" className="btn btn-primary">
                                        {event.cta}
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
