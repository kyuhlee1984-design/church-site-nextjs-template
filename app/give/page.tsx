import Link from "next/link";

export default function Give() {
    const givingOptions = [
        {
            title: "Online Giving",
            description:
                "Give securely online using your credit card, debit card, or bank account. Set up one-time or recurring donations.",
        },
        {
            title: "In-Person",
            description:
                "Offering boxes are available during each service. You can also drop off donations at the church office Monday-Friday, 9 AM - 5 PM.",
        },
        {
            title: "By Mail",
            description:
                "Send checks payable to 'Grace Community Church' to: 123 Faith Avenue, Your City, ST 12345",
        },
    ];

    return (
        <>
            <section
                className="hero-banner"
                style={{ backgroundImage: "url('/images/hero-give.jpg')" }}
            >
                <div className="hero-content">
                    <h1 className="hero-title">Give</h1>
                    <p className="hero-subtitle">Generosity changes lives and builds God&apos;s kingdom</p>
                </div>
            </section>

            <section className="container">
                <div className="content-wrapper">
                    <div className="text-center mb-2xl">
                        <h2 className="mb-lg">Your generosity makes a difference</h2>
                        <p className="section-subtitle">
                            Every gift helps us spread the Gospel, serve our community, and support missions
                            around the world. Thank you for your faithful partnership in ministry!
                        </p>
                        <Link href="#" className="btn btn-primary btn-large">
                            Give Now
                        </Link>
                    </div>

                    <div className="card-grid card-grid-3">
                        {givingOptions.map((option, index) => (
                            <div key={index} className="card scroll-fade">
                                <div className="card-content">
                                    <h3 className="card-title">{option.title}</h3>
                                    <p className="card-description">{option.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
