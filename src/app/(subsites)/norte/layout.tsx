import { Metadata } from 'next';
import { norteConfig } from '@/config/norte';

export const metadata: Metadata = {
    title: norteConfig.title,
    description: norteConfig.description,
};

export default function NorteLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="bg-[#FAF9F6] min-h-screen text-zinc-900 font-sans tracking-tight selection:bg-[#25D366] selection:text-white">
            {children}
        </div>
    );
}
