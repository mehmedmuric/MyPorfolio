
"use client";

import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

const ParticlesBackground = () => {
    const [init, setInit] = useState(false);

    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);

    if (!init) return null;

    return (
        <div className="absolute inset-0 -z-0 overflow-hidden pointer-events-none">
            <Particles
                id="tsparticles"
                className="absolute inset-0 h-full w-full"
                options={{
                    fullScreen: { enable: false },
                    background: {
                        color: {
                            value: "transparent",
                        },
                    },
                    fpsLimit: 120,
                    interactivity: {
                        events: {
                            onClick: {
                                enable: false,
                                mode: "push",
                            },
                            onHover: {
                                enable: true,
                                mode: "grab",
                            },
                        },
                        modes: {
                            push: {
                                quantity: 4,
                            },
                            grab: {
                                distance: 140,
                                links: {
                                    opacity: 0.5,
                                },
                            },
                        },
                    },
                    particles: {
                        color: {
                            value: "#22c55e", // Primary Green
                        },
                        links: {
                            color: "#22c55e",
                            distance: 150,
                            enable: true,
                            opacity: 0.2, // Subtle links
                            width: 1,
                        },
                        move: {
                            direction: "none",
                            enable: true,
                            outModes: {
                                default: "bounce",
                            },
                            random: false,
                            speed: 1, // Slow movement
                            straight: false,
                        },
                        number: {
                            density: {
                                enable: true,
                                width: 800,
                                height: 800,
                            },
                            value: 40, // Moderate density
                        },
                        opacity: {
                            value: 0.3, // Low opacity for subtlety
                        },
                        shape: {
                            type: "circle",
                        },
                        size: {
                            value: { min: 1, max: 3 },
                        },
                    },
                    detectRetina: true,
                }}
            />
        </div>
    );
};

export default ParticlesBackground;
