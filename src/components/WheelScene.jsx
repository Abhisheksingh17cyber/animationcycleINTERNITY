import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float } from '@react-three/drei';
import * as THREE from 'three';

function Wheel({ scrollProgress = 0 }) {
    const groupRef = useRef();
    const spokeCount = 24;

    // Scroll-driven rotation and float
    useFrame((state) => {
        if (groupRef.current) {
            // Base rotation from scroll
            groupRef.current.rotation.z = -scrollProgress * Math.PI * 4;
            // Subtle idle float
            groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
            groupRef.current.rotation.y = Math.cos(state.clock.elapsedTime * 0.2) * 0.03;
        }
    });

    // Rim material — glossy carbon look
    const rimMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({
        color: '#1a1a1a',
        metalness: 0.9,
        roughness: 0.15,
        clearcoat: 1,
        clearcoatRoughness: 0.1,
        reflectivity: 1,
        envMapIntensity: 1.5,
    }), []);

    // Hub material — metallic accent
    const hubMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({
        color: '#c4a35a',
        metalness: 1,
        roughness: 0.2,
        clearcoat: 0.5,
        envMapIntensity: 2,
    }), []);

    // Spoke material
    const spokeMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({
        color: '#2a2a2a',
        metalness: 0.8,
        roughness: 0.3,
        clearcoat: 0.5,
    }), []);

    return (
        <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.3}>
            <group ref={groupRef}>
                {/* Outer rim - torus */}
                <mesh material={rimMaterial}>
                    <torusGeometry args={[2.2, 0.12, 32, 128]} />
                </mesh>

                {/* Inner rim */}
                <mesh material={rimMaterial}>
                    <torusGeometry args={[1.9, 0.06, 16, 128]} />
                </mesh>

                {/* Hub */}
                <mesh material={hubMaterial}>
                    <cylinderGeometry args={[0.25, 0.25, 0.15, 32]} />
                    <meshPhysicalMaterial {...hubMaterial} />
                </mesh>

                {/* Hub cap ring */}
                <mesh material={hubMaterial}>
                    <torusGeometry args={[0.28, 0.02, 16, 32]} />
                </mesh>

                {/* Spokes */}
                {Array.from({ length: spokeCount }).map((_, i) => {
                    const angle = (i / spokeCount) * Math.PI * 2;
                    const innerR = 0.28;
                    const outerR = 1.88;
                    const midX = (Math.cos(angle) * (innerR + outerR)) / 2;
                    const midY = (Math.sin(angle) * (innerR + outerR)) / 2;
                    const length = outerR - innerR;

                    return (
                        <mesh
                            key={i}
                            position={[midX, midY, 0]}
                            rotation={[0, 0, angle - Math.PI / 2]}
                            material={spokeMaterial}
                        >
                            <boxGeometry args={[0.008, length, 0.008]} />
                        </mesh>
                    );
                })}

                {/* Tire tread — outer ring */}
                <mesh>
                    <torusGeometry args={[2.35, 0.08, 16, 128]} />
                    <meshPhysicalMaterial
                        color="#111111"
                        metalness={0.1}
                        roughness={0.7}
                    />
                </mesh>
            </group>
        </Float>
    );
}

export default function WheelScene({ scrollProgress = 0, className }) {
    return (
        <div className={className} style={{ width: '100%', height: '100%' }}>
            <Canvas
                camera={{ position: [0, 0, 6], fov: 45 }}
                gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
                style={{ background: 'transparent' }}
                dpr={[1, 2]}
            >
                <ambientLight intensity={0.2} />
                <directionalLight position={[5, 5, 5]} intensity={1.2} color="#ffffff" />
                <directionalLight position={[-3, -2, 4]} intensity={0.4} color="#c4a35a" />
                <pointLight position={[0, 0, 3]} intensity={0.5} color="#c4a35a" />
                <spotLight
                    position={[0, 5, 5]}
                    angle={0.3}
                    penumbra={0.8}
                    intensity={1}
                    color="#ffffff"
                />

                <Wheel scrollProgress={scrollProgress} />

                <Environment preset="city" />

                {/* Subtle fog */}
                <fog attach="fog" args={['#060606', 8, 20]} />
            </Canvas>
        </div>
    );
}
