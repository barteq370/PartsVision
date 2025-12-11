type Props = {
    title: string;
    description: string;
};

export default function FeatureCard({ title, description }: Props) {
    return (
        <div className="feature-card">
            <h3 className="feature-title">{title}</h3>
            <p className="feature-text">{description}</p>
        </div>
    );
}
