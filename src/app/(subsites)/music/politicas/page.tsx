import { MUSIC_CONFIG } from "@/config/music"
import { ArrowLeft } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: `Reglamento de Clases — ${MUSIC_CONFIG.teacher.name}`,
    description: "Reglamento, términos y lineamientos para las clases de piano.",
}

export default function PoliticasPage() {
    return (
        <div className="font-sans antialiased text-foreground bg-background min-h-screen py-24 px-6 md:py-32">
            <div className="max-w-3xl mx-auto">
                <a href="/music" className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mb-12">
                    <ArrowLeft className="w-4 h-4" /> Volver a inicio
                </a>

                <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-12">Reglamento de Clases</h1>

                <div className="space-y-12">
                    <section>
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                            <span className="w-8 h-8 rounded-full bg-accent/10 text-accent flex items-center justify-center text-sm">1</span>
                            Pago de mensualidad
                        </h2>
                        <div className="prose prose-p:text-muted-foreground prose-p:leading-relaxed">
                            <p>
                                El pago correspondiente a la mensualidad deberá ser cubierto a más tardar el <strong>día {MUSIC_CONFIG.policies.paymentDeadlineDay} de cada mes</strong> o en la primera clase del mes, en caso de que el ciclo de clases no haya iniciado en la primera semana.
                            </p>
                            <p>
                                De no realizarse el pago en la fecha estipulada, se aplicará un <strong>cargo por mora de ${MUSIC_CONFIG.policies.lateFee} MXN</strong> por mensualidad.
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                            <span className="w-8 h-8 rounded-full bg-accent/10 text-accent flex items-center justify-center text-sm">2</span>
                            Cancelaciones y reprogramaciones
                        </h2>
                        <div className="prose prose-p:text-muted-foreground prose-p:leading-relaxed">
                            <p>
                                El alumno(a) deberá notificar cualquier cancelación con al menos <strong>{MUSIC_CONFIG.policies.cancellationHours} horas de anticipación</strong>.
                            </p>
                            <p>
                                Será responsabilidad del alumno(a) solicitar la reprogramación de la clase cancelada.
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                            <span className="w-8 h-8 rounded-full bg-accent/10 text-accent flex items-center justify-center text-sm">3</span>
                            Política de reposición de clases
                        </h2>
                        <div className="prose prose-p:text-muted-foreground prose-p:leading-relaxed">
                            <p>
                                Si una clase reprogramada es posteriormente cancelada, <strong>se considerará como impartida</strong> y no podrá ser reagendada nuevamente.
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                            <span className="w-8 h-8 rounded-full bg-accent/10 text-accent flex items-center justify-center text-sm">4</span>
                            Clases no asistidas
                        </h2>
                        <div className="prose prose-p:text-muted-foreground prose-p:leading-relaxed">
                            <p>
                                Las clases <strong>no serán descontadas bajo ninguna circunstancia</strong> en caso de inasistencia. En su lugar, deberán ser reprogramadas dentro del mismo mes.
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                            <span className="w-8 h-8 rounded-full bg-accent/10 text-accent flex items-center justify-center text-sm">5</span>
                            Clases en días feriados
                        </h2>
                        <div className="prose prose-p:text-muted-foreground prose-p:leading-relaxed">
                            <p>
                                Las clases que coincidan con días festivos deberán ser <strong>agendadas con antelación</strong>, de común acuerdo entre ambas partes.
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                            <span className="w-8 h-8 rounded-full bg-accent/10 text-accent flex items-center justify-center text-sm">6</span>
                            Clases en caso de enfermedad
                        </h2>
                        <div className="prose prose-p:text-muted-foreground prose-p:leading-relaxed">
                            <p>
                                Si un alumno(a) presenta alguna enfermedad, especialmente de carácter contagioso, deberá <strong>notificarlo con anticipación</strong> para reprogramar la clase. No se impartirán clases a alumnos enfermos.
                            </p>
                            <p>
                                En caso de que la instructora llegue al domicilio y encuentre al alumno(a) enfermo(a), la clase será <strong>cancelada sin posibilidad de reposición</strong>.
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                            <span className="w-8 h-8 rounded-full bg-accent/10 text-accent flex items-center justify-center text-sm">7</span>
                            Clases en meses con cinco semanas
                        </h2>
                        <div className="prose prose-p:text-muted-foreground prose-p:leading-relaxed">
                            <p>
                                En los meses que cuenten con cinco semanas, si el alumno(a) ha cumplido satisfactoriamente con las cuatro clases correspondientes, podrá optar por <strong>tomar la quinta clase con el costo adicional correspondiente</strong> o tomarla como un periodo de descanso.
                            </p>
                            <p>
                                Si el alumno(a) ha cancelado alguna de las primeras cuatro clases, podrá utilizar la quinta semana para <strong>reponer la sesión perdida</strong>.
                            </p>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}
