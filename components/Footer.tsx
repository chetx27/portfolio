import { GENERAL_INFO } from '@/lib/data';

const Footer = () => {
    return (
        <footer className="text-center pb-8 pt-4" id="contact">
            <div className="container">
                <p className="text-lg">Have a project in mind?</p>
                <a
                    href={`mailto:${GENERAL_INFO.email}`}
                    className="text-3xl sm:text-4xl font-anton inline-block mt-5 mb-8 hover:underline"
                >
                    {GENERAL_INFO.email}
                </a>
                <p className="text-muted-foreground text-sm">
                    Thanks for stopping by.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
