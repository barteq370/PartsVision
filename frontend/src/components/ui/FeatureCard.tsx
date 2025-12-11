type Props = {
    title?: string;
    description?: string;
};


export default function FeatureCard({ title, description }: Props) {
    return (
        <div className="p-6 rounded-xl shadow bg-card">
            <h3 className="text-xl font-semibold mb-2 text-main">{title}</h3>
            <p className="text-secondary">{description}</p>
        </div>
    );
}