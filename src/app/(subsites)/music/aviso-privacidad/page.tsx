import { ArrowLeft } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Aviso de Privacidad — Alejandro AG",
    description: "Aviso de privacidad sobre el tratamiento de datos personales.",
}

export default function AvisoPrivacidadPage() {
    return (
        <div className="font-sans antialiased text-foreground bg-background min-h-screen py-24 px-6 md:py-32">
            <div className="max-w-3xl mx-auto">
                <a href="/music" className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mb-12">
                    <ArrowLeft className="w-4 h-4" /> Volver a inicio
                </a>

                <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-8">Aviso de Privacidad</h1>

                <div className="prose prose-h2:text-2xl prose-h2:font-bold prose-h2:mt-12 prose-h2:mb-4 prose-p:text-muted-foreground prose-p:leading-relaxed max-w-none">
                    <p>
                        En cumplimiento con lo establecido por la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (en adelante la "Ley"), te informamos sobre el tratamiento que se le dará a tus datos.
                    </p>

                    <h2>1. Identidad y domicilio del responsable</h2>
                    <p>
                        Alejandro AG, con operaciones principales en la zona de Santa Fe y Huixquilucan, CDMX y Estado de México, es responsable del tratamiento de los datos personales que nos proporciones a través de este sitio web.
                    </p>

                    <h2>2. Datos que recabamos</h2>
                    <p>
                        A través de nuestros formularios de contacto, recopilamos única y exclusivamente la información mínima necesaria para brindarte atención:
                    </p>
                    <ul>
                        <li>Nombre (o pseudónimo)</li>
                        <li>Número telefónico (WhatsApp)</li>
                        <li>Zona de residencia aproximada</li>
                        <li>Horarios de preferencia</li>
                    </ul>
                    <p>No recabamos datos considerados como sensibles bajo la Ley en esta etapa inicial.</p>

                    <h2>3. Finalidad del tratamiento</h2>
                    <p>
                        Los datos recabados serán utilizados exclusivamente para los siguientes propósitos:
                    </p>
                    <ul>
                        <li>Contactarte vía WhatsApp para dar seguimiento a tu solicitud de clases.</li>
                        <li>Evaluar la factibilidad logística según tu zona y horario.</li>
                        <li>Enviarte información sobre modalidades, precios y disponibilidad.</li>
                    </ul>

                    <h2>4. Transferencia de datos</h2>
                    <p>
                        Tus datos personales no serán vendidos, compartidos ni transferidos a terceros fuera de los sistemas (servicios de mensajería y automatización como WhatsApp y plataformas de webhook) estrictamente necesarios para cumplir con las finalidades descritas.
                    </p>

                    <h2>5. Derechos ARCO</h2>
                    <p>
                        Puedes solicitar el acceso, rectificación, cancelación u oposición al uso de tus datos (Derechos ARCO) en cualquier momento enviando un mensaje directo a través del medio de WhatsApp por el cual fuiste contactado inicialmente.
                    </p>

                    <p className="mt-12 text-sm">
                        <em>Última actualización: {new Date().toLocaleDateString('es-MX')}</em>
                    </p>
                </div>
            </div>
        </div>
    )
}
