export type Category = "Live Concerts" | "Festivals" | "Acoustic" | "Backstage";

export interface GalleryItem {
    id: string;
    src: string;
    category: Category;
    width: number;
    height: number;
    meta: {
        artist: string;
        venue: string;
        date: string;
        exif: {
            aperture: string;
            shutter: string;
            iso: string;
            model: string;
        };
    };
}

export const GALLERY_ITEMS: GalleryItem[] = [
    {
        id: "1",
        src: "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=2670&auto=format&fit=crop", // Surfer/Ocean vibe placeholder
        category: "Live Concerts",
        width: 800,
        height: 1200,
        meta: {
            artist: "The Midnight Echo",
            venue: "Terminal 5",
            date: "2024-11-12",
            exif: { aperture: "f/2.8", shutter: "1/250", iso: "3200", model: "Samsung S25 Ultra" },
        },
    },
    {
        id: "2",
        src: "https://images.unsplash.com/photo-1514525253440-b393452e8d26?q=80&w=2574&auto=format&fit=crop", // Concert crowd
        category: "Festivals",
        width: 1200,
        height: 800,
        meta: {
            artist: "Neon Horizon",
            venue: "Coachella",
            date: "2025-04-18",
            exif: { aperture: "f/1.7", shutter: "1/500", iso: "400", model: "Samsung S25 Ultra" },
        },
    },
    {
        id: "3",
        src: "https://images.unsplash.com/photo-1574169208507-84376144848b?q=80&w=2579&auto=format&fit=crop", // Drummer
        category: "Live Concerts",
        width: 800,
        height: 800,
        meta: {
            artist: "Rhythm Kings",
            venue: "Blue Note",
            date: "2025-01-20",
            exif: { aperture: "f/2.8", shutter: "1/160", iso: "6400", model: "Samsung S25 Ultra" },
        },
    },
    {
        id: "4",
        src: "https://images.unsplash.com/photo-1459749411177-287ce3808b7c?q=80&w=2670&auto=format&fit=crop", // Guitarist
        category: "Acoustic",
        width: 800,
        height: 1200,
        meta: {
            artist: "Elena Ray",
            venue: "Sofar Sounds",
            date: "2025-02-14",
            exif: { aperture: "f/1.8", shutter: "1/100", iso: "1600", model: "Samsung S25 Ultra" },
        },
    },
    {
        id: "5",
        src: "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?q=80&w=2670&auto=format&fit=crop", // Performer lights
        category: "Live Concerts",
        width: 1200,
        height: 1600,
        meta: {
            artist: "Void Walkers",
            venue: "Brooklyn Steel",
            date: "2024-12-05",
            exif: { aperture: "f/2.4", shutter: "1/320", iso: "2000", model: "Samsung S25 Ultra" },
        },
    },
    {
        id: "6",
        src: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=2670&auto=format&fit=crop", // Festival crowd
        category: "Festivals",
        width: 1600,
        height: 900,
        meta: {
            artist: "Main Stage",
            venue: "Glastonbury",
            date: "2025-06-22",
            exif: { aperture: "f/4.0", shutter: "1/1000", iso: "100", model: "Samsung S25 Ultra" },
        },
    },
    {
        id: "7",
        src: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2670&auto=format&fit=crop", // Mic stand / Backstage feel
        category: "Backstage",
        width: 800,
        height: 1000,
        meta: {
            artist: "Soundcheck",
            venue: "The Roxy",
            date: "2025-03-10",
            exif: { aperture: "f/1.7", shutter: "1/60", iso: "800", model: "Samsung S25 Ultra" },
        },
    },
    {
        id: "8",
        src: "https://images.unsplash.com/photo-1501612780327-45045538702b?q=80&w=2670&auto=format&fit=crop", // Guitar detail
        category: "Acoustic",
        width: 1000,
        height: 1000,
        meta: {
            artist: "Solo Session",
            venue: "Home Studio",
            date: "2025-01-05",
            exif: { aperture: "f/2.8", shutter: "1/80", iso: "1250", model: "Samsung S25 Ultra" },
        },
    },
    {
        id: "9",
        src: "https://images.unsplash.com/photo-1533174072545-e8d4aa97edf9?q=80&w=2574&auto=format&fit=crop", // Concert lights haze
        category: "Live Concerts",
        width: 1200,
        height: 800,
        meta: {
            artist: "The Haze",
            venue: "O2 Arena",
            date: "2024-10-30",
            exif: { aperture: "f/2.2", shutter: "1/200", iso: "2500", model: "Samsung S25 Ultra" },
        },
    },
    {
        id: "10",
        src: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=2670&auto=format&fit=crop", // Festival night
        category: "Festivals",
        width: 800,
        height: 1400,
        meta: {
            artist: "Night Owls",
            venue: "Lollapalooza",
            date: "2025-08-03",
            exif: { aperture: "f/1.7", shutter: "1/120", iso: "3200", model: "Samsung S25 Ultra" },
        },
    },
    {
        id: "11",
        src: "https://images.unsplash.com/photo-1598387993441-a364f854c3e1?q=80&w=2676&auto=format&fit=crop", // Backstage bokeh
        category: "Backstage",
        width: 1200,
        height: 1200,
        meta: {
            artist: "Green Room",
            venue: "The Fillmore",
            date: "2025-02-28",
            exif: { aperture: "f/1.4", shutter: "1/100", iso: "640", model: "Samsung S25 Ultra" },
        },
    },
    {
        id: "12",
        src: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?q=80&w=2670&auto=format&fit=crop", // Guitar player acoustic
        category: "Acoustic",
        width: 800,
        height: 1200,
        meta: {
            artist: "Unplugged",
            venue: "City Winery",
            date: "2025-05-15",
            exif: { aperture: "f/2.0", shutter: "1/160", iso: "1000", model: "Samsung S25 Ultra" },
        },
    },
];
