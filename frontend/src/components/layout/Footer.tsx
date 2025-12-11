export default function Footer() {
    return (
        <footer className="px-6 py-8 bg-card border-t border-theme">
            <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-around items-center gap-4">
                <div className="text-sm text-secondary">© {new Date().getFullYear()} PartsVision · Bartosz Marek · IC API</div>
            </div>
        </footer>
    );
}
